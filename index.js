const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// If your application is in production, use the deployed link (e.g. heroku) otherwise use the local MongoDB URI
const MONGODB_URI = process.env.NODE_ENV === "production" ? process.env.MONGODB_URI : "mongodb://localhost/socialnetworkapi";

mongoose.connect(MONGODB_URI, { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

app.use(routes);

mongoose.connection.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
