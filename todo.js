const readline = require('readline');
const fs = require ('fs');
let data = JSON.parse(fs.readFileSync("data.json", "utf8"))
let input = process.argv;
let jason = data.json;
let length = input.length;
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

switch (process.argv[2]){
  case undefined:
  console.log(">>>JS TODO<<<" +
  "\nnode todo.js <command>"+
  "\nnode todo.js list"+
  "\nnode todo.js task <task_id>"+
  "\nnode todo.js add <task_content>"+
  "\nnode todo.js delete <task_id>"+
  "\nnode todo.js complete <task_id>"+
  "\nnode todo.js uncomplete <task_id>"+
  "\nnode todo.js list:outstanding asc|desc"+
  "\nnode todo.js list:completed asc|desc"+
  "\nnode todo.js tag <task_id> <tag_name_1> <tag_name_2>...<tag_name_N>"+
  "\nnode todo.js filter:<tag_Name>");
  process.exit(0);
  break;

  case "help":
  console.log(">>>JS TODO<<<" +
  "\nnode todo.js <command>"+
  "\nnode todo.js list"+
  "\nnode todo.js task <task_id>"+
  "\nnode todo.js add <task_content>"+
  "\nnode todo.js delete <task_id>"+
  "\nnode todo.js complete <task_id>"+
  "\nnode todo.js uncomplete <task_id>"+
  "\nnode todo.js list:outstanding asc|desc"+
  "\nnode todo.js list:completed asc|desc"+
  "\nnode todo.js tag <task_id> <tag_name_1> <tag_name_2>...<tag_name_N>"+
  "\nnode todo.js filter:<tag_Name>");
  process.exit(0);
  break;

  case "add" :
  let id = data.length + 1;
  let output = "";
  for (var i = 3; i < length; i++){
    output += input[i]+" "
  }
  data.push({task_id : id, status :"[ ]", task_content : output})
  fs.writeFileSync("data.json", JSON.stringify(data))
  console.log("data berhasil ditambahkan");
  process.exit(0)
  break;

  case "list":
  for (var i = 0; i < data.length; i++){
    console.log(data[i].task_id + "." + data[i].status + data[i].task_content)
  }
  process.exit(0);
  break;

  case "delete":
  for (var i = 0; i < data.length; i++){
    if(data[i].task_id == input[3]){
      data.splice(i,1)
      fs.writeFileSync("data.json", JSON.stringify(data))
      console.log("selamat! data nomor :" + input[3] + "telah berhasil dihapus")
      break;
    }
  }
  for (var i = 0, j = 1; i<data.length; i++,j++){
    data[i].task_id = j;
    fs.writeFileSync("data.json", JSON.stringify(data))
  }
  process.exit(0);
  break;

  case "complete":
  for (var i = 0; i < data.length; i++){
    if(data[i].task_id == input[3]){
      data[i].status ="[X]"
      fs.writeFileSync("data.json", JSON.stringify(data))
      console.log(input[3] + data[i].task_content +"telah selesai");
    }
  }
  process.exit(0);
  break;

  case "uncomplete":
  for (var i = 0; i < data.length; i++){
    if(data[i].task_id == input[3]){
      data[i].status ="[ ]"
      fs.writeFileSync("data.json", JSON.stringify(data))
      console.log("tugas nomor" + input[3] +"Masih dilakukan");
    }
  }
  process.exit(0);
  break;

  case "list:outstanding":
  if(input[3] === "asc"){
    for(var i = 0; i < data.length; i++){
      if(data[i].status === "[ ]"){
        console.log(data[i].task_id + "." + data[i].status + data[i].task_content);
        fs.writeFileSync("data.json", JSON.stringify(data))
      }
    }
  }if(input[3] === "desc"){
    for(var i = data.length-1; i>=0; i-- ){
      if(data[i].status === "[ ]"){
        console.log(data[i].task_id + "." + data[i].status + data[i].task_content);
      }
    }
  }
  process.exit(0);
  break;

  case "list:completed":
  if(input[3] === "asc"){
    for(var i = 0; i < data.length; i++){
      if(data[i].status === "[X]"){
        console.log(data[i].task_id + "." + data[i].status + data[i].task_content);
        fs.writeFileSync("data.json", JSON.stringify(data))
      }
    }
  }if(input[3] === "desc"){
    for(var i = data.length-1; i>=0; i-- ){
      if(data[i].status === "[X]"){
        console.log(data[i].task_id + "." + data[i].status + data[i].task_content);
      }
    }
  }
  process.exit(0);
  break;

  case "tag":
  for (let i = 0; i<data.length; i++){
    if(data[i].task_id == input[3] && input[4] != undefined){
      fs.readFileSync("data.json", "utf8")
      let data1 = data[i];
      data1["tag_name"] = input[4];
      fs.writeFileSync("data.json", JSON.stringify(data))
      console.log("Tag sudah disimpan!");
      process.exit(0);
    }else if (input[4] == undefined) {
      console.log("Masukan tag dulu");
      process.exit(0);
    }
  }
  break

  case "filter" :
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
}
