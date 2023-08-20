const formInput = document.querySelector('form');
const inputData = document.querySelector('input');
const submitButton = document.querySelector('#btn');
const listContainer = document.querySelector('.list-container');

//remove tast
const removeTask = id =>{
    let tasks;
    if(localStorage.getItem("tasks")===null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem("tasks", tasks))
    }
    tasks = tasks.filter(task =>{
        return task.id !== +id;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    getTasks();

};


//getTask

const getTasks = ()=>{
    let tasks;
    if(localStorage.getItem("tasks")=== null){
        tasks=[];
    }else{
        tasks = JSON.parse(localStorage.getItem("tasks"))
    }
    
    //display into dom
    let output;
    const allTask = tasks.map(task => {
        return`
        <li class ="task">
            <span>${task.title}</span>
            <button class="delete" onclick ="removeTask(${task.id})">X</button>
        </li>
        `
    })
    output = allTask.join("");
    listContainer.innerHTML=output;

}

getTasks();


const errorMsg = e =>{
    e.preventDefault();
    if(inputData.value === ""){
        alert("Please Enter The Task First!!");
    }
    
    // get Task
    const task = inputData.value;
    let tasks;
    if (task){
        if(localStorage.getItem("tasks") === null){
            tasks = [];
            console.log(tasks);
        } else{
            tasks = JSON.parse(localStorage.getItem("tasks"));
            console.log(tasks);
        }
        tasks.push({
            id:Date.now(),
            title:task,
        })
        // add to local storage
        localStorage.setItem("tasks", JSON.stringify(tasks));
        //empty input field
        inputData.value = "";
        //add new task in array
    }
    getTasks();
}
formInput.addEventListener("submit", errorMsg);