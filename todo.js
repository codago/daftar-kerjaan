"use strict";
const fs        = require("fs");
const readline  = require('readline');
let input       = process.argv;
let panjang     = input.length;
let fungsi      = input[2];
let dataBase    = JSON.parse(fs.readFileSync("data.json", "utf8"));

function todo(){
//menambah daftar kegiatan
    if (fungsi === "add"){
          let id      = dataBase.length+1;
          let output="";

          for (var i = 3; i<panjang; i++){
            output += input[i]+" ";
          }

          fs.readFileSync("data.json", "utf8")
            dataBase.push({
              task_id : id, task_content  : output,  status  : "[ ]"
            })
          fs.writeFileSync("data.json", JSON.stringify(dataBase))
          console.log("data berhasil ditambahkan");
          process.exit(0);
          }
// fungsi mengurutkan pekerjaan yang belum selesai
    else if (fungsi === "list:outstanding"){
          if (input[3] === "asc") {
            for (let i = 0; i < dataBase.length; i++){
                if (dataBase[i].status === "[ ]"){
                  console.log((dataBase[i].task_id)+" "+(dataBase[i].status)+" "+dataBase[i].task_content);
                }
            }
          }
          else if (input[3] === "desc"){
            let tampung = [];
            for (let i = 0; i < dataBase.length; i++){
                if (dataBase[i].status === "[ ]"){
                  tampung.push(dataBase[i].task_id+" "+dataBase[i].status+" "+dataBase[i].task_content);
                  tampung.sort(function(a, b){
                    if(a>b){
                      return -1;
                    }
                    if(a<b){
                      return 1;
                    }
                  return 0;
                });
              }
            }

            for (let i = 0; i < tampung.length; i++){
              console.log(tampung[i]);
            }
            process.exit(0);
          }
        }

//fungsi mengurutkan pekerjaan yang sudah selesai
    else if (fungsi === "list:complete"){
          if (input[3] === "asc") {
            let tampung = [];
            for (let i = 0; i < dataBase.length; i++) {
                if (dataBase[i].status === "[X]"){
                  console.log((dataBase[i].task_id)+" "+(dataBase[i].status)+" "+dataBase[i].task_content);
                }
            }process.exit(0);
          }

          else if (input[3] === "desc"){
            let tampung = [];
            for (let i = 0; i < dataBase.length; i++){
                if (dataBase[i].status === "[X]"){
                  tampung.push(dataBase[i].task_id+" "+dataBase[i].status+" "+dataBase[i].task_content);
                  tampung.sort(function(a, b){
                    if(a>b){
                      return -1;
                    }
                    if(a<b){
                      return 1;
                    }
                  return 0;
                });
              }
            }
              for (let i = 0; i < tampung.length; i++){
                console.log(tampung[i]);
              }
              process.exit(0);
          }
        }
//fungsi menampilkan semua daftar pekerjaan
    else if (fungsi === "list"){
          for (let i = 0; i < dataBase.length; i++){
            if(dataBase[i].tag_name != undefined){
                console.log((dataBase[i].task_id)+" "+(dataBase[i].status)+" "+dataBase[i].task_content+" "+dataBase[i].tag_name);
            }else{
                console.log((dataBase[i].task_id)+" "+(dataBase[i].status)+" "+dataBase[i].task_content);}
          }
          process.exit(0);
          }

//menghapus salah satu pekerjaan
    else if (fungsi === "delete"){
            for (let i = 0; i<dataBase.length; i++){
              if(dataBase[i].task_id == input[3]){
                dataBase.splice(i, 1);
                console.log("Task ID Nomor "+input[3]+" Telah Dilenyapkan");
                break;}
          }

          for(let i=0, j=1; i<dataBase.length; i++, j++){
             dataBase[i].task_id = j;
           }


          fs.writeFileSync("data.json", JSON.stringify(dataBase))
          process.exit(0);
          }

//mengubah status pekerjaan menjadi belum selesai
    else if (fungsi === "uncomplete"){
          fs.readFileSync("data.json", "utf8")
          for (let i = 0; i<dataBase.length; i++){
              if(dataBase[i].task_id == input[3]){
                dataBase[i].status = "[ ]";
                console.log("Task dengan ID "+input[3]+" belum diselesaikan" );
                break;}
            }

          fs.writeFileSync("data.json", JSON.stringify(dataBase))
          process.exit(0);
          }

//memberi tanda selesai kepada pekerjaan ysng sudah dilaksanakan
    else if (fungsi === "complete"){
          fs.readFileSync("data.json", "utf8")
          for (let i = 0; i<dataBase.length; i++){
              if(dataBase[i].task_id == input[3]){
                dataBase[i].status = "[X]";
                console.log("Task dengan ID "+input[3]+" telah diselesaikan" );
                break;}
            }

          fs.writeFileSync("data.json", JSON.stringify(dataBase))
          process.exit(0);
          }

//memberikan tanda kepada pekerjaan
    else if (fungsi === "tag"){
      for (let i = 0; i<dataBase.length; i++){
          if(dataBase[i].task_id == input[3] && input[4]!=undefined ){
            fs.readFileSync("data.json", "utf8")
            let data = dataBase[i];
            data['tag_name'] = input[4];
            fs.writeFileSync("data.json", JSON.stringify(dataBase))
            console.log("tag sudah disimpan");
            process.exit(0);}
          else if(input[4]===undefined){
            console.log("anda belum memasukkan tag");
            break;
            process.exit(0);}
      }
    }

//mencari pekerjaan tertentu berdasarkan filter
    else if (fungsi === "filter"){
      for (let i = 0; i<dataBase.length; i++){
        if(dataBase[i].tag = input[3]){
          console.log((dataBase[i].task_id)+" "+(dataBase[i].status)+" "+dataBase[i].task_content);
          break;
        }
    }
  }

//menampilkan help
   else {
     console.log("node todo.js <command>");
     console.log("node todo.js list");
     console.log("node todo.js task <task_id>");
     console.log("node todo.js add <task content>");
     console.log("node todo.js delete <task_id>");
     console.log("node todo.js complete <task_id>");
     console.log("node todo.js uncomplete <task_id>");
     console.log("node todo.js list:outstanding asc|desc");
     console.log("node todo.js list:complete asc|desc");
     console.log("node todo.js tag <task_id> <tag_name_1> <tag_name_2> ... <tag_name_N>");
     console.log("node todo.js filter");
     process.exit(0);
   }

}

todo()
