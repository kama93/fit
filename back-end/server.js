const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require("node-fetch");
const knex = require('knex');
const bcrypt = require('bcrypt');
const google = require('googleapis');
const moment = require('moment');
const { v4: uuidv4 } = require('uuid')

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = knex({
    client: 'pg',
    connection: {
        host : process.env.DB_HOST || '127.0.0.1',
        user : process.env.DB_USER || '',
        password : process.env.DB_PASSWORD || '',
        database : process.env.DB_NAME || 'fit'
    }
});

// generate email token for storage
const gTokens = {}

function authMiddleware (req, res, next) {
    if (req.path.startsWith('/api')) {
        const userInfo = gTokens[req['headers']['fit-token']]
        req.fitUserInfo = userInfo || {}
    }

    next()
}

function generateToken(email) {
    const token = uuidv4()
    gTokens[token] = { email: email }
    return token
}

function checkTokenAccess(req, res, requestedEmail) {
    if (req.fitUserInfo.email == requestedEmail) {
        return
    }

    res.status(401)
    throw Error('Insufficient permissions')
}

app.use(authMiddleware)

// SIGN IN
app.put('/api/signin', (req, res) => {
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
                            user[0].fitToken = generateToken(email)
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
app.post('/api/signin', (req, res) => {
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
                        user[0].fitToken = generateToken(email)
                        res.json(user[0])
                    })
            })
            .then(trx.commit)
            .catch(trx.rollback)
    })
        .catch(err => res.status(400).json('fetch issue with registration'))
});

// put BMI in database
app.put('/api/bmi', (req, res) => {
    const { email, bmi, info } = req.body;
    checkTokenAccess(req, res, email)
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

// get bmi from database
app.get('/api/bmi/:email', (req, res) => {
    const { email } = req.params;
    checkTokenAccess(req, res, email)
    db.select('bmi', 'info')
        .from('parameters')
        .where('email', '=', email)
        .then(user => res.status(200).json(user))
        .catch(err => {
            res.status(400).json('error getting bmi')
        })
}
)

// put calories in database
app.put('/api/calories', (req, res) => {
    const { email, ppm, cpm } = req.body;
    checkTokenAccess(req, res, email)
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

// get calories from database
app.get('/api/calories/:email', (req, res) => {
    const { email } = req.params;
    checkTokenAccess(req, res, email)
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

// put number of Bottles in database
app.put('/api/bottle', (req, res) => {
    const { email, numBot } = req.body;
    checkTokenAccess(req, res, email)
    db('bottle').insert({
        email: email,
        numbot: numBot,
        date: moment().utc().format()
    })
        .then(result => res.status(200).json('water added'))
        .catch(err => res.status(400).json('issue with adding water'))
})

// get bottle number 
app.get('/api/bottle/:email', (req, res) => {
    const { email } = req.params;
    checkTokenAccess(req, res, email)
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
const FOOD_API_KEY = process.env.FOOD_API_KEY ;

// get meal plan from food API
app.get('/api/meal/:cpm', (req, res) => {
    const { cpm } = req.params;
    const baseURL = 'https://api.spoonacular.com/recipes/mealplans/generate?timeFrame=week&targetCalories=';
    let url = ''.concat(baseURL, cpm, '&apiKey=', FOOD_API_KEY);
    fetch(url)
        .then(result => result.json())
        .then(result => res.status(200).json(result))
        // .then(data=>console.log(data))
        .catch(err => res.status(400).json('fetch recipe issue'))
})

// get recipe from food API base on id
app.get('/api/recipe/:id', (req, res) => {
    const { id } = req.params;
    const baseURL = 'https://api.spoonacular.com/recipes/';
    let url = ''.concat(baseURL, id, '/information?includeNutrition=false&apiKey=', FOOD_API_KEY);
    fetch(url)
        .then(result => result.json())
        .then(result => res.status(200).json(result))
        // .then(data=>console.log(data))
        .catch(err => res.status(400).json('fetch meal issue'))
})

// get random recipe from food API
app.get('/api/random/:dinner', (req, res) => {
    const { dinner } = req.params;
    const baseURL = 'https://api.spoonacular.com/recipes/random?number=1&tags=';
    let url = ''.concat(baseURL, dinner, '&apiKey=', FOOD_API_KEY);
    fetch(url)
        .then(result => result.json())
        .then(result => res.status(200).json(result))
        // .then(data=>console.log(data))
        .catch(err => res.status(400).json('fetch random recipe issue'))
})

// get recipe from food API base on ingredients
app.get('/api/ingredients/:ingredient', (req, res) => {
    const { ingredient } = req.params;
    const baseURL = 'https://api.spoonacular.com/recipes/findByIngredients?ingredients=';
    let url = ''.concat(baseURL, ingredient, '&number=4&apiKey=', FOOD_API_KEY);
    fetch(url)
        .then(result => result.json())
        .then(result => res.status(200).json(result))
        .then(data => console.log(data))
        .catch(err => res.status(400).json('fetch recipe base on ingredients issue'))
})

// get recipe instructions base on recipe ID
app.post('/api/instructions', (req, res) => {
    const { urls } = req.body;
    const baseURL = 'https://api.spoonacular.com/recipes/extract?url=';
    let url = ''.concat(baseURL, urls, '/&apiKey=', FOOD_API_KEY);
    fetch(url)
        .then(result => result.json())
        .then(result => res.status(200).json(result))

        .catch(err => res.status(400).json('fetch meal issue'))
})

// put weight in database
app.put('/api/weight', (req, res) => {
    const { email, weight } = req.body;
    checkTokenAccess(req, res, email)
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
app.get('/api/weight/:email', (req, res) => {
    const { email } = req.params;
    checkTokenAccess(req, res, email)
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


// get air pollution info
const WAQI_API_KEY = process.env.WAQI_API_KEY ;

app.get('/api/air/:lat/:lng', (req, res) => {
    const token = WAQI_API_KEY
    const { lat, lng } = req.params;
    const baseURL = 'https://api.waqi.info/feed/geo:';
    let url = ''.concat(baseURL, lat, ';', lng, '/?token=', token);
    fetch(url)
        .then(result => result.json())
        .then(result => res.status(200).json(result))
        .catch(err => { console.log(err); res.status(400).json('fetch pollution issue') })
})

const port = process.env.PORT || 3003
app.listen(port, () => {
    console.log(`app is running on port ${port}`)
}) 