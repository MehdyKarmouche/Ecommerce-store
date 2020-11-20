const bcrypt = require('bcryptjs')

const users = [
  {
    name: 'Admin User',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('password12', 10),
    isAdmin: true,
  },
  {
    name: 'Flaming potatoes',
    email: 'flaming@gmail.com',
    password: bcrypt.hashSync('password12', 10),
  },
  {
    name: 'Fuzzy Booleans',
    email: 'fuzzy@gmail.com',
    password: bcrypt.hashSync('password12', 10),
  },
]

module.exports = users