const fs = require('fs');
const path = require('path');

const targetDirs = ['src/pages', 'src/components'];

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replace maxWidth declarations
  content = content.replace(/maxWidth:\s*1[0-9]{3}/g, 'width: "90%", maxWidth: "1200px"');
  content = content.replace(/maxWidth:\s*["']1[0-9]{3}px["']/g, 'width: "90%", maxWidth: "1200px"');
  
  content = content.replace(/maxWidth:\s*[7-9][0-9]{2}/g, 'width: "95%", maxWidth: "900px"');
  content = content.replace(/maxWidth:\s*["'][7-9][0-9]{2}px["']/g, 'width: "95%", maxWidth: "900px"');

  content = content.replace(/maxWidth:\s*[4-6][0-9]{2}/g, 'width: "100%", maxWidth: "600px"');
  content = content.replace(/maxWidth:\s*["'][4-6][0-9]{2}px["']/g, 'width: "100%", maxWidth: "600px"');

  content = content.replace(/maxWidth:\s*[2-3][0-9]{2}/g, 'width: "100%", maxWidth: "300px"');
  content = content.replace(/maxWidth:\s*["'][2-3][0-9]{2}px["']/g, 'width: "100%", maxWidth: "300px"');
  
  // Replace fixed height/widths that shouldn't be rigidly mapped inside inline styles
  // We'll leave smaller width/height like 40px alone as they are icons/buttons.
  
  const widthRegex = /width:\s*(["']?)([4-9][0-9]{2})px\1/g;
  content = content.replace(widthRegex, 'width: "100%", maxWidth: "$2px"');

  const widthNumericRegex = /width:\s*([4-9][0-9]{2})/g;
  // Make sure not to replace font-weight: 500 etc.
  content = content.replace(/width:\s*([4-9][0-9]{2})(?!\s*[a-zA-Z])/g, 'width: "100%", maxWidth: "$1px"');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated percentages in ${filePath}`);
  }
}

function scanDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      scanDir(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      replaceInFile(fullPath);
    }
  }
}

targetDirs.forEach(scanDir);
