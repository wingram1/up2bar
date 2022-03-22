const router = require('express').Router();
const sequelize = require('../../config/connection');
const User = require('../../models/User');

// Model import here


// '/api/users' endpoints

// Get all users
router.get('/', (req, res) => {
    User.findAll({
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
})
// Get user by id

// Create a new user
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
})
// Update user

// Delete user 

// Get users by DESCing popularity

module.exports = router;