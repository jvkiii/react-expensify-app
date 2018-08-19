const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');

app.use(express.static(publicPath));

app.get('*', (req, res) => {
   res.sendFile(path.join(publicPath, 'index.html')); //ridirect all routes back to index.html
});

app.listen(3000, () => {
   console.log('Server running: http://localhost:3000');
});
