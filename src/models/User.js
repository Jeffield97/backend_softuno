const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const User = sequelize.define('user', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rol: {
        type: DataTypes.ENUM('SUPERVISOR','RECEPCION'),
        allowNull: false
    },
});
User.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
}
module.exports = User;