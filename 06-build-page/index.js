const fs = require('fs');
const path = require('path');

const assetsIn = path.resolve(__dirname);
const assetsOut = path.resolve(__dirname, 'project-dist');
const stylesIn = path.resolve(__dirname, 'styles');
const stylesOut = path.resolve(__dirname, 'project-dist', 'style.css');

function copyFolder(folderName, inFolder, outFolder) {
  fs.mkdir(path.resolve(outFolder, folderName), (error) => {
    if (error) {
      console.error('mkdir - ', error.message);
    } else {

      fs.readdir(path.resolve(inFolder, folderName), { withFileTypes: true }, (error, files) => {
        if (error) {
          console.error(error.message);
        } else {
          files.forEach((file) => {
            if (file.isDirectory()) {
              copyFolder(file.name, path.resolve(inFolder, folderName), path.resolve(outFolder, folderName));
            } else {
              fs.copyFile(path.resolve(inFolder, folderName, file.name), path.resolve(outFolder, folderName, file.name), (error) => {
                if (error) {
                  console.error(error.message);
                }
              });
            }
          });
        }
      });
    }
  });
}

function mergeStyles(inFolder, extFile) {
  fs.readdir(inFolder, { withFileTypes: true }, (error, files) => {
    if (error) console.error(error.message);
    const outputStream = fs.createWriteStream(extFile);
    files.forEach((file) => {
      if (path.extname(path.resolve(inFolder, file.name)).substring(1) === 'css') {
        const stream = fs.createReadStream(path.resolve(inFolder, file.name), 'utf-8');
        stream.on('data', (chunk) => {
          outputStream.write(chunk + '\n');
        });
      }
    });
  });
}

function pickHTML(templateFile, componentsDir, distFile) {
  const readStream = fs.createReadStream(templateFile, 'utf-8');
  const writeStream = fs.createWriteStream(distFile);
  let template;
  readStream.on('data', (chunk) => {
    template += chunk;
  });
  readStream.on('error', (error) => console.error(error.message));
  readStream.on('end', () => {
    tempArray = template.split('{{');
    let result = [];
    result.push(tempArray[0]);
    for (let i = 1; i < tempArray.length; i ++) {
      const componentName = tempArray[i].split('}}')[0];
      const readStream = fs.createReadStream(path.resolve(componentsDir, `${componentName}.html`), 'utf-8');
      let comp;
      readStream.on('data', (chunk) => {
        comp += chunk;
      });
      readStream.on('end', () => {
        result.push(comp);
        result.push(tempArray[i].split('}}')[1]);
        if (i === tempArray.length - 1) {
          let outHTML = result.join('');
          writeStream.write(outHTML.replace(/undefined/gm, ''));
        }
      });
    }
  });
}

fs.rm(path.resolve(assetsOut), { recursive: true }, (error) => {
  if (error) console.log('Create project');
  fs.mkdir(assetsOut, error => {
    if (error) console.error('mkdir err - ', error.message);
    copyFolder('assets', assetsIn, assetsOut);
    mergeStyles(stylesIn, stylesOut);
    pickHTML(path.resolve(__dirname, 'template.html'), path.resolve(__dirname, 'components'), path.resolve(assetsOut, 'index.html'));
  });
});