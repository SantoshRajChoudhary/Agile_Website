import fs from 'fs';
import path from 'path';

const searchVars = [
  { regex: /rgba\(0,\s*0,\s*0,\s*0\.8\)/g, replace: "#1e293b" },
  { regex: /rgba\(0,\s*0,\s*0,\s*0\.88\)/g, replace: "#0f172a" },
  { regex: /rgba\(0,\s*0,\s*0,\s*0\.85\)/g, replace: "#1e293b" },
  { regex: /rgba\(0,\s*0,\s*0,\s*0\.75\)/g, replace: "#334155" },
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.css') || fullPath.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      for (const { regex, replace } of searchVars) {
        content = content.replace(regex, replace);
      }
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

processDirectory('./src');
console.log('Done replacing colors.');
