let todos = []

let inputText = document.getElementById('todo_input_text');
let outputDiv = document.getElementById('output_div');

function init() {
    let todosCopy = JSON.parse(localStorage.getItem('todosList'));
    if (todosCopy != null) { todos = todosCopy; }
    renderTodo();
}

function uniqueId() {
    let uniqueId, str = "";
    let num = Math.round(Math.random() * 1000000000);
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*(){}[]:<>?,./+-*"

    for (i = 0; i < 10; i++) { str += possible[Math.floor(Math.random() * possible.length)] }

    uniqueId = "uid_" + str + "_" + num;
    return uniqueId;
}

function addTodos() {
    if(inputText.value != ''){
        let newTodo = {
            _uid: uniqueId(),
            data: inputText.value,
            complete: false
        }

        todos.push(newTodo);
        renderTodo();
        inputText.value = '';
    }else{
        alert("Input box is empty!");
    }

}

function deleteAllTodo(){
    todos = [];
    renderTodo();
}

function deleteTodo(e) {
    let _id = e.target.getAttribute('del_data');

    for(i=0; i<todos.length; i++){
        if(todos[i]._uid === _id) break;
    }

    todos.splice(i, 1);
    renderTodo();
}

function renderTodo() {
    outputDiv.innerHTML = '';
    for(i=0; i<todos.length; i++){
        item = document.createElement('div');
        item.classList.add('item_div');
        item.innerHTML = `${todos[i].data}`;

        button_box = document.createElement('div');
        button_box.classList.add('item_div_btn');

        delete_btn = document.createElement('button');
        delete_btn.classList.add('del_btn');
        delete_btn.setAttribute('del_data', todos[i]._uid);
        delete_btn.innerHTML = `X`;
        delete_btn.addEventListener('click', deleteTodo);

        button_box.appendChild(delete_btn);
        item.appendChild(button_box);
        outputDiv.appendChild(item);
    }

    localStorage.setItem('todosList', JSON.stringify(todos));
}


init();