const mongoose = require('mongoose');
const db = require('../models');

mongoose.connect('mongodb://localhost/socialnetworkapi', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

const userSeed = [
  {
    username: 'user1',
    email: 'user1@example.com',
    thoughts: [],
    friends: []
  },
  {
    username: 'user2',
    email: 'user2@example.com',
    thoughts: [],
    friends: []
  }
];

const thoughtSeed = [
  {
    thoughtText: 'What a beautiful day!',
    username: 'user1',
    reactions: []
  },
  {
    thoughtText: 'I love coding!',
    username: 'user2',
    reactions: []
  }
];

db.User
  .deleteMany({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + ' user records inserted!');
    return db.Thought.deleteMany({})
  })
  .then(() => db.Thought.collection.insertMany(thoughtSeed))
  .then(data => {
    console.log(data.result.n + ' thought records inserted!');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
