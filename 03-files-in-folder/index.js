const path = require('path');
const fs = require('fs');
const readFrom = '03-files-in-folder/secret-folder'; // из какой папки нужно всё прочитать



fs.readdir(readFrom, {withFileTypes: true}, (err, files) => { 
   if(err) throw err; 
   //console.log(files); //выводим список папок
   files.forEach(file => { //перебираем
    
    if (file.isFile()) { //проверка:оставит только файлы (директории не покажет)
        //console.log(file.name);
        let onlyExtname = path.extname(path.resolve(__dirname, 'secret-folder', file.name)); //расширение файла (.txt)
        //console.log(onlyExtname);
        let nameWithoutExtname = (file.name).slice(0, -(onlyExtname.length)); //возвращаем строку без расширения (end = длине строки расширения)
        //console.log(nameWithoutExtname);

        fs.stat(path.resolve(__dirname, 'secret-folder', file.name), (error, stats) => {
            if(err) throw err;
            let sizeOfFiles = stats.size; //размер файла
            console.log(nameWithoutExtname, ' - ', onlyExtname.slice(1), ' - ', sizeOfFiles); //ответ 
        });
    }
})
});
