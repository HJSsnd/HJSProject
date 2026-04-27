const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Handle UTF-8 filenames correctly to prevent garbled characters
    const filename = Buffer.from(file.originalname, 'latin1').toString('utf8');
    cb(null, filename);
  }
});
const upload = multer({ storage: storage });

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));
// Serve uploaded files for downloading
app.use('/download', express.static(uploadDir));

app.get('/api/health', (req, res) => {
  res.json({ app: 'CloudDiskApp', status: 'ok' });
});

// API: Get list of files
app.get('/api/files', (req, res) => {
  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read directory' });
    }
    const fileList = files.map(file => {
      const stats = fs.statSync(path.join(uploadDir, file));
      return {
        name: file,
        size: stats.size,
        time: stats.mtime
      };
    });
    // Sort files by latest modification time
    fileList.sort((a, b) => b.time - a.time);
    res.json(fileList);
  });
});

// API: Upload a new file
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const filename = Buffer.from(req.file.originalname, 'latin1').toString('utf8');
  res.json({ message: 'File uploaded successfully', file: filename });
});

// API: Delete a file
app.delete('/api/files/:filename', (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(uploadDir, filename);
  if (fs.existsSync(filepath)) {
    fs.unlinkSync(filepath);
    res.json({ message: 'File deleted' });
  } else {
    res.status(404).json({ error: 'File not found' });
  }
});

app.listen(PORT, () => {
  console.log(`CloudDiskApp running on port ${PORT}`);
});
