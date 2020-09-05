const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require("node-fetch");
const knex = require('knex');
const bcrypt = require('bcrypt');
const google = require('googleapis');
const moment = require('moment');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: '',
        password: '',
        database: 'fit'
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

// put BMI in detabase
app.put('/bmi', (req, res) => {
    const { email, bmi, info } = req.body;
    db.select('email', 'bmi', 'info').from('parameters')
        .where('email', '=', email)
        .then(db_res => {
            if (db_res.length == 0) {
                db('parameters').insert({
                    email: email,
                    bmi: bmi,
                    info: info
                })
                    .then(result => res.status(200).json('bmi added'))
                    .catch(err => res.status(400).json('issue with adding bmi'))
            } else {
                db('parameters')
                    .where('email', '=', email)
                    .update({
                        bmi: bmi,
                        info: info
                    })
                    .then(result => res.status(200).json('bmi update'))
                    .catch(err => res.status(400).json('issue with adding bmi'))
            }
        })
})

// get bmi from detabase
app.get('/bmi/:email', (req, res) => {
    const { email } = req.params;
    db.select('bmi', 'info')
        .from('parameters')
        .where('email', '=', email)
        .then(user => res.status(200).json(user))
        .catch(err => {
            res.status(400).json('error getting bmi')
        })
}
)

// put calories in detabase
app.put('/calories', (req, res) => {
    const { email, ppm, cpm } = req.body;
    db.select('email', 'ppm', 'cpm').from('parameters')
        .where('email', '=', email)
        .then(db_res => {
            if (db_res.length == 0) {
                db('parameters').insert({
                    email: email,
                    ppm: ppm,
                    cpm: cpm
                })
                    .then(result => res.status(200).json('cpm and ppm added'))
                    .catch(err => res.status(400).json('issue with adding cpm and ppm'))
            } else {
                db('parameters')
                    .where('email', '=', email)
                    .update({
                        ppm: ppm,
                        cpm: cpm
                    })
                    .then(result => res.status(200).json('cpm and ppm update'))
                    .catch(err => res.status(400).json('issue with adding cpm and ppm'))
            }
        })
})

// get calories from detabase
app.get('/calories/:email', (req, res) => {
    const { email } = req.params;
    db.select('cpm', 'ppm')
        .from('parameters')
        .where('email', '=', email)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(400).json('error getting cpm and ppm')
        })
}
)

// put number of Bottles in detabase
app.put('/bottle', (req, res) => {
    const { email, numBot } = req.body;
    db('bottle').insert({
        email: email,
        numbot: numBot,
        date: moment().utc().format()
    })
        .then(result => res.status(200).json('water added'))
        .catch(err => res.status(400).json('issue with adding water'))
})

// get bottle number 
app.get('/bottle/:email', (req, res) => {
    const { email } = req.params;
    db('bottle').max('date')
        .where('email', '=', email)
        .then(response => {
            const { max } = response[0]

            if (!max) {
                res.status(200).json({ numbot: 0 })
            } else {
                if (moment(max).format("yyyyMMDD") != moment().format("yyyyMMDD")) {
                    res.status(200).json({ numbot: 0 })
                } else {
                    db.select('numbot')
                        .from('bottle')
                        .where('email', '=', email)
                        .where('date', '=', max)
                        .then(x => res.status(200).json(x[0]))
                        .catch(err => res.status(400).json('issue with getting water'))
                }
            }
        })
})

// food API key
const API_KEY = '251a3fd66f1a4c2e8154c535724af228';

// get meal plan from food API
app.get('/meal/:cpm', (req, res) => {
    const { cpm } = req.params;
    const baseURL = 'https://api.spoonacular.com/recipes/mealplans/generate?timeFrame=week&targetCalories=';
    let url = ''.concat(baseURL, cpm, '&apiKey=', API_KEY);
    fetch(url)
        .then(result => result.json())
        .then(result => res.status(200).json(result))
        // .then(data=>console.log(data))
        .catch(err => res.status(400).json('fetch recipe issue'))
})

// get recipe from food API base on id
app.get('/recipe/:id', (req, res) => {
    const { id } = req.params;
    const baseURL = 'https://api.spoonacular.com/recipes/';
    let url = ''.concat(baseURL, id, '/information?includeNutrition=false&apiKey=', API_KEY);
    fetch(url)
        .then(result => result.json())
        .then(result => res.status(200).json(result))
        // .then(data=>console.log(data))
        .catch(err => res.status(400).json('fetch meal issue'))
})

// get random recipe from food API
app.get('/random/:dinner', (req, res) => {
    const { dinner } = req.params;
    const baseURL = 'https://api.spoonacular.com/recipes/random?number=1&tags=';
    let url = ''.concat(baseURL, dinner, '&apiKey=', API_KEY);
    fetch(url)
        .then(result => result.json())
        .then(result => res.status(200).json(result))
        // .then(data=>console.log(data))
        .catch(err => res.status(400).json('fetch random recipe issue'))
})

// get recipe from food API base on ingredients
app.get('/ingredients/:ingredient', (req, res) => {
    const { ingredient } = req.params;
    const baseURL = 'https://api.spoonacular.com/recipes/findByIngredients?ingredients=';
    let url = ''.concat(baseURL, ingredient, '&number=4&apiKey=', API_KEY);
    fetch(url)
        .then(result => result.json())
        .then(result => res.status(200).json(result))
        .then(data => console.log(data))
        .catch(err => res.status(400).json('fetch recipe base on ingredients issue'))
})

// get recipe instructions base on recipe ID
app.post('/instructions', (req, res) => {
    const { urls } = req.body;
    const baseURL = 'https://api.spoonacular.com/recipes/extract?url=';
    let url = ''.concat(baseURL, urls, '/&apiKey=', API_KEY);
    fetch(url)
        .then(result => result.json())
        .then(result => res.status(200).json(result))

        .catch(err => res.status(400).json('fetch meal issue'))
})

// put weight in database
app.put('/weight', (req, res) => {
    const { email, weight } = req.body;
    db.select('email')
        .from('weight')
        .where('email', '=', email)
        .where('weight', '=', weight)
        .then(db_res => {
            if (db_res.length == 0) {
                db('weight').insert({
                    email: email,
                    weight: weight,
                    date: moment().utc().format()
                })
                    .then(result => res.status(200).json('weight added'))
                    .catch(err => res.status(400).json('issue with adding weight'))
            } else {
                res.status(200).json('weight already there')
                res.catch(err => res.status(400).json('issue with existing weight'))
            }
        })
})

// get weight for graph
app.get('/weight/:email', (req, res) => {
    const { email } = req.params;
    db.select('weight', 'date')
        .from('weight')
        .where('email', '=', email)
        .then(user => res.status(200).json(user))
        .catch(err => {
            console.log(err)
            res.status(400).json('error getting weight')
        })
}
)

//  get geolocation adress 
app.get('/ip', (req, res) => {
    fetch('http://gd.geobytes.com/GetCityDetails')
        .then(result => result.json())
        .then(result => res.status(200).json(result))

        .catch(err => res.status(400).json('fetch IP issue'))
})

// get air pollution info
app.get('/air/:city', (req, res) => {
    const token = 'c8650147058d3f8365e4405ae656ee7f2c91ac9f'
    const { city } = req.params;
    const baseURL = 'https://api.waqi.info/feed/';
    let url = ''.concat(baseURL, city, '/?token=', token);
    fetch(url)
        .then(result => result.json())
        .then(result => res.status(200).json(result))
        .catch(err => res.status(400).json('fetch pollution issue'))
})

// Google Auth

// app.get('/google-landing', (req, res) => {
//     const { code } = req.body

//     const auth = new google.auth.OAuth2(
//         '121471132079-kjqicpum3hvaere938v1uersfeeak2ck.apps.googleusercontent.com',
//         'K5c1RxFXTipQ6QPAU05MoTUy',
//         'http://localhost:3000/google-landing'
//     )

//     const auth = createConnection();
//     const data = await auth.getToken(code);
//     const tokens = data.tokens;
//     const auth = createConnection();
//     auth.setCredentials(tokens);
//     const plus = getGooglePlusApi(auth);
//     const me = await plus.people.get({ userId: 'me' });
//     const userGoogleId = me.data.id;
//     const userGoogleEmail = me.data.emails && me.data.emails.length && me.data.emails[0].value;

//     console.log(userGoogleEmail)

//     return {
//         id: userGoogleId,
//         email: userGoogleEmail,
//         tokens: tokens,
//     };
// })




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