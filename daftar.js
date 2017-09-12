"use strict"

const readline = require('readline');
const fs = require('fs');

const file=process.argv;
let data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
let length=file.length;
function kosong(){
  console.log('>>> JS daftar <<<')
  console.log('$ node daftar.js <command>');
  console.log('$ node daftar.js list');
  console.log('$ node daftar.js task <task_id>');
  console.log('$ node daftar.js add <task_content>');
  console.log('$ node daftar.js delete <task_id>');
  console.log('$ node daftar.js complete <task_id>');
  console.log('$ node daftar.js uncomplete <task_id>');
  console.log('$ node daftar.js list:outstanding asc|desc');
  console.log('$ node daftar.js list:completed asc|desc');
  console.log('$ node daftar.js tag <task_id> <tag_name_1> <tag_name_2> ... <tag_name_N>');
  console.log('$ node daftar.js filter:<tag_name>');
}
function save(data){
  fs.writeFileSync("data.json",JSON.stringify(data, null,3), 'utf8');
}
switch (file[2]) {

  case "add":
  let count=data.length+1
  let output=" "
  for(let i=3;i<length;i++){
    output+= file[i]+" ";
  }
  data.push({id:count , array:"[ ]" , content:output})
  save(data);
  console.log(`"`+ output + `"` + "berhasil ditambahkan");
  break;


  case "list":
  for(let i=0;i<data.length;i++){
    console.log(data[i].id+" "+ data[i].array+" "+data[i].content);
  }
  break;

  case "delete" :
  let id=""
  for (let i =0; i < data.length; i++)
  if (data[i].id == file[3]) {
    console.log ( " " + JSON.stringify(data[i].content) + "Telah di hapus");
    data.splice (i,1);
    for (let i = 0, j = 1; i<data.length; i++, j++){
      data[i].id = j;
      save(data);
    }
  }
  break;

  case "complete" :
  for (let i = 0; i < data.length; i++) {
    if (data[i].id == file[3]) {
      data[i].array = "[X]";
      save(data);
      console.log ( `${JSON.stringify(data[i].content)} sudah selesai`)
    }
  }
  break;

  case "uncomplete" :
  for (let i = 0; i < data.length; i++) {
    if (data[i].id == file [3]) {
      data[i].array = "[ ]";
      save(data);
      console.log (`"${JSON.stringify(data[i].content)}" telah dibatalkan`)
    }
  }
  break;

  case "list:outstanding":
  if (file[3] === "asc") {
    for (let i = 0; i < data.length; i++) {
      if (data[i].array === "[ ]") {
        console.log(`${data[i].id} ${data[i].array} ${data[i].content}`);
      };
    }
  }
  if(file[3] === "desc"){
    for (let i = data.length-1; i >= 0; i--){
      if (data[i].array === "[ ]") {
        console.log(`${data[i].id} ${data[i].array} ${data[i].content}`);
      }
    }
  }
  break;

  case "list:complete":
  if (file[3] == "asc") {
    for (let i = 0; i < data.length; i++) {
      if (data[i].array === "[X]") {
        console.log (`${data[i].id} ${data[i].array} ${data[i].content}`);
      }
    }
  }
  if (file[3] == "desc") {
    for (let i = data.length - 1; i >= 0; i --) {
      if (data[i].array === "[X]") {
        console.log (`${data[i].id} ${data[i].array} ${data[i].content}`);
      }
    }
  }
  break;

  case "tag":
  for (let i = 0; i<data.length; i++){
    if(data[i].id == file[3] && file[4]!=undefined ){
      let data1 = data[i];
      data1['tag_name'] = file[4];
      save(data);
      console.log("tag"+ ""+ JSON.stringify(data[i].tag_name)+" telah ditambahkan kedaftar"+ JSON.stringify(data[i].content));
    }
  }
  break;

  case "filter:":
  if(file[2]=="filter:"){
    // console.log(file[3]);
    for (let i = 0; i<data.length; i++){
      if(data[i].tag_name == file[3] ){
        console.log(`${data[i].id} ${data[i].array} ${data[i].content}`);
      }
    }
  }
  break;

  default:
  console.log('tolong sertakan nama file sebagai inputan soalnya');
  console.log("misalnya:'node daftar.js data.json'");
  kosong();
  break;
}
