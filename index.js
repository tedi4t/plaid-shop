const fs = require('fs');

const defaultSource = './images/gallery/';
const gallery = document.getElementById('gallery');

function generateItemHTML(fileName) {
  return `
    <div class="col-lg-4 col-md-6 col-sm-12 p-2 w-100">
      <img src="${defaultSource + fileName}" class="img-cover">
    </div>
  `
}

const files = fs.readdirSync('./images/gallery');
console.log(files);

const imagesHTML = files.map(file => generateItemHTML(file)).join('\n');
gallery.innerHTML = imagesHTML;