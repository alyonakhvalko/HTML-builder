
const path = require('path');
const fs = require('fs');

const from = path.resolve(__dirname, 'styles'); 
const to = path.resolve(__dirname, 'project-dist');

fs.readdir(from, { withFileTypes: true }, (err, files) => { 
    if(err) throw err; 
         
    const outputStream = fs.createWriteStream(path.resolve(to, 'bundle.css'));
        //console.log(files); 
        files.sort((a, b) => b.name - a.name).forEach(file => {
            if(file.isFile() && (file.name).includes('.css')) {
                //console.log(file);
                const stream = fs.createReadStream(path.resolve(from, file.name), 'utf8');
                    stream.on('data', (chunk) => {
                        outputStream.write(chunk + '\n');
                    });
                }
            });
        });


