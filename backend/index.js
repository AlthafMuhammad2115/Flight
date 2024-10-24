const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const sequelize = require('./db');
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// MySQL connection using Sequelize
sequelize.sync()
    .then(() => console.log('MySQL connected'))
    .catch(err => console.log('Error: ' + err));

app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
