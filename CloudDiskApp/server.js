const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/health', (req, res) => {
  res.json({ app: 'CloudDiskApp', status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`CloudDiskApp running on port ${PORT}`);
});
