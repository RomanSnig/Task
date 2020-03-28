const db = require('../../dataBase').getInstance();
const tokenizer = require('../../helpers/tokinazer');
const {checkHashPassword} = require('../../helpers/passwordHasher');

module.exports.authUser = async (req, res) =>{
    try {
        const UserModel = db.getModel('user');
        const TaskModel = db.getModel('task');
        const {email = '', password = ''} = req.body;
        if (!email || !password) {
            throw new Error('Some field is empty')
        }
        const isPresent = await UserModel.findOne({
            where: {
                email: email,
                // password: password
            }
        });
        if (!isPresent) throw new Error('You are not register');

        const {id, name, password: hashPassword} = isPresent;

        const isPassOK = await checkHashPassword(password, hashPassword);
        if (!isPassOK) throw new Error('Password is wrong');

        const token = tokenizer({id, name});
        delete isPresent.dataValues.password;
        const userTasks = await TaskModel.findAll({
            where: {
                user: id
            }
        });
        res.json({
            access: true,
            msg: token,
            user: isPresent,
            tasks: userTasks
        })
    }
    catch (e) {
        console.log(e);
        res.status(400).json({
            access: false,
            msg:e.message
        })
    }
};
