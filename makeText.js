/** Command-line tool to generate Markov text. */
const fs = require('fs');
const { MarkovMachine } = require('./markov');
const axios = require('axios');
const argv = process.argv;

//Make Markov machine from text and generate text
function generateText(text){
    let mm = new MarkovMachine(text);
    console.log(mm.makeText());
}

//read file and generate text
function readFileAndGenerate(path){
    fs.readFile(path, 'utf8', function(err, data){
        if (err){
            console.log(`Can't read file: ${path}: ${err}`);
            process.exit(1);
        }
        generateText(data);
    })
}

//read url and generate text
async function readURLAndGenerate(url){
    let resp;
    try{
        resp = await axios.get(url);
    }catch (err){
        console.log(`Can't read URL: ${url}: ${err}`);
        process.exit(1);
    }
    generateText(resp.data);
}

//call the coresponding function
if (argv[2] === 'file'){
    readFileAndGenerate(argv[3]);
}else if (argv[2] === 'url'){
    readURLAndGenerate(argv[3]);
}else{
    console.log(`Unknown method: ${argv[2]}`);
    process.exit(1);
}


