import fs, { lchown } from "fs";

fs.readFile('./hello.txt',(err,data) => {
    if(err){
        console.log("an error occured")
    }else{
        console.log(data.toString());
    }
})

fs.appendFile("./hello.txt",'parte christianooooo siuu',() => {
    console.log("it is done");
})

