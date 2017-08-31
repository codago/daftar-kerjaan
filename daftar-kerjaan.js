"use strict"

const readline = require('readline');
const fs = require("fs");

let input = process.argv;
let length = input.length;
let data = JSON.parse(fs.readFileSync("data.json","utf8"));

var test;
switch (process.argv[2]) {
  case undefined :
  console.log(">>>JS TODO <<<<"+
  "\n todo.js <command>"+
  "\n todo.js list"+
  "\n todo.js task <task_id>"+
  "\n todo.js add <task_content>"+
  "\n todo.js delete <task_id>"+
  "\n todo.js complete <task_id>"+
  "\n todo.js uncomplete <task_id>"+
  "\n todo.js list : outstanding asc|desc"+
  "\n todo.js list : completed asc|desc"+
  "\n todo.js tag <task_id <tag_name_1> <tag_name_2> ... <tag_name_N>"+
  "\n todo.js filter : <tag_name>");
  break;

  case "add":
    let id = data.length+1;
     let output ="";
     for (var i = 3; i<length; i++){
       output += input[i]+" ";
     }
     fs.readFileSync("data.json", "utf8")
       data.push({ task_id : id, status : "[ ]", task_content  : output})

     fs.writeFileSync("data.json", JSON.stringify(data))
     console.log("Data Berhasil Ditambahkan");
      break;
      process.exit(0);


    case "list":
    for (let i = 0; i < data.length; i++) {
    console.log(data[i].task_id +"." + data[i].status + " " +data[i].task_content)
    }
    break;
    process.exit(0);

    case "delete":
    for (let i = 0; i < data.length; i++) {
      if (data[i].task_id == input[3]) {
        data.splice(i,1);
        console.log("Task Id Nomor"+ " "+ input[3] +"Telah Dihapus");
        break;
      }
    }
    for (let i = 0, j=1; i < data.length; i++,j++) {
      data[i].task_id = j;
    }
    fs.writeFileSync("data.json", JSON.stringify(data))
    process.exit(0);

    case "complete":
    for (let i = 0; i < data.length; i++) {
    if (data[i].task_id == input[3]) {
      data[i].status = "[X]";
      console.log("Task Dengan Id"+ " "+ input[3] +"Telah Diselesaikan");
      break;
      }
    }
    fs.writeFileSync("data.json", JSON.stringify(data))
    process.exit(0);

    case "uncomplete":
    for (let i = 0; i < data.length; i++) {
      if (data[i].task_id == input[3]) {
        data[i].status = "[ ]";
        console.log("Task Dengan Id"+ " "+ input[3] +"Selesai Dibatalkan");
        break;
      }
    }
      fs.writeFileSync("data.json", JSON.stringify(data))
      process.exit(0);


     case "list:outstanding":
     if (input[3] === "asc") {
     for (let i = 0; i < data.length; i++) {
       if (data[i].status === "[ ]"){
        console.log(data[i].task_id + "."+data[i].status+data[i].task_content);
      }
    }
  }
    if (input[3] === "desc") {
      for (let i = data.length-1; i >=0; i--) {
        if (data[i].status === "[ ]"){
        console.log(data[i].task_id+"."+data[i].status+data[i].task_content);
      }
    }
  }
    break;
    process.exit(0)

    case "list:completed":
    if (input[3] === "asc") {
    for (let i = 0; i < data.length; i++){
    if (data[i].status === "[X]"){
      console.log(data[i].task_id+"."+data[i].status+data[i].task_content);
      }
    }
  }
  if(input[3] === "desc") {
  for (let i = data.length-1; i >= 0; i--){
  if (data[i].status === "[X]"){
    console.log(data[i].task_id+"."+data[i].status+data[i].task_content);
  }
}
}
    break;
    process.exit(0)

    case "tag":
    for (let i = 0; i<data.length; i++){
     if(data[i].task_id == input[3] && input[4]!=undefined ){
      fs.readFileSync("data.json", "utf8")
      let data1 = data[i];
      data1['tag_name'] = input[4];
      fs.writeFileSync("data.json", JSON.stringify(data))
      console.log("Tag Sudah Disimpan");
      process.exit(0);
}
}
      break;

      case "filter":
      for (let i = 0; i<data.length; i++){
      if(data[i].tag_name == input[3] ){
      console.log(data[i].task_id + "." + data[i].status + data[i].task_content);
      fs.writeFileSync("data.json", JSON.stringify(data))
    }
  }
      process.exit(0);
      break;

      case "task":
      for(let i = 0; i<data.length; i++){
      if(data[i].task_id == input[3] ){
      console.log(data[i].task_id + "." + data[i].status + data[i].task_content);
      fs.writeFileSync("data.json", JSON.stringify(data))
    }
  }
      process.exit(0);
      break;
        break;


    case "help":
    console.log(">>>JS TODO <<<<"+
    "\n todo.js <command>"+
    "\n todo.js list"+
    "\n todo.js task <task_id>"+
    "\n todo.js add <task_content>"+
    "\n todo.js delete <task_id>"+
    "\n todo.js complete <task_id>"+
    "\n todo.js uncomplete <task_id>"+
    "\n todo.js list : outstanding asc|desc"+
    "\n todo.js list : completed asc|desc"+
    "\n todo.js tag <task_id <tag_name_1> <tag_name_2> ... <tag_name_N>"+
    "\n todo.js filter : <tag_name>");
    break;

}
