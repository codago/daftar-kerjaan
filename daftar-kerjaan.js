"use strict"
const fs = require('fs');

const inputData = process.argv;
let dataJson = JSON.parse(fs.readFileSync('data.json', 'utf8'));

function hint() {
  console.log('>>> JS TO-DO <<<');
  console.log('Choose one');
  console.log('node daftarkerjaan.js <command>');
  console.log(`node daftarkerjaan.js list <task_id>`);
  console.log(`node daftarkerjaan.js add <task_content>`);
  console.log(`node daftarkerjaan.js delete <task_id>`);
  console.log(`node daftarkerjaan.js complete <task_id>`);
  console.log(`node daftarkerjaan.js uncomplete <task_id>`);
  console.log(`node daftarkerjaan.js list:outstanding asc|desc`);
  console.log(`node daftarkerjaan.js tag <task_id> <tag_name_1> <tag_name_2> ... <tag_name_N>`);
  console.log(`node daftarkerjaan.js filter:<tag_name>`);
}

function save(data){
  fs.writeFileSync('data.json', JSON.stringify(data, null, 3), 'utf8');
}

let param = null;
let item = null;
switch (inputData[2]) {

  case undefined:
  hint();
  break;

  case "add":
  param = inputData.slice(3, inputData.length)
  dataJson.push({task: param.join(' '), status: false, tags: []});
  save(dataJson);
  console.log(`"${param.join(' ')}" telah ditambahkan.`);
  break;

  case "list":
  console.log("Daftar Pekerjaan");
  for (let i=0; i < dataJson.length; i++) {
    console.log(`${i+1}. ${dataJson[i].status ? '[x]' : '[ ]'} ${dataJson[i].task} => tags : ${dataJson[i].tags.toString()}`);
  }
  break;

  case "delete":
  param = inputData[3]-1
  item = dataJson[param]
  dataJson.splice(param, 1)
  save(dataJson);
  console.log(`"${item.task}" telah dihapus dari daftar.`);
  break;

  case "complete":
  param = inputData[3]-1
  dataJson[param].status = true;
  save(dataJson);
  console.log(`"${dataJson[param].task}" telah selesai.`);
  break;

  case "uncomplete":
  param = inputData[3]-1
  dataJson[param].status = false;
  save(dataJson);
  console.log(`"${dataJson[param].task}" selesai dibatalkan.`);
  break;

  case "list:outstanding":
  console.log("Daftar Pekerjaan");
  if(inputData[3] == "asc") {
    for (let i=0; i < dataJson.length; i++) {
      if(!dataJson[i].status){
        console.log(`${i+1}. ${dataJson[i].status ? '[x]' : '[ ]'} ${dataJson[i].task}`);
      }
    }
  }else if (inputData[3] == "desc"){
    for (let i=dataJson.length-1; i >= 0; i--) {
      if(!dataJson[i].status){
        console.log(`${i+1}. ${dataJson[i].status ? '[x]' : '[ ]'} ${dataJson[i].task}`);
      }
    }
  }else{
    console.log('pilih input "asc" atau "desc"');
  }
  break;

  case "list:completed":
  console.log("Daftar Pekerjaan");
  if(inputData[3] == "asc") {
    for (let i=0; i < dataJson.length; i++) {
      if(dataJson[i].status){
        console.log(`${i+1}. ${dataJson[i].status ? '[x]' : '[ ]'} ${dataJson[i].task}`);
      }
    }
  }else if (inputData[3] == "desc"){
    for (let i=dataJson.length-1; i >= 0; i--) {
      if(dataJson[i].status){
        console.log(`${i+1}. ${dataJson[i].status ? '[x]' : '[ ]'} ${dataJson[i].task}`);
      }
    }
  }else{
    console.log('pilih input "asc" atau "desc"');
  }
  break;

  case "tag":
  param = inputData.slice(4, inputData.length);
  dataJson[inputData[3]-1].tags = dataJson[inputData[3]-1].tags.concat(param.filter(function(item){
    return dataJson[inputData[3]-1].tags.indexOf(item) < 0;
  }));
  save(dataJson);
  break;

  default:
  param = inputData[2].split(':');
  if (param[0] == "filter"){
    console.log(`Daftar Pekerjaan difilter oleh: ${param[1]}`);
    for (let i=0; i < dataJson.length; i++) {
      if (dataJson[i].tags.indexOf(param[1]) >= 0){
        console.log(`${i+1}. ${dataJson[i].status ? '[x]' : '[ ]'} ${dataJson[i].task} => tags : ${dataJson[i].tags.toString()}`);
      }
    }
  }else{
    console.log("Tolong sertakan nama perintah sebagai inputan hal yang mau kamu lakukan ya :)");
    hint();
  }
  break;
}
