const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Users = require('../models/users')

router.post('/register', (req, res) => {
    // const { username, password } = req.body;
    // let user = { username, password };
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 14);
    user.password = hash;

    Users.create(user).then(addedUser => {
        const token = generateToken(addedUser);
        res.status(201).json({ user: addedUser, token });
    }).catch(err => {
        res.status(500).json({ message: 'Problem registering on server' }) 
    });
})

router.post('/login', (req, res) => {
    // let { username, password } = req.body;
    let user = req.body;

    if (!user) {
        res.status(400).json({ message: 'Error finding user data.' });
    } else if (!user.username || !user.password) {
        res.status(400).json({ message: 'Missing username or password...' });
    } else {
        Users.findOne(user.username)
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                delete user.password;
                const token = generateToken(user);
                res.status(200).json({ user: user, token});
            } else {
                res.status(401).json({ message: 'Invalid Credentials' });
            }
        }).catch(err => {
            res.status(500).json(console.log(err))
        });
    }
})

function generateToken(user) {
    const jwtSecret = process.env.JWT_SECRET || 'secret string for development';

    const payload = {
        subject: user.id,
        username: user.username,
    }

    const options = {
        expiresIn: '8h'
    }

    return jwt.sign(payload, jwtSecret, options);
}




module.exports = router;