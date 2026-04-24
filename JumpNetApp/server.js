const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/health', (req, res) => {
  res.json({ app: 'JumpNetApp', status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`JumpNetApp running on port ${PORT}`);
});
