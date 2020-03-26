const db = require('../../dataBase').getInstance();

module.exports.createTask = async (req, res) => {
    try {
        const TaskModel = db.getModel('tasks');
        console.log(req.body);
        let {name, subject, email, info} = req.body;
        if (!name || !subject || !email || !info) throw new Error('Some field is empty');
        const insertedTask = await TaskModel.create({
            name,
            email,
            subject,
            info
        });
        res.json({
            success: true,
            msg: insertedTask
        });
    } catch (e) {
        console.log(e);
        res.status(400).json({
            success: false,
            msg: e.message
        })
    }
};

module.exports.getTasks = async (req, res) => {
    try {
        const TaskModel = db.getModel('tasks');
        const tasks = TaskModel.findAll({
            attributes: [ 'id', 'name', 'email', 'subject', 'info']
        });
        if(!tasks) throw new Error('Feedback not found');
        res.json(tasks);
    } catch (e) {
        console.log(e);
        res.status(400).json({
            success: false,
            msg: e.message
        })
    }
};
