const fs = require('fs');
const path = require('path');

// Получить путь к создаваемой папке из аргумента командной строки
const targetPath = process.argv[2];
let componentName = process.argv[3];

if (!componentName) throw new Error(`Неверное название компонента ${componentName}`);
if (!targetPath) throw new Error(`Неверный путь ${targetPath}`);

componentName = componentName[0].toUpperCase() + componentName.slice(1);
const dir = `${targetPath}/${componentName}`;

// Если путь есть
if (fs.existsSync(targetPath)) {
  if (fs.existsSync(dir)) {
    console.log(`Папка ${dir} уже существует!`);
    return;
  }

  // Создать папку в нашем пути
  fs.mkdirSync(dir);
  console.log(`Папка ${dir} успешно создана.`);

  const filesToCreate = [
    { name: `${componentName}.js`, code: `export function ${componentName}() {}` },
    { name: `${componentName}.module.css`, code: '' },
    { name: 'index.js', code: `export { ${componentName} } from './${componentName}'` },
  ];
  filesToCreate.forEach((file) => {
    const filePath = path.join(dir, file.name);
    fs.writeFileSync(filePath, file.code);
    console.log(`Файл ${filePath} успешно создан.`);
  });
} else {
  console.log(`Путь ${targetPath} неверный!`);
}

// Пример команды для создания компонента Test
// npm run create-component .\src\ Test
