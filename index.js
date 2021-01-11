const fs = require('fs');

const selector = document.getElementById('sizeSelector');
const orderPriceElement = document.getElementById('orderPrice');
const selectedPicture = document.getElementById('selectedPicture');

const sizes = [
  '60x70', '75x80', '70x85', '80x80', '80x100', '90x90', 
  '100x100', '110x110', '100x120', '120x120', '120x140', 
  '150x150', '150x200', '180x200', '200x200', '200x220'
];

const price = [
  350, 390, 390, 420, 490, 490, 540, 600, 600, 
  700, 800, 1200, 1400, 1700, 1900, 2200
];

let selectedSizeInd = 0;
let selectedColor;
let orderPrice = price[selectedSizeInd];
orderPriceElement.innerHTML = orderPrice;

// CODE FOR GALLARY BY PICTURES IN FOLDER

const defaultSource = './images/gallery/';
const gallery = document.getElementById('gallery');

function generateGalleryItemHTML(fileName) {
  return `
    <div class="col-lg-4 col-md-6 col-sm-12 p-2 w-100">
      <img src="${defaultSource + fileName}" class="img-cover">
    </div>
  `
}

const galleryImages = fs.readdirSync('./images/gallery');

const imagesHTML = galleryImages.map(file => generateGalleryItemHTML(file)).join('\n');
gallery.innerHTML = imagesHTML;

// CODE FOR SETTING SIZE SELECTOR OPTIONS
function generateOptionHtml(index) {
  return `<option value='${index}'>${sizes[index]}</option>`
}

const optionsHTML = 
  sizes.map((size, index) => generateOptionHtml(index)).join();

selector.innerHTML = optionsHTML;

// CODE FOR HANDLING SELECTOR
selector.onchange = (e) => {
  selectedSizeInd = Number(e.target.value);
  //updating price
  orderPrice = price[selectedSizeInd];
  orderPriceElement.innerHTML = orderPrice;
}

// CODE FOR SETTING COLORS
const defaultColorSource = './images/colors/';
const colors = document.getElementById('colors');

const colorImages = fs.readdirSync('./images/colors');
selectedColor = colorImages[0];

function generateColorItemHTML(fileName, index) {
  return `
    <div class="border rounded ${fileName === selectedColor ? 'border-warning' : 'border-muted'} p-1 " id="color${index}">
      <img src="${defaultColorSource + fileName}" class="img-cover">
    </div>
  `
}

const colorsHTML = colorImages.map((file, index) => generateColorItemHTML(file, index)).join('\n');
colors.innerHTML = colorsHTML;

// ADD EVENT LISTENERS FOR COLOR ELEMETNS
let prevActiveColor = document.getElementById(`color0`);

function handleColorElementClick(fileName, element) {
  prevActiveColor.classList.remove('border-warning');
  prevActiveColor.classList.add('border-muted');

  element.classList.remove('border-muted');
  element.classList.add('border-warning');

  prevActiveColor = element;
  selectedColor = fileName;

  console.log(defaultSelectedPictureSource + fileName);

  if (selectImages.includes(fileName)) {
    selectedPicture.src = defaultSelectedPictureSource + fileName;
  } else {
    selectedPicture.src = defaultSelectedPictureSource + selectImages[0];
  }
}

colorImages.forEach((fileName, index) => {
  const colorElement = document.getElementById(`color${index}`);
  colorElement.addEventListener('click', () => handleColorElementClick(fileName, colorElement));
})

// HANDLE SUBMIT FORM
const orderForm = document.getElementById('orderForm');
orderForm.onsubmit = e => {
  e.preventDefault();
  console.log({ selectedColor, selectedSizeInd, orderPrice });
}

// IMAGE FROM FORM ORDER
const defaultSelectedPictureSource = './images/orderPictures/';
const selectImages = fs.readdirSync('./images/orderPictures');
console.log(selectImages);
selectedPicture.src = defaultSelectedPictureSource + selectImages[0];