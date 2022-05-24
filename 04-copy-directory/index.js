const path = require('path');
const fs = require('fs');

const dirPath = path.resolve(__dirname, 'files');
const dirPathCopy = path.resolve(__dirname, 'files-copy');
    



fs.mkdir(dirPathCopy, { recursive: true }, err => {
    if(err) { throw err; // не удалось создать папки
} else {
    //console.log('Папка успешно создана');
}
});

        fs.readdir(dirPath, { withFileTypes: true }, (err, files) => { 
    if(err) { throw err; 
    //console.log(files); //выводим список папок
    } else {

        files.forEach(file => { 
    //console.log(file)
        fs.copyFile(path.resolve(dirPath, file.name), path.resolve(dirPathCopy, file.name), (err) => {
        if (err) throw err
        });
        console.log('Файл скопирован успешно');
      });
   }
 });
