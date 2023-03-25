const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'タスクを入力してください'], //絶対に必要という意味
        trim: true,// 空白をトリミングすること
        maxlength: [20, 'タスク名は20文字以内で入力してください']
    },
    completed: {
        type: Boolean,
        default: false, //最初は未完了状態なのでfalse
    }
})

module.exports = mongoose.model('Task', TaskSchema);