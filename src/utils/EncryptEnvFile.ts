let CryptoJSUtil = require("crypto-js")
let fs = require("fs");
let path = require("path");

const SALT = process.env.SALT || "defaultSalt";
const currentDir = __dirname;


const srcDir = path.resolve(currentDir,"..");                               //1. Go one level above(back to 'src'). this file is currently in utils
const configDir = path.resolve(srcDir,"config");                            //2. Change to config folder where .env file is present
//const envFilePath = `${configDir}\\.env`;                                   //3. goto file and save the .env file path in a variable
let envFilePath;
if(process.env.NODE_ENV){                                                   //4. if NODE_ENV has a value then file path should be updated based on NODE_ENV value
    envFilePath =`${configDir}\\.env.${process.env.NODE_ENV}`;
}
else{
    envFilePath = `${configDir}\\.env`;
}
// });
console.log("qa env  path:", envFilePath);


export function encryptEnvFile(){
const envFileContent = fs.readFileSync(envFilePath,"utf8");                     // Read the .env file
const envLines = envFileContent.split("\n");                                    // split the lines based on the line break "\n"

const encryptedLines = envLines.map((line)=>{                                   // in for each loop, in 1st iteration take the first line from encrypted lines
const[key, value]=line.split("=");                                              // split the line with key and value based on "=" symbol
if(value){                                                                      // if value is present then encrypt the value and return encrypted value
    const encryptedValue = CryptoJSUtil.AES.encrypt(value, SALT).toString();    // using CryptoJSUtil, encrypt using SALT value and convert to string
    return `${key}=${encryptedValue}`;                                          // retrun encryptedValue and key pair
    }
return line;                                                                    // each line will be updated in the "encryptedLines" in array format
});

const updatedEnvContent = encryptedLines.join("\n")                             // join the lines using join("\n") and write back to .env file using fs.writeFileSync()
fs.writeFileSync(envFilePath, updatedEnvContent, "utf8");                       // update the content in .env file using writeFileSync function.
}


export function decryptEnvFile() {
    const envFileContent = fs.readFileSync(envFilePath,"utf8");
    console.log("envFileContent:", envFileContent);
    const envLines = envFileContent.split("\n");
    console.log("envLines", envLines);

    const decryptedLines = envLines.map((line)=>{
    const[key, value]=line.split("=");
    if(value){
        const decryptedValue = CryptoJSUtil.AES.decrypt(value, SALT).toString(CryptoJSUtil.enc.Utf8);
        console.log("decryptedValue:", decryptedValue);
        return `${key}=${decryptedValue}`
    }
    return line;
    });
    console.log("decryptedLines:", decryptedLines);
const updatedEnvContent = decryptedLines.join("\n");
console.log("updatedEnvContent:",updatedEnvContent );
fs.writeFileSync(envFilePath,updatedEnvContent,"utf8");

}