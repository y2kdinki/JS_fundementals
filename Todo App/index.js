
//getting all required elements
const inputBox = document.querySelector(".inputfield input");
const addBtn = document.querySelector(".inputfield button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

//onkeyup event 
inputBox.onkeyup = () => {
    let userEnteredValue = inputBox.value; //getting user entered value
    if (userEnteredValue.trim() != 0) {
        addBtn.classList.add("active");
    } else {
        addBtn.classList.remove("active");
    }
};

showTasks(); //calling showTask function

addBtn.onclick = () => {
    //when a user clicks the plus icon button
    let userEnteredValue = inputBox.value;
    let getLocalStorageData = localStorage.getItem("New Todo");
    if (getLocalStorageData == null) {
        //if local storage has no data
        listArray = [];
    } else {
        listArray = JSON.parse(getLocalStorageData); //transforming JSON string into js object
    }
    listArray.push(userEnteredValue);
    localStorage.setItem("New Todo", JSON.stringify(listArray));
    showTasks(); //calling showTask function
    addBtn.classList.remove("active"); //unactive add button once task has been added 
};

function showTasks () {
    let getLocalStorageData = localStorage.getItem("New Todo");
    if (getLocalStorageData == null) {
        listArray = [];
    } else {
        listArray = JSON.parse(getLocalStorageData);
    }
    const pendingTasksNumb = document.querySelector(".pendingTasks");
    pendingTasksNumb.textContent = listArray.length; //passing array length in pending tasks
    if (listArray.length > 0) {
        deleteAllBtn.classList.add("active");
    } else {
        deleteAllBtn.classList.remove("active");
    }
    let newLiTag = "";
    listArray.forEach((element, index) => {
        newLiTag += `<li>${element}<span class ="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newLiTag; //adding new li tag inside of ul tag
    inputBox.value = ""; // once task is added leave the input field blank
}

// delete task function
function deleteTask(index) {
    let getLocalStorageData = localStorage.getItem("New Todo");
    listArray = JSON.parse(getLocalStorageData);
    listArray.splice(index, 1); //delete or remove the li
    localStorage.setItem("New Todo", JSON.stringify(listArray));
    showTasks(); //call the showTasks function
  }
  
  // delete all tasks function
  deleteAllBtn.onclick = () => {
    listArray = []; //empty the array
    localStorage.setItem("New Todo", JSON.stringify(listArray)); //set the item in localstorage
    showTasks(); //call the showTasks function
  };