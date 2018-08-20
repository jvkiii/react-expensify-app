const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000; //heroku provides random port

app.use(express.static(publicPath));

app.get('*', (req, res) => {
   res.sendFile(path.join(publicPath, 'index.html')); //ridirect all routes back to index.html
});

app.listen(port, () => {
   console.log(`Server running: http://localhost:${port}`);
});
