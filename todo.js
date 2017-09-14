"use strict";

const fs = require('fs');

let datajson = JSON.parse(fs.readFileSync("data.json", "utf8"));
let params = process.argv;

function save(data){
  fs.writeFileSync('data.json', JSON.stringify(data), 'utf8');
}

function list(data){
  if (data.length > 0) {
    for (let i = 0; i < data.length; i++) {
      console.log(`${i+1}. ${data[i].status ? '[x]' : '[ ]'} ${data[i].task}`);
    }
  }else {
    console.log(`data kosong`);
  }
}

function add(data){
  datajson.push({task: data, status: false, tags: []});
  save(datajson);
  console.log(`"${data}" telah ditambahkan`);
}

function remove(index){
  let item = datajson[index]
  datajson.splice(index, 1);
  save(datajson);
  console.log(`"${item.task}" telah di hapus dari daftar`);
}

function complete(index){
  datajson[index].status = true;
  save(datajson)
  console.log(`"${datajson[index].task}" telah selesai`);
}

function uncomplete(index){
  datajson[index].status = false;
  save(datajson)
  console.log(`"${datajson[index].task}" telah dibatalkan`);
}

function listOutstanding(data, sort){
  if(sort == 'asc'){
    for (let i = 0; i < data.length; i++) {
      if(!data[i].status){
        console.log(`${i+1}. ${data[i].status ? '[x]' : '[ ]'} ${data[i].task}`);
      }
    }
  }else {
    for (let i =  data.length-1; i >= 0; i--) {
      if(!data[i].status){
        console.log(`${i+1}. ${data[i].status ? '[x]' : '[ ]'} ${data[i].task}`);
      }
    }
  }
}

function completed(data, sort){
  if(sort == 'asc'){
    for (let i = 0; i < data.length; i++) {
      if(data[i].status){
        console.log(`${i+1}. ${data[i].status ? '[x]' : '[ ]'} ${data[i].task}`);
      }
    }
  } else {
    for (let i =  data.length-1; i >= 0; i--) {
      if(data[i].status){
        console.log(`${i+1}. ${data[i].status ? '[x]' : '[ ]'} ${data[i].task}`);
      }
    }
  }
}

function tag(index ,arr) {
  datajson[index].tags = datajson[index].tags.concat(
    arr.filter(function(item){
      return datajson[index].tags.indexOf(item) < 0
    })
  )
  save(datajson)
}

function filter(n){
  for (let i = 0; i < datajson.length; i++) {
    if(datajson[i].tags.indexOf(n) >= 0){
      console.log(`${i+1}. ${datajson[i].status ? '[x]' : '[ ]'} ${datajson[i].task}`);
    }
  }
}

function inputankosong() {
  console.log('>>>JS TODO<<<');
  console.log('node todo.js list');
  console.log('node todo.js task <task_id>');
  console.log('node todo.js add <task_content>')
  console.log('node todo.js delete <task_id>');
  console.log('node todo.js complete <task_id>');
  console.log('node todo.js uncomplete <task_id>');
  console.log('node todo.js list:outstanding asc|desc');
  console.log('node todo.js list:completed asc|desc');
  console.log('node todo.js tag <task_id> <task_name_2> <task_name_3> ... <task_name_N>');
  console.log('node todo.js filter : <tag_name>');
}

let param = 0;
switch (params[2]) {
  case 'add':
  let data = params.slice(3, params.length);
  data = data.join(' ');
  add(data);
  break;

  case 'list':
  list(datajson);
  break;

  case 'delete':
  param = Number(params[3]) - 1;
  remove(param);
  break;

  case 'complete':
  param = Number(params[3]) - 1;
  complete(param);
  break;

  case 'uncomplete':
  param = Number(params[3]) - 1;
  uncomplete(param);
  break;

  case 'list:outstanding':
  listOutstanding(datajson, params[3]);
  break;

  case 'list:completed':
  completed(datajson, params[3]);
  break;

  case 'tag':
  param = Number(params[3]) - 1;
  tag(param,params.slice(4, params.length))
  break;

  case undefined:
   inputankosong();
    break;

  // case 'filter':
  //   let paramFilters = params[2].split(':')
  //   if(paramFilters[0] == 'filter')
  //   console.log(paramFilters[0]);
  //     filter(paramFilters[1])

  break;
  default:
  let paramFilters = params[2].split(':')
  if(paramFilters[0] == 'filter')
    filter(paramFilters[1])
  break;
}
