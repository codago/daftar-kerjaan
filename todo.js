"use strict"

const readline = require('readline');
const fs = require("fs");let input = process.argv;

let length = input.length;
let data = JSON.parse(fs.readFileSync("data.json","utf8"));

let test;
switch (process.argv[2]) {
  case "help" :
  console.log(">>>JS TODO <<<<"+
  "\n todo.js <command>"+
  "\n todo.js list"+
  "\n todo.js task <task_id>"+
  "\n todo.js add <task_content>"+ //nambah tugas
  "\n todo.js delete <task_id>"+ //hapus tugas
  "\n todo.js complete <task_id>"+ //selesai
  "\n todo.js uncomplete <task_id>"+
  "\n todo.js list : outstanding asc|desc"+
  "\n todo.js list : completed asc|desc"+
  "\n todo.js tag <task_id <tag_name_1> <tag_name_2> ... <tag_name_N>"+
  "\n todo.js filter : <tag_name>");
  break;

  case "add":
  let id = data.length+1;
  let output ="";
  for (let i = 3; i<length; i++){
    output += input[i]+" ";
  }
  data.push({ task_id : id, status : "[ ]", task_content  : output})

  fs.writeFileSync("data.json", JSON.stringify(data))
  console.log("data berhasil ditambahkan");
  break;
  process.exit(0);
  break;

  case "list" :
  console.log("Daftar Pekerjaan   :");
  console.log("====================");
  for (let i = 0; i < data.length; i++) {
      console.log(data[i].task_id+"." + " " + data[i].status + " " +data[i].task_content)
  }
  break;
  process.exit(0);

  case "delete" :
    for (let i =0; i < data.length; i++)
  if (data[i].task_id == input[3]) {
    data.splice (i,1);
    console.log (" ID dengan nomer" + " " + input [3] + "Telah di hapus");
    break;
  }
  for (let i = 0, j = 1; i<data.length; i++, j++){
    data[i].task_id = j;
  }
  fs.writeFileSync("data.json", JSON.stringify(data))
  process.exit(0);


  case "complete" :
  for (let i = 0; i < data.length; i++) {
    if (data[i].task_id == input[3]) {
      data[i].status = "[X]";
      console.log ("ID dengan nomer : " + "  " + input[3] +"telah diselesaikan")
      break;
    }
  }
  fs.writeFileSync("data.json", JSON.stringify(data))
  process.exit(0);

  case "uncomplete" :
  for (let i = 0; i < data.length; i++) {
    if (data[i].task_id == input [3]) {
      data[i].status = "[ ]";
      console.log ("ID dengan nomer : " + "" + input [3] + "harus di selesaikan")
      break;
    }c
  }
  fs.writeFileSync("data.json", JSON.stringify(data))
  process.exit(0);

  case "list:outstanding":
  if (input[3] === "asc") {
  for (let i = 0; i < data.length; i++) {
      if (data[i].status === "[ ]") {
        console.log(data[i].task_id + "." + data[i].status + data[i].task_content);
      };
    }
  }
    if(input[3] === "desc"){
    for (let i = data.length-1; i >= 0; i--){
        if (data[i].status === "[ ]") {
    console.log(data[i].task_id + "." + data[i].status + data[i].task_content);
        }
    }
  }
    break;
    process.exit(0);

  case "list:complete":
  if (input[3] == "asc") {
    for (let i = 0; i < data.length; i++) {
      if (data[i].status === "[X]") {
      console.log (data[i].task_id + "." + data[i].status + data[i].task_content)
    }
  }
}
    if (input[3] == "desc") {
      for (let i = data.length - 1; i >= 0; i --) {
        if (data[i].status === "[X]") {
      console.log (data[i].task_id + "." + data[i].status + data[i].task_content)
      }
      }
  }
  break;
  process.exit(0);

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
     for (let i = 0; i<data.length; i++){
     if(data[i].task_id == input[3] ){
     console.log(data[i].task_id + "." + data[i].status + data[i].task_content);
     fs.writeFileSync("data.json", JSON.stringify(data))
   }
 }
     process.exit(0);
     break;

};
