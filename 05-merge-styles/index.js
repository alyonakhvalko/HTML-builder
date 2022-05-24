const path = require('path');
const fs = require('fs');

const from = path.resolve(__dirname, 'styles');
console.log(from);

fs.readdir(from, { withFileTypes: true }, (err, files) => { 
    if(err) { throw err; 
         
    } else {
        //console.log(files); //выводим список папок
        files.forEach(file => {
            let fileWithExtname = path.extname(path.resolve(__dirname, 'styles', file.name));
            //console.log(fileWithExtname)
            if(file.isFile() && fileWithExtname.includes('.css')) {
                //console.log('ok');
                //console.log(file);
                    fs.readFile(path.resolve(__dirname, 'styles', file.name), 'utf8', function(error, fileContent){
                        if(error) { throw error;
                        } else {
                            //console.log(fileContent); // содержимое файла
                            fs.writeFile('05-merge-styles/project-dist/bundle.css', fileContent, function(error){
                                if(error) throw error; // ошибка чтения файла, если есть
                                //console.log('Данные успешно записаны');
                             });
                        }
                     });
            } 
        })
    }
});
