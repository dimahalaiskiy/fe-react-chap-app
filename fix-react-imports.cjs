// Fix React imports to follow code style rules
const fs = require("fs");
const path = require("path");

const sourceDir = "src";
const allowedExtensions = [".ts", ".tsx", ".jsx", ".js"];

// Regular expression to match "import React from 'react'" pattern
const reactImportRegex = /import\s+React\s+from\s+["']react["'];?\s*\n?/g;

function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");

    // Check if file contains the React import pattern
    if (reactImportRegex.test(content)) {
      // Remove the React import statement
      const updatedContent = content.replace(reactImportRegex, "");

      // Write the updated content back to the file
      fs.writeFileSync(filePath, updatedContent, "utf8");
      console.log(`Fixed React import in: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error.message);
  }
}

function processDirectory(directory) {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const filePath = path.join(directory, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      // Recursively process subdirectories
      processDirectory(filePath);
    } else if (stats.isFile() && allowedExtensions.includes(path.extname(filePath))) {
      // Process the file if it has an allowed extension
      processFile(filePath);
    }
  }
}

console.log("Starting to fix React imports...");
processDirectory(sourceDir);
console.log("Fixed React imports successfully!");
