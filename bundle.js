(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){


const selector = document.getElementById('sizeSelector');
const orderPriceElement = document.getElementById('orderPrice');

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

const galleryImages = ["3 нова.jpg","IMG_3250.JPG","IMG_3251.JPG","IMG_3254.JPG","IMG_3255.JPG","IMG_3263.JPG","IMG_3278.JPG","IMG_3374.JPG","IMG_3375.JPG"];

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

const colorImages = ["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg"];
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
},{}]},{},[1]);
