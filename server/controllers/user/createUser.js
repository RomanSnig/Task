const db = require('../../dataBase').getInstance();
const{hashPassword} = require('../../helpers/passwordHasher');

module.exports.registerUser = async (req, res) => {
    try {
        const UserModel = db.getModel('user');
        console.log(req.body);
        let {name, password, email} = req.body;
        if (!name || !password || !email) throw new Error('Some field is empty');
        const isPresent = await UserModel.findOne({
            where: {
                email: email,
                // password: password
            }
        });
        if(isPresent) throw new Error('You are already registered');

        const hashedPass = await hashPassword(password);

        const insertedUser = await UserModel.create({
            name,
            email,
            password: hashedPass,
        });
        // delete insertedUser.dataValues.password;

        res.json({
            success: true,
            msg: insertedUser
        });
    } catch (e) {
        console.log(e);
        res.status(400).json({
            success: false,
            msg: e.message
        })
    }
};
