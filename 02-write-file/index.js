//объявляем переменные
const path = require('path');
const fs = require('fs');
const { stdin, stdout } = process;

let pathWay = path.resolve(__dirname, 'text.txt'); //абсолютный путь к файлу на основе относительного пути к нему

const output = fs.createWriteStream(pathWay); //создали текстовый документ в папке 02-write-file
console.log('Напиши свой текст:');

stdin.on('data', data => {
    const writeData = data.toString();
    if (writeData.startsWith('exit')) {
        output.close();
        console.log('Текст записан в файл! Завершено удачно (при вводе exit)!')
        process.exit();
    } else {
        output.write(writeData);
    }
});

process.on('SIGINT', () => {
    output.close();
    console.log('Текст записан в файл! Завершено удачно (при нажатии ctrl+c)!')
    process.exit();
});
