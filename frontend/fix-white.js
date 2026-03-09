import fs from 'fs';
import path from 'path';

const filesToUpdate = [
  'src/pages/WhoWeServe.jsx',
  'src/pages/Products.jsx',
  'src/pages/Career.jsx',
  'src/pages/About.jsx',
  'src/pages/whatwedobestDetail.jsx'
];

filesToUpdate.forEach(relPath => {
  const fullPath = path.resolve(relPath);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Replace rgba(255,255,255, alpha) with rgba(0,0,0, alpha) for backgrounds and borders
    content = content.replace(/rgba\(255,\s*255,\s*255,\s*0\.02\)/g, "rgba(0,0,0,0.02)");
    content = content.replace(/rgba\(255,\s*255,\s*255,\s*0\.07\)/g, "rgba(0,0,0,0.07)");
    content = content.replace(/rgba\(255,\s*255,\s*255,\s*0\.08\)/g, "rgba(0,0,0,0.08)");
    content = content.replace(/rgba\(255,\s*255,\s*255,\s*0\.04\)/g, "rgba(0,0,0,0.04)");
    content = content.replace(/rgba\(255,\s*255,\s*255,\s*0\.12\)/g, "rgba(0,0,0,0.12)");
    
    // Text colors: rgba(255,...) -> slate grays
    content = content.replace(/color:\s*"rgba\(255,\s*255,\s*255,\s*0\.42\)"/g, 'color: "#64748b"');
    content = content.replace(/color:\s*"rgba\(255,\s*255,\s*255,\s*0\.4\)"/g, 'color: "#64748b"');
    content = content.replace(/color:\s*"rgba\(255,\s*255,\s*255,\s*0\.65\)"/g, 'color: "#475569"');
    content = content.replace(/color:\s*"rgba\(255,\s*255,\s*255,\s*0\.5\)"/g, 'color: "#64748b"');
    content = content.replace(/color:\s*"rgba\(255,\s*255,\s*255,\s*0\.38\)"/g, 'color: "#94a3b8"');

    // Replace #fff to #0f172a ONLY when it's assigned to text that isn't inside a known gradient button.
    // Instead of blind global regex, we do a global regex but we will manually revert buttons later if needed, 
    // OR we do a safer replace:
    // Look for: color: "#fff" ... inside typically headings.
    content = content.replace(/color:\s*"#fff"/g, 'color: "#0f172a"');
    
    // Fix buttons that got messed up (linear-gradient buttons usually have #fff text)
    // We can just restore color: "#0f172a" to color: "#fff" if they appear after linear-gradient in same block,
    // Actually, it's easier to just do it via exact matches if there are issues.
    
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Updated: ${fullPath}`);
  }
});
