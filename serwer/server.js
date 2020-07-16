const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require("node-fetch");
const knex = require('knex');
const bcrypt = require('bcrypt');
const google = require('googleapis');


const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: '',
        password: '',
        database: 'postgres'
    }
});


// SIGN IN
app.put('/signin', (req, res) => {
    const { email, password } = req.body;
    db.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(data => {
            if (data.length != 1) {
                res.status(400).json('incorrect password or email')
            }
            else {
                const isValid = bcrypt.compareSync(password, data[0].hash);
                if (isValid) {
                    return db.select('*').from('users')
                        .where('email', '=', email)
                        .then(user => {
                            res.json(user[0])
                        })
                        .catch(err => res.status(400).json('unable to get user'))
                } else {
                    res.status(400).json('wrong datails')
                }
            }
        })
})


// SIGN UP
app.post('/signin', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json('incorrect register');
    }
    const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .returning('*')
                    .insert({
                        email: loginEmail[0],
                        joined: new Date()
                    })
                    .then(user => {
                        res.json(user[0])
                    })
            })
            .then(trx.commit)
            .catch(trx.rollback)
    })
        .catch(err => res.status(400).json('fetch issue with registration'))
});

// Google Auth

app.get('/google-landing', (req, res) => {
    const { code } = req.body

    const auth = new google.auth.OAuth2(
        '121471132079-kjqicpum3hvaere938v1uersfeeak2ck.apps.googleusercontent.com',
        'K5c1RxFXTipQ6QPAU05MoTUy',
        'http://localhost:3000/google-landing'
    )

    const auth = createConnection();
    const data = await auth.getToken(code);
    const tokens = data.tokens;
    const auth = createConnection();
    auth.setCredentials(tokens);
    const plus = getGooglePlusApi(auth);
    const me = await plus.people.get({ userId: 'me' });
    const userGoogleId = me.data.id;
    const userGoogleEmail = me.data.emails && me.data.emails.length && me.data.emails[0].value;

    console.log(userGoogleEmail)

    return {
        id: userGoogleId,
        email: userGoogleEmail,
        tokens: tokens,
    };
})




//   const defaultScope = [
//     'https://www.googleapis.com/auth/plus.me',
//     'https://www.googleapis.com/auth/userinfo.email',
//   ];

//   function getConnectionUrl(auth) {
//     return auth.generateAuthUrl({
//       access_type: 'offline',
//       prompt: 'consent',
//       scope: defaultScope
//     });
//   }

//   function getGooglePlusApi(auth) {
//     return google.plus({ version: 'v1', auth });
//   }
//   /** MAIN **/
//   function urlGoogle() {
//     const auth = createConnection();
//     const url = getConnectionUrl(auth);
//     return url;
//   }

// Part 2: Take the "code" parameter which Google gives us once when the user logs in, then get the user's email and id.

//   function getGoogleAccountFromCode(code) {
//     const data = await auth.getToken(code);
//     const tokens = data.tokens;
//     const auth = createConnection();
//     auth.setCredentials(tokens);
//     const plus = getGooglePlusApi(auth);
//     const me = await plus.people.get({ userId: 'me' });
//     const userGoogleId = me.data.id;
//     const userGoogleEmail = me.data.emails && me.data.emails.length && me.data.emails[0].value;
//     return {
//       id: userGoogleId,
//       email: userGoogleEmail,
//       tokens: tokens,
//     };
//   }

const port = process.env.PORT || 3003
app.listen(port, () => {
    console.log(`app is running on port ${port}`)
}) 