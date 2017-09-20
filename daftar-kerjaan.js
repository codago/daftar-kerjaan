const readline = require('readline');
const fs = require('fs');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

var todoList = JSON.parse(fs.readFileSync('data.json', 'utf8'));
var commandArray = process.argv;

var todoListApp = {
  todoAdd: function(todo) {
    var tempArray = [];
    for(var x = 3; x<commandArray.length; x++) {
      tempArray.push(todo[x]);
    }
    tempArray = tempArray.join(" ");
    todoList.push({todo: tempArray, todoCompleted: false, tagName: []});
    console.log(todoList[todoList.length-1].todo + " telah ditambahkan");
    fs.writeFileSync('data.json', JSON.stringify(todoList), 'utf8');
  },

  todoShow: function(){
    for(var x = 0; x<todoList.length; x++) {
      if(todoList[x].todoCompleted === false) {
          console.log((x+1) + ". [ ] " + todoList[x].todo);
      } else {
          console.log((x+1) + ". [X] " + todoList[x].todo);
      }
    }
  },

  todoComplete: function(indexTodo){
    var indexTodo = indexTodo - 1;
    if(todoList[indexTodo] === undefined ) {
      console.log("Tidak ada task dengan ID " + indexTodo);
    } else {
      todoList[indexTodo].todoCompleted = true;
      console.log("'" + todoList[indexTodo].todo + "'" + " telah selesai");
    }

    fs.writeFileSync('data.json', JSON.stringify(todoList), 'utf8');
  },

  todoUncomplete: function(indexTodo) {
    var indexTodo = indexTodo - 1;
    if(todoList[indexTodo] === undefined ) {
      console.log("Tidak ada task dengan ID " + indexTodo);
    } else {
      todoList[indexTodo].todoCompleted = false;
      console.log("'" + todoList[indexTodo].todo + "'" + " status selesai dibatalkan");
    }

    fs.writeFileSync('data.json', JSON.stringify(todoList), 'utf8');
  },

  todoDelete: function(indexTodo) {
    var indexTodo = indexTodo - 1;
    console.log("'" + todoList[indexTodo].todo + "'" + " telah dihapus dari daftar");
    todoList.splice(indexTodo, 1);
    fs.writeFileSync('data.json', JSON.stringify(todoList), 'utf8');
  },

  todoSpecificTask: function(indexTodo) {
    var indexTodo = indexTodo - 1;
    if(todoList[indexTodo] === undefined ) {
      console.log("Tidak ada task dengan ID " + indexTodo);
    } else {
      if(todoList[indexTodo].todoCompleted === false) {
          console.log((indexTodo+1) + ". [ ] " + todoList[indexTodo].todo);
      } else {
          console.log((indexTodo+1) + ". [X] " + todoList[indexTodo].todo);
      }
    }
  },

  todoShowOutstanding: function(orderingArgument) {
    if(orderingArgument.toLowerCase() === "asc") {
      for(var x = 0; x<todoList.length; x++) {
        if(todoList[x].todoCompleted === false) {
            console.log((x+1) + ". [ ] " + todoList[x].todo);
          }
      }
    } else if(orderingArgument.toLowerCase() === "desc") {
      for(var y = todoList.length-1; y>=0; y--) {
        if(todoList[y].todoCompleted === false) {
            console.log((y+1) + ". [ ] " + todoList[y].todo);
          }
      }
    } else {
      console.log("please use 'asc' or 'desc' as your argument for 'list:outstanding'");
    }
  },

  todoShowCompleted: function(orderingArgument){
    if(orderingArgument.toLowerCase() === "asc") {
      for(var x = 0; x<todoList.length; x++) {
        if(todoList[x].todoCompleted === true) {
            console.log((x+1) + ". [X] " + todoList[x].todo);
          }
      }
    } else if(orderingArgument.toLowerCase() === "desc") {
      for(var y = todoList.length-1; y>= 0; y--) {
        if(todoList[y].todoCompleted === true) {
            console.log((y+1) + ". [X] " + todoList[y].todo);
          }
      }
    } else {
      console.log("please use 'asc' or 'desc' as your argument for 'list:completed'");
    }
  },
  todoAddTag: function(indexTodo, tagNameInput) {
    var indexTodo = indexTodo - 1;
    console.log(todoList[indexTodo].todo + " telah di label dengan tag : ");
    for(var x = 0; x<tagNameInput.length; x++) {
      todoList[indexTodo].tagName.push(tagNameInput[x]);
      console.log((x+1) + ". " + tagNameInput[x]);
    }
    fs.writeFileSync('data.json', JSON.stringify(todoList), 'utf8');
  },
  todoFilter: function(tagNameInput) {
    for(var x = 0; x<todoList.length; x++) {
      if(todoList[x].tagName.indexOf(tagNameInput) > -1) {
        if(todoList[x].todoCompleted === true) {
            console.log((x+1) + ". [X] " + todoList[x].todo);
        } else if (todoList[x].todoCompleted === false) {
            console.log((x+1) + ". [ ] " + todoList[x].todo);
        }
      }
    }
  },

  todoCommandList: function() {
    console.log(">>>JS TODO<<<"+
    "\nnode todo.js <command>" +
    "\nnode todo.js list" +
    "\nnode todo.js task <task_id>" +
    "\nnode todo.js add <task_content>" +
    "\nnode todo.js delete <task_id>" +
    "\nnode todo.js complete <task_id>" +
    "\nnode todo.js uncomplete <task_id>" +
    "\nnode todo.js list:outstanding asc|desc" +
    "\nnode todo.js list:completed asc|desc" +
    "\nnode todo.js tag <task_id> <tag_name_1> <tag_name2> ... <tag_name_N>" +
    "\nnode todo.js filter: <tag_name>");
  }
}


function commandInterpreter(commandArray) {
  if(commandArray.length === 2) {
    todoListApp.todoCommandList();
    process.exit();
  } else if(commandArray[2].toLowerCase().trim() === "add" &&
            commandArray.length > 3) {
    todoListApp.todoAdd(process.argv);
    process.exit();
  } else if(commandArray[2].toLowerCase().trim() === "list") {
    todoListApp.todoShow();
    process.exit();
  } else if(commandArray[2].toLowerCase().trim() === "complete" &&
            commandArray.length > 3 && isNaN(Number(commandArray[3])) === false) {
    todoListApp.todoComplete(Number(commandArray[3]));
    process.exit();
  } else if(commandArray[2].toLowerCase().trim() === "uncomplete" &&
            commandArray.length > 3 && isNaN(Number(commandArray[3])) === false) {
    todoListApp.todoUncomplete(Number(commandArray[3]));
    process.exit();
  } else if(commandArray[2].toLowerCase().trim() === "delete" &&
            commandArray.length > 3 && isNaN(Number(commandArray[3])) === false) {
    todoListApp.todoDelete(Number(commandArray[3]));
  } else if(commandArray[2].toLowerCase().trim() === "task" &&
            isNaN(Number(commandArray[3])) === false) {
    todoListApp.todoSpecificTask(commandArray[3]);
    process.exit();
  } else if(commandArray[2].toLowerCase().trim() === "list:outstanding" &&
            commandArray.length > 3 && typeof commandArray[3] === "string") {
    todoListApp.todoShowOutstanding(commandArray[3]);
    process.exit();
  } else if(commandArray[2].toLowerCase().trim() === "list:completed" &&
            commandArray.length > 3 && typeof commandArray[3] === "string") {
    todoListApp.todoShowCompleted(commandArray[3]);
    process.exit();
  } else if(commandArray[2].toLowerCase().trim() === "tag") {
      var tagNameInput = [];
        for(var x=4; x<commandArray.length; x++) {
          tagNameInput.push(commandArray[x]);
        }
      todoListApp.todoAddTag(commandArray[3], tagNameInput)
      process.exit();
  } else if(commandArray[2].toLowerCase().trim().split(':')[0] === "filter") {
      todoListApp.todoFilter(commandArray[2].toLowerCase().trim().split(':')[1]);
      process.exit();
  }
}

commandInterpreter(commandArray)
