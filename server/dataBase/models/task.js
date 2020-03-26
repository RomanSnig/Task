module.exports = (sequelize, DataTypes) => {
    const task = sequelize.define('tasks', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING
        },
        subject: {
            type: DataTypes.STRING
        },
        info: {
            type: DataTypes.STRING
        }
    }, {
        tableName: 'user',
        timestamps: false
    });
    return task
};
