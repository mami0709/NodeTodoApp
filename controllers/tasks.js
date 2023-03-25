const Task = require('../models/Task');

const getAllTasks = async (req, res) => {
    try {
        const allTasks = await Task.find({});
        res.status(200).json(allTasks); 
    } catch (err) {
        res.status(500).json(err);
    }
}
const createTasks = async (req, res) => {
    try {
        const createTasks = await Task.create(req.body);
        res.status(200).json(createTasks); //createTaskが成功したら200番のステータスコードでJsonを返す。
    } catch (err) {
        res.status(500).json(err); //失敗したら500番のステータスコードでJsonを返す。
    }
}
const getSingleTask = async (req, res) => {
    try {
        const getSingleTask = await Task.findOne({_id: req.params.id}); //IDから探してくる
        if(!getSingleTask) {
            return res.status(404).json(`_id${req.params.id}は存在しません`)
        }
        res.status(200).json(getSingleTask); 
    } catch (err) {
        res.status(500).json(err);
    }
}
const updataTasks = async (req, res) => {
    try {
        const updataTask = await Task.findOneAndUpdate(
            {_id: req.params.id},
            req.body,
            {
                new: true,//更新した際に下に新しい情報が表示されるか。デフォルトではfalse。
            }
        );
        if(!updataTask) {
            return res.status(404).json(`_id${req.params.id}は存在しません`)
        }
        res.status(200).json(updataTask); 
    } catch (err) {
        res.status(500).json(err);
    }
}
const deleteTasks = async (req, res) => {
    try {
        const deleteTask = await Task.findOneAndDelete({_id: req.params.id});
        if(!deleteTask) {
            return res.status(404).json(`_id${req.params.id}は存在しません`)
        }
        res.status(200).json(deleteTask); 
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    getAllTasks,
    createTasks,
    getSingleTask,
    updataTasks,
    deleteTasks,
};