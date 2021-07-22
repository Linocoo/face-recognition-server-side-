const express = require('express');
const fs = require('fs');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const { ppid } = require('process');
const PORT = process.env.PORT || 5000

app.use(bodyParser.json());
app.use(cors())

const database = {
    users: [
        {
            id: '123',
            name: 'Lino',
            email: 'lino@gmail.com',
            entries: 0,
            joined: new Date()
        },
        {
            id: '126',
            name: 'Alvin',
            email: 'alvin@gmail.com',
            entries: 0,
            joined: new Date()
        },
        {
            id: '234',
            name: 'Chip',
            email: 'Chippy@gmail.com',
            entries: 0,
            joined: new Date()
        }
    ],
    login:  [
            {
                id: '143',
                hash: '',
                email: 'linon@gmail.com'

            }
        ]
    }

app.get('/', (req, res) => {
    res.send(database.users);
})

app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
        res.json('success')
    } else {
        res.status(400).json('Sorry there was an error logging in');
    }
})

app.post('/register', (req, res) => {
    const { name, password, email } = req.body;
    bcrypt.hash(password, null, null, function(err, hash) {
        console.log(hash);
    });
    database.users.push({
        id: '125',
        name: name,
        email: email,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length - 1]);
})
app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        } 
    })
    if (!found) {
        res.status(400).json('Not found');
    }
})

app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++
            return res.json(user.entries);
        }
    })

    if (!found) {
        res.status(400).json('Not found');
    }
})

app.listen(PORT, () => {
    console.log(`your app is running on PORT: ${PORT}`);
});
