const db = require('../../dataBase').getInstance();

module.exports.createTask = async (req, res) => {
    try {
        const TaskModel = db.getModel('task');
        console.log(req.body);
        let {name, subject, email, info, user} = req.body;
        if (!name || !subject || !email || !info || !user) throw new Error('Some field is empty');
        const insertedTask = await TaskModel.create({
            name,
            email,
            subject,
            info,
            user
        });
        const userTasks = await TaskModel.findAll({
            where: {
                user: user
            }, attributes: ['id', 'name', 'email', 'subject', 'info','user']
        });
        res.json({
            success: true,
            msg: insertedTask,
            tasks: userTasks
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
        const TaskModel = db.getModel('task');
        const tasks = await TaskModel.findAll({
            attributes: [ 'id', 'name', 'email', 'subject', 'info','user']
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

module.exports.changeTask = async (req, res) => {
  try {
        const TaskModel = db.getModel('task');
        let {id, subject, info, user} = req.body;
        console.log(req.body);
        if (!id || !subject || !info || !user) throw new Error('Some field is empty');
      const isPresent =  await TaskModel.findOne({
          where: {
              id: id,
          }
      });
      if (!isPresent) throw new Error('Task is not Present');
      await TaskModel.update({subject: subject, info:info}, {where: {id}});
      const userTasks = await TaskModel.findAll({
          where: {
              user: user
          }, attributes: ['id', 'name', 'email', 'subject', 'info','user']
      });
      res.json({
          success: true,
          tasks: userTasks
      })
  }  catch (e) {
      console.log(e);
      res.status(400).json({
          success: false,
          msg: e.message
      })
  }
};

module.exports.deleteTask = async (req,res) => {
  try {
      const TaskModel = db.getModel('task');
      let {id, user} = req.params;
      console.log(req.params);
      if(!id || !user) throw new Error('Some field is empty');
      // const user = await TaskModel.findByPk(id, {attributes: ['user']
      // });
      // console.log(Object.values(user.dataValues));
      // const userTasks = await TaskModel.findAll({
      //     where: {
      //         user: Object.values(user.dataValues)
      //     }, attributes: ['id', 'name', 'email', 'subject', 'info','user']
      // });

      await TaskModel.destroy({where:
              {id: id}
      });
      const userTasks = await TaskModel.findAll({
          where: {
              user: user
          }, attributes: ['id', 'name', 'email', 'subject', 'info','user']
      });
      res.json({
          success: true,
          tasks: userTasks,
          info: user
      })
  }  catch (e) {
      console.log(e);
      res.status(400).json({
          success: false,
          msg: e.message
      })
  }
};

module.exports.findTasks = async (req, res) => {
    try {
        const TaskModel = db.getModel('task');
        let {subject} = req.params;
        console.log(req.params);
        if(!subject) throw new Error('Some field is empty');
        const tasks = await TaskModel.findAll({
            where: {
                subject
            }, attributes: ['id', 'name', 'email', 'subject', 'info','user']
        });
        res.json({
            success: true,
            tasks
        })
    } catch (e) {
        console.log(e);
        res.status(400).json({
            success: false,
            msg: e.message
        })
    }
};
