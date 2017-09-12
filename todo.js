'use strict'

const readline = require('readline');
const fs = require('fs');
let data = fs.readFileSync('data.json','utf8');
data = JSON.parse(data)
let input = process.argv;
let length = input.length;

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

function daftartask(){
  console.log(">>> JS TODO <<<");
  console.log("node todo.js <command>");
  console.log("node todo.js list");
  console.log("node todo.js task <task_id>");
  console.log("node todo.js add <task_content>");
  console.log("node todo.js delete <task_id>");
  console.log("node todo.js complete <task_id>");
  console.log("node todo.js uncomplete <task_id>");
  console.log("node todo.js list:outstanding asc|desc");
  console.log("node todo.js list:complete asc|desc");
  console.log("node todo.js tag <task_id> <tag_name_1> <tag_name_2> ... <tag_name_N>");
  console.log("node todo.js flter : <tag_name>");
}

function save(data) {
  fs.writeFileSync("data.json", JSON.stringify(data, null, 3),"utf8")
}

switch (input[2]) {

  case "add":
  let id      = data.length+1;
  let output="";
  for (var i = 3; i<length; i++){
    output += input[i]+" ";
  }
  data.push({
    task_id : id, status  : "[ ]", task_content  : output
  })
  save(data);
  // fs.writeFileSync("data.json", JSON.stringify(data, null, 3))
  console.log(`"` +output+`"`+" telah ditambahkan");
  break;
  // process.exit(0);

  case "list":
  console.log("Daftar Pekerjaan");
  for (var i = 0; i < data.length; i++) {
    console.log(data[i].task_id +"."+ data[i].status + " " + data[i].task_content);
  }
  break;

  case "delete":
  for (var i = 0; i<data.length; i++){
    if(data[i].task_id == input[3]){

      console.log ("" + JSON.stringify(data[i].task_content) + "telah dihapus dari daftar");
      // console.log(`"${task_id}" telah di hapus dari daftar`);
      data.splice(i, 1);

      for(let i=0, j=1; i<data.length; i++, j++){
        data[i].task_id = j;
      }
      save(data);
      // fs.writeFileSync("data.json", JSON.stringify(data, null, 3))
    }
  }
  break;

  case "complete" :
  for (let i = 0; i < data.length; i++) {
    if (data[i].task_id == input[3]) {
      data[i].status = "[X]";
      save(data);
      console.log ("" + JSON.stringify(data[i].task_content) +"telah selesai")
    }
  }
  break;

  case "uncomplete" :
  for (let i = 0; i < data.length; i++) {
    if (data[i].task_id == input [3]) {
      data[i].status = "[ ]";
      save(data);
      console.log ("" + JSON.stringify(data[i].task_content)+ "status selesai dibatalkan")
    }
  }
  break;

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

  case "tag":
  for (let i = 0; i<data.length; i++){
    if(data[i].task_id == input[3] && input[4]!=undefined ){

      let data1 = data[i];
      data1['tag_name'] = input[4];
      save(data);
      // fs.writeFileSync("data.json", JSON.stringify(data, null, 3))
      console.log("tag" +"" + JSON.stringify(data[i].tag_name)+"telah ditambahkan ke daftar" + JSON.stringify(data[i].task_content));
    }
  }
  break;

  case "filter:":
  if (input[2] == "filter:"){
    console.log(input[3]);
    for (let i = 0; i<data.length; i++){
      if(data[i].tag_name == input[3] ){
        console.log(data[i].task_id + "." + data[i].status + data[i].task_content);
      }
    }
  }
  break;

  default:
  daftartask();
  break;
}
