const jsonfile = require('jsonfile');
const fs = require("fs");

function help() {
    console.log(">>> JS TODO <<<\nnode todo.js <command>\nnode todo.js list\nnode todo.js task <task_id>\nnode todo.js add <task_content>\nnode todo.js delete <task_id>\n" +
        "node todo.js complete <task_id>\nnode todo.js uncomplete <task_id>node todo.js list:outstanding asc|desc\nnode todo.js list:completed asc|desc\nnode todo.js tag <task_id> <tag_name_1> <tag_name_2> ... <tag_name_N>\nnode todo.js filter:<tag_name>");
}

var coba;
switch (process.argv[2]) {
    case undefined:
        help();
        break;
    case "list":
        var todos = JSON.parse(fs.readFileSync("todo.json", "utf8"));
        for (var i = 0; i < todos.todo.length; i++) {
            todos.todo[i].id = i+1;
            
            var s = (todos.todo[i].status) ? '[X] ' : '[ ] ';
                console.log(todos.todo[i].id + "." + " " + s + todos.todo[i].task);
        }
        jsonfile.writeFile('todo.json', todos)
        break;
    case "task":
        var todos = JSON.parse(fs.readFileSync("todo.json", "utf8"));
        if (todos.todo[process.argv[3] - 1] != undefined) {
            console.log(todos.todo[process.argv[3] - 1].id + "." + " " + todos.todo[process.argv[3] - 1].task);
        } else {
            console.log("no task found ! Please enter valid task !!");
        }
        break;
    case "add":
        var count = 1;
        var todos = JSON.parse(fs.readFileSync("todo.json", "utf8"));
        var temp = process.argv.splice(3, process.argv.length).join(" ");
        console.log('"' + temp + '"' + " telah ditambahkan")
        if (todos.todo.length != 0) {
            count += todos.todo[todos.todo.length - 1].id;
        }

        todos.todo.push({ "id": count, "task": temp, "status": false, "tag": [] });
        jsonfile.writeFile('todo.json', todos)
        break;
    case "delete":
        var todos = JSON.parse(fs.readFileSync("todo.json", "utf8"));
        var count = 0;
     
            if (+process.argv[3] <= todos.todo.length) {
                count++;
                console.log('"' + todos.todo[Number.parseInt(process.argv[3])-1].task + '"' + " telah dihapus dari daftar");
                todos.todo.splice(Number.parseInt(process.argv[3])-1, 1);
            }
           
       

        if(count ===0)console.log("invalid");
        jsonfile.writeFile('todo.json', todos)
        break;
    case "complete":
        var todos = JSON.parse(fs.readFileSync("todo.json", "utf8"));
            if (+process.argv[3] <= todos.todo.length) {
                todos.todo[Number(process.argv[3])-1].status = true;
            }else {
                console.log("no task found! Please enter valid task !!");
            }

        jsonfile.writeFile('todo.json', todos)
        break;
    case "uncomplete":
        var todos = JSON.parse(fs.readFileSync("todo.json", "utf8"));
        if (+process.argv[3] <= todos.todo.length) {
                todos.todo[Number(process.argv[3])-1].status = false;
            }else {
                console.log("no task found! Please enter valid task !!");
            }

        jsonfile.writeFile('todo.json', todos)
        break;
    case "list:outstanding":
        var todos = JSON.parse(fs.readFileSync("todo.json", "utf8"));
        if (process.argv[3] === "asc") {
            for (var i = 0; i < todos.todo.length; i++) {
                if (!todos.todo[i].status) {
                    var s = (todos.todo[i].status) ? '[X] ' : '[ ] ';
                    console.log(todos.todo[i].id + "." + " " +s+ todos.todo[i].task);
                }
            }
        } else if (process.argv[3] === "desc") {
            for (var i = todos.todo.length - 1; i >= 0; i--) {
                if (!todos.todo[i].status) {
                    var s = (todos.todo[i].status) ? '[X] ' : '[ ] ';
                    console.log(todos.todo[i].id + "." + " " +s+ todos.todo[i].task);
                }
            }
        } else {
            console.log("invalid command !! asc|desc");
        }

        break;
    case "list:completed":
        var todos = JSON.parse(fs.readFileSync("todo.json", "utf8"));
        if (process.argv[3] === "asc") {
            for (var i = 0; i < todos.todo.length; i++) {
                if (todos.todo[i].status) {
                    var s = (todos.todo[i].status) ? '[X] ' : '[ ] ';
                    console.log(todos.todo[i].id + "." + " " +s+ todos.todo[i].task);
                }
            }
        } else if (process.argv[3] === "desc") {
            for (var i = todos.todo.length - 1; i >= 0; i--) {
                if (todos.todo[i].status) {
                    var s = (todos.todo[i].status) ? '[X] ' : '[ ] ';
                    console.log(todos.todo[i].id + "." + " " +s+todos.todo[i].task);
                }
            }
        } else {
            console.log("invalid command !! asc|desc");
        }
        break;
    case "tag":
        var todos = JSON.parse(fs.readFileSync("todo.json", "utf8"));
        var count = 0;
        var temp;

             if (+process.argv[3] <= todos.todo.length) {
                temp = process.argv.splice(4, process.argv.length);
                for (var j = 0; j < temp.length; j++) {
                    todos.todo[Number(process.argv[3]-1)].tag.push(temp[j]);
                }
             }else{
                 console.log("no task found! Please enter valid task !!");
             }

        jsonfile.writeFile('todo.json', todos)
        break;
    case "help":
        help();
        break;
    case process.argv[2]:
        var todos = JSON.parse(fs.readFileSync("todo.json", "utf8"));
        var tag = process.argv[2].split(":");
        var count = 0;
        for (var i = 0; i < todos.todo.length; i++) {
            for (var j = 0; j < todos.todo[i].tag.length; j++) {
                if (tag[1] === todos.todo[i].tag[j]) {
                    count++;
                    var s = (todos.todo[i].status) ? '[X] ' : '[ ] ';
                    console.log(todos.todo[i].id + "." + " " +s+ todos.todo[i].task);
                }
            }
        }

        if (count === 0) console.log("not found!!")

        break;

    default:
        console.log("no argument find");
        break;
}