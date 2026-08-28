// Script untuk generate blur placeholder base64 untuk images
// Run: node scripts/generate-blur-placeholder.js

const fs = require('fs');
const path = require('path');
const { getPlaiceholder } = require('plaiceholder');

const imagesDir = path.join(__dirname, '../public/images');

async function generatePlaceholders() {
  try {
    const files = fs.readdirSync(imagesDir);
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|webp)$/i.test(file)
    );

    console.log(`Found ${imageFiles.length} images`);

    for (const file of imageFiles) {
      const filePath = path.join(imagesDir, file);
      const { base64 } = await getPlaiceholder(filePath, { size: 10 });
      console.log(`${file}: ${base64}`);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

generatePlaceholders();
