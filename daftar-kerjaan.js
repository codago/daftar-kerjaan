"use strict";

const fs = require("fs");
const readline = require('readline');
let input = process.argv;
let panjang = input.length;
let fungsi = input[2];
let dataBase = JSON.parse(fs.readFileSync("data.json","utf8"));
function todo(){
  
// fungsi add
  if (fungsi === "add"){
    let id = dataBase.length+1;
    let output ="";
    for (var x = 3; x<panjang; x++){
      output += input[x]+" ";
    }
    fs.readFileSync("data.json", "utf8")
    dataBase.push({task_id: id, task_content: output, status: "[ ]"})
    fs.writeFileSync("data.json", JSON.stringify(dataBase))
    console.log("data berhasil di tambahkan");
    process.exit(0);
  }
  //fungsi list
  else if (fungsi === "list"){
    for (let x = 0; x < dataBase.length; x++){
      if(dataBase[x].tag_name != undefined){
        console.log((dataBase[x].task_id)+" "+(dataBase[x].status)+" "+dataBase[x].task_content+" "+dataBase[x].tag_name);
      }else{
        console.log((dataBase[x].task_id)+" "+(dataBase[x].status)+" "+dataBase[x].task_content);
      }
      }
      process.exit(0);
    }
    //fungsi delete
  else if (fungsi === "delete"){
    fs.readFileSync("data.json", "utf8")
    for (let x=0; x < dataBase.length; x++){
      if (dataBase[x].task_id == input[3]){
        dataBase.splice(x, 1);
        dataBase.status = "[ ]";
        console.log("task dengan ID " +input[3]+ "sudah dihapus");
        break;}
      }
      for(let x=0, y=1; x<dataBase.length; x++, y++){
        dataBase[x].task_id = y;
      }
      fs.writeFileSync("data.json", JSON.stringify(dataBase))
      process.exit(0);
    }
    //fungsi complete
    else if (fungsi === "complete"){
      fs.readFileSync("data.json", "utf8")
      for (let x=0; x < dataBase.length; x++){
        if (dataBase[x].task_id == input[3]){
          dataBase[x].status = "[x]";
          console.log("task dengan ID "+input[3]+"sudah di selesaikan");
          break;}
        }
        fs.writeFileSync("data.json", JSON.stringify(dataBase))
        process.exit(0);
    }
    //fungsi uncomplete
    else if (fungsi === "uncomplete"){
      fs.readFileSync("data.json", "utf8")
      for (let x=0; x < dataBase.length; x++){
        if (dataBase[x].task_id == input[3]){
          dataBase[x].status = "[ ]";
          console.log("task dengan ID "+input[3]+"belum di batalkan");
          break;}
    }
    fs.writeFileSync("data.json", JSON.stringify(dataBase))
    process.exit(0);
  }

  //fungsi untuk mengurut task yang belum selesai
    else if (fungsi === "list:outstanding"){
      if(input[3] === "asc"){
        //console.log("ini adalah asc");
        for(let x=0; x<dataBase.length; x++){
        if (dataBase[x].status === "[ ]"){
        console.log((dataBase[x].task_id)+" "+(dataBase[x].status)+" "+dataBase[x].task_content);
        }
          }
        }
          else if(input[3] === "desc"){
            console.log("ini adalah desc");
             let temp = [];
                 for(let x=0; x<dataBase.length; x++){
                  if (dataBase[x].status === "[ ]"){
                    temp.push((dataBase[x].task_id)+" "+dataBase[x].status+" "+dataBase[x].task_content);
                    temp.sort(function(c, d){
                      if(c>d){
                        return -1;
                      }
                      if(c<d){
                        return 1;
                      }
                      return 0;
                    });
                  }
                }
                for (let x = 0; x < temp.length; x++){
                  console.log(temp[x]);
                }
                process.exit(0);
          }//penutup if else desc
        }// penutup list

  //fungsi untuk tag_name
  else if (fungsi === "tag"){
    for(let x=0; x<dataBase.length; x++){
      if(database[x].task_id === input[3] && input[4]!=undefined ){
        fs.readFileSync("data.json", "utf8")
        let data = dataBase[x];
        data['tag_name'] = input[4];
        fs.writeFileSync("data.json",JSON.stringify(dataBase))
        console.log("tag tersimpan");
        process.exit(0);}
        else if(input[4]===undefined){
          console.log("anda belum memasukkan tag");
          break;
          process.exit(0);
      }
  }
}
  else if (fungsi === "filter"){
    for (let x = 0; x< dataBase.length; x++){
      console.log(dataBase[x].status);
      if(dataBase[x].tag = input[3]){
        console.log((dataBase[x].id)+" "+(dataBase[x].status)+" "+dataBase[x].task_content);
        break;
    }
  }
}
  //fungsi untuk mengurut pekerjaan yang selesai
  else if (fungsi === "list:complete"){
    if(input[3] === "asc"){
      for (let x=0; x < dataBase.length; x++ ){
        //console.log (dataBase[x].task_content)
         if (dataBase[x].status === "[x]"){
         console.log((dataBase[x].task_id)+" "+(dataBase[x].status)+" "+dataBase[x].task_content);
         }
      }

      //for (let x = 0; x<dataBase.length; x++){
      //   console.log("ini x");
      // if (dataBase[x].status === "[X]"){
      // console.log((dataBase[x].task_id)+" "+(dataBase[x].status)+" "+dataBase[x].task_content);
      // }
        //}
      }
        else if(input[3] === "desc"){
          //console.log("ini adalah desc");
           let temp = [];
               for(let x=0; x<dataBase.length; x++){
                if (dataBase[x].status === "[x]"){
                  temp.push((dataBase[x].task_id)+" "+dataBase[x].status+" "+dataBase[x].task_content);
                  temp.sort(function(c, d){
                    if(c>d){
                      return -1;
                    }
                    if(c<d){
                      return 1;
                    }
                    return 0;
                  });
                }
              }
              for (let x = 0; x < temp.length; x++){
                console.log(temp[x]);
              }
              process.exit(0);
        }//penutup if else desc
      }// penutup list
  else{
  console.log(">>>JS TODO<<<"+
  "\nnode todo.js <command>"+
  "\nnode todo.js list"+
  "\nnode todo.js task <task_id>"+
  "\nnode todo.js add <task content>"+
  "\nnode todo.js delete <task_id>"+
  "\nnode todo.js complete <task_id>"+
  "\nnode todo.js uncomplete <task_id>"+
  "\nnode todo.js list:outstanding asc|desc"+
  "\nnode todo.js list:complete asc|desc"+
  "\nnode todo.js tag <task_id> <tag_name_1> <tag_name_2> ... <tag_name_N>"+
  "\nnode todo.js filter");
  process.exit(0);
}
}
todo()
