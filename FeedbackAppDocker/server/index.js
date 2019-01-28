const express = require('express');
require('./models/User');
require('./models/Survey');
const authRoutes = require('./routes/authRoutes');
const bilingRoutes = require('./routes/billingRoutes')
const surveyRoutes = require('./routes/surveyRoutes');

const keys = require('./config/keys');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');

require('./services/passport');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, //30days in ms
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);
bilingRoutes(app);
surveyRoutes(app);

if (process.env.NODE_ENV === 'production') {
    // express will serve up production assets
    app.use(express.static('client/build'));

    const path = require('path');
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);