const express = require('express');
const cors = require('cors');

const app = express();
const allRoutes = require('./routes/allRoutes');

app.use(cors());

app.use(express.static('public'));
app.use(express.static('node_modules'));

// "api" as the prefix to all routes is set here
app.use('/api/', allRoutes);

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${port}`);
});
