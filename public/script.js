const tasksDOM = document.querySelector('.tasks');//HTMLのtasksというdivタグを取得
const formDOM = document.querySelector('.task-form');//formのHTMLを取得
const taskInputDOM = document.querySelector('.task-input');//inputのHTMLを取得
const formAlertDOM = document.querySelector('.form-alert');


// /api/v1/tasksからタスクを読み込む
const showTasks = async () => {
    try {
        //自作のAPIを叩く
        const { data: tasks } = await axios.get('/api/v1/tasks');

        //タスクが1つもない時
        if(tasks.length < 1 ) {
            tasksDOM.innerHTML = `<h5 class="empty-list">タスクがありません</h5>`
            return;
        }

        //タスクを出力
        const allTasks = tasks.map((task) => {
            const { completed, _id, name } = task;

            return `<div class="single-task ${completed && "task-completed"}" >
            <h5>
                <span>
                    <i class="far fa-check-circle"></i>
                </span>${name}
            </h5>
            <div class="task-links">
                <!-- 編集リンク -->
                <a href="edit.html?id=${_id}" class="edit-link">
                    <i class="fas fa-edit"></i>
                </a>
                <!-- ゴミ箱リンク -->
                <button type="submit" class="delete-btn" data-id="${_id}">
                    <i class="fas fa-trash"></i>
                </button> 
            </div>
        </div>`
        })
        .join("");//追加
        tasksDOM.innerHTML = allTasks;
    } catch (err) {
        console.error(err);
    }
}

showTasks();

//タスクを新規作成する
formDOM.addEventListener("submit", async (event) => {
    event.preventDefault(); //レンダリングさせない
    const name = taskInputDOM.value;
    try {
        await axios.post('/api/v1/tasks', {name: name});//データを投稿して作成する処理
        showTasks();//そのデータを表示させる処理
        taskInputDOM.value = "";
        formAlertDOM.style.display = "block";
        formAlertDOM.textContent = 'タスクを追加しました';
        formAlertDOM.classList.add('text-success');
    } catch (err) {
        console.log(err);
        formAlertDOM.style.display = "block";
        formAlertDOM.innerHTML = "無効です。もう一度やり直してください。";
    }
    setTimeout(() => {
        formAlertDOM.style.display = "none";
        formAlertDOM.classList.remove('text-success');

    }, 3000)//3秒後に非表示
})

//タスクを削除する
tasksDOM.addEventListener("click", async (event) => {
    const element = event.target;
    if(element.parentElement.classList.contains('delete-btn')){ //クラス名にdelete-btnが含まれている場合の処理
        const id = element.parentElement.dataset.id; //data-id="${_id}"のIDを取得している 
        try {
            await axios.delete(`/api/v1/tasks/${id}`);
            showTasks();
        } catch (err) {
            console.log(err);
        }
    }
});