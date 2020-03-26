const jwt = require('jsonwebtoken');
const {secret, refreshSecret} = require('../constants/secret');

module.exports = (data) => {
    return {
        accessToken: jwt.sign(data, secret, {expiresIn: '15min'}),
        refreshToken: jwt.sign(data, refreshSecret, {expiresIn: '30d'})

    };
};
