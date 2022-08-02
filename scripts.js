#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const tempLateConfig = require('./template.config')

function replaceNameInUTF8File() {

  try {
    const { templateDir, placeholderName, infoRollback = [] } = tempLateConfig
    const { name } = path.parse(process.env.OLDPWD)

    const filePath = `${process.env.OLDPWD}/package.json`
    const isPackageJson = path.basename(filePath) === 'package.json';
    const fileContent = fs.readFileSync(filePath, 'utf8');

    let replacedFileContent = fileContent

    for (let index = 0; index < infoRollback.length; index++) {
      const [txt, txtRollback] = infoRollback[index];
      replacedFileContent = replacedFileContent
        .replace(txt.replace(new RegExp('{{rollback}}', 'g'), name), txtRollback)
        .replace(txt.replace(new RegExp('{{rollback}}', 'g'), name.toLowerCase()), txtRollback)
    }

    if (fileContent !== replacedFileContent) {
      fs.writeFileSync(filePath, replacedFileContent, 'utf8');
    }
  } catch (error) {
    console.log('Rollback info error: ', error)
  }
}

replaceNameInUTF8File()