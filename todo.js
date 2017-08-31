"use strict";
const fs        = require("fs");
const readline  = require('readline');
var  input       = process.argv;
var length      = input.length;
var datajason    = JSON.parse(fs.readFileSync("data.json", "utf8"));


switch (process.argv[2]) {
    case "help":
    console.log(">>>JS TODO<<<");
    console.log("node todo.js <command>");
    console.log("node todo.js list");
    console.log("node todo.js task <task_id>");
    console.log("node todo.js add <task_content>");
    console.log("node todo.js delete <task_id>");
    console.log("node todo.js complete <task_id>");
    console.log("node todo.js uncomplete<task_id>");
    console.log("node todo.js list:outstanding asc|desc");
    console.log("node todo.js list:completed asc|desc");
    console.log("node todo.js tag <task_id> <task_name_1> <task_name_2> ... <task_name_N>");
    console.log("node todo.js filter:<tag_name>");

        break;

    case "add":
     let id      = datajason.length+1;
     let output="";
     for (var i = 3; i<length; i++){
       output += input[i]+" ";
     }
     fs.readFileSync("data.json", "utf8")
       datajason.push({
         task_id : id, status  : "[ ]", task_content  : output
       })
     fs.writeFileSync("data.json", JSON.stringify(datajason))
     console.log("Data berhasil ditambahkan");
         break;
           process.exit(0);

      case "list":

        console.log("DAFTAR PEKERJAAN:")
        for (var i = 0; i <datajason.length; i++) {
          console.log(datajason[i].task_id+"." + datajason[i].status + " " + datajason[i].task_content)
      }  break;
          process.exit(0);

      case "delete":
        for (let i = 0; i<datajason.length; i++){
          if(datajason[i].task_id == input[3]){
            datajason.splice(i, 1);
            console.log("Task ID Nomor "+input[3]+" Telah dihilangkan");

            for(let i=0, j=1; i<datajason.length; i++, j++){
               datajason[i].task_id = j;
             }
             fs.writeFileSync("data.json", JSON.stringify(datajason))
           }
        }break;
        process.exit(0);

        case "complete":
   fs.readFileSync("data.json", "utf8")
   for (let i = 0; i < datajason.length; i++) {
   if (datajason[i].task_id == input[3]) {
     datajason[i].status = "[X]";
     console.log("Task Dengan Id #"+ " "+ input[3] +" Telah Diselesaikan");
     break;
     }
   }
   fs.writeFileSync("data.json", JSON.stringify(datajason))
   process.exit(0);

   case "uncomplete":
   fs.readFileSync("data.json", "utf8")
   for (let i = 0; i < datajason.length; i++) {
     if (datajason[i].task_id == input[3]) {
       datajason[i].status = "[ ]";
       console.log("Task Dengan Id #"+ " "+ input[3] +" Telah  Dibatalkan");
       break;
     }
   }
     fs.writeFileSync("data.json", JSON.stringify(datajason))
     process.exit(0);
//
case "list:completed":
      console.log("DAFTAR PEKERJAAN:")
      if (input[3] === "asc") {

        for (let i = 0; i < datajason.length; i++) {
            if (datajason[i].status === "[X]"){
              console.log(datajason[i].task_id+"." + datajason[i].status + " " + datajason[i].task_content)
}
    }
        }


      if (input[3] === "desc") {
        for (let i =datajason.length-1; i >= 0; i--) {
            if (datajason[i].status === "[X]"){
              console.log(datajason[i].task_id+"." + datajason[i].status + " " + datajason[i].task_content)
}
  }
        }
        process.exit(0);
break;
        case "list:outstanding":
        console.log("DAFTAR PEKERJAAN:")
              if (input[3] === "asc") {
                for (let i = 0; i < datajason.length; i++) {
                    if (datajason[i].status === "[ ]"){
                      console.log(datajason[i].task_id+"." + datajason[i].status + " " + datajason[i].task_content)
        }
      }
    }


            if (input[3] === "desc") {
                for (let i =datajason.length-1; i >= 0; i--) {
                    if (datajason[i].status === "[ ]"){
                      console.log(datajason[i].task_id+"." + datajason[i].status + " " + datajason[i].task_content)
        }
      }
    }
      process.exit(0);
break;

case "tag":{
  for (let i = 0; i<datajason.length; i++){
      if(datajason[i].task_id == input[3] && input[4]!=undefined ){
        fs.readFileSync("data.json", "utf8")
        let datag = datajason[i];
        datag['tag_name'] = input[4];
        fs.writeFileSync("data.json", JSON.stringify(datajason))
        console.log("tag sudah disimpan");
        process.exit(0);}

  }
}
      case "filter":
      console.log("DAFTAR PEKERJAAN:")
      for (let i = 0; i<datajason.length; i++){
        fs.readFileSync("data.json", "utf8")
        if(datajason[i].tag_name == input[3] ){
          console.log(datajason[i].task_id + "." + datajason[i].status + " " +datajason[i].task_content);
        }
      }
      process.exit(0);
      break;
}
