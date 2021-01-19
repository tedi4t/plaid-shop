const fs = require('fs');
const axios = require('axios');
const colorsHEX = require('./colorsHEX.json');
const colorsText = require('./colorsText.json');

const selector = document.getElementById('sizeSelector');
const orderPriceElement = document.getElementById('orderPrice');
const selectedPicture = document.getElementById('selectedPicture');
const colorTextElement = document.getElementById('colorName');

const sizes = [
  "80x80", "90x90", "100x100", "110x110", "100x120",
  "120x120", "130x150", "150x150", "150x200",
  "180x200", "200x200", "220x220", "220x240",]

const price = [
  480, 535, 630, 730, 730, 880, 1480,
  1680, 1980, 2180, 2480, 2780, 2980
];

const firstKey = Object.keys(colorsText)[0];
let selectedSizeInd = 0;
let selectedColor;
let orderPrice = price[selectedSizeInd];
let selectedColorText = colorsText[selectedColor];
orderPriceElement.innerHTML = orderPrice;
colorTextElement.innerHTML = colorsText[firstKey];

const queryCoder = (queryObj = {}) => {
  let query = '?';
  const options = [];
  for (const key in queryObj) {
    options.push(`${key}=${queryObj[key]}`);
  }
  query += options.join('&');
  
  return query;
}

// CODE FOR GALLARY BY PICTURES IN FOLDER

const defaultSource = './images/gallery/';
const gallery = document.getElementById('gallery');

function generateGalleryItemHTML(fileName, index, lastElement) {
  return `
    <div class="col-lg-4 col-md-6 col-sm-12 p-2 w-100 ${index >= 3 ? 'd-none d-md-block' : 'd-block'} ${lastElement ? 'd-md-none d-lg-block' : ''}">
      <img src="${defaultSource + fileName}" class="img-cover">
    </div>
  `
}

const galleryImages = fs.readdirSync('./images/gallery');

const imagesHTML = galleryImages.map((file, index) => generateGalleryItemHTML(file, index, galleryImages.length === index + 1)).join('\n');
gallery.innerHTML = imagesHTML;

// CODE FOR SETTING SIZE SELECTOR OPTIONS
function generateOptionHtml(index) {
  return `<option value='${index}' ${index === 0 ? 'selected' : ''}>${sizes[index]}</option>`
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

// CODE FOR HANDLING ORDER PHONE CHANGE
let phoneNumber;
const phoneNumberElement = document.getElementById('phoneNumber');
phoneNumberElement.onchange = e => phoneNumber = e.target.value;

// CODE FOR SETTING COLORS
// const defaultColorSource = './images/colors/';
// const colors = document.getElementById('colors');

// const colorImages = fs.readdirSync('./images/colors');
// selectedColor = colorImages[0];

// console.log(colorImages);

// const colorsHTML = colorImages.map((file, index) => generateColorItemHTML(file, index)).join('\n');
// colors.innerHTML = colorsHTML;

function generateColorItemHTML(fileName, color, index) {
  if (!color) return;
  return `
    <div class="border rounded ${fileName === selectedColor ? 'border-warning' : 'border-muted'} p-1 " id="color${index}">
      <div style = "height: 20px; background: ${color}">
      </div>
    </div>
  `
}

const colorsElement = document.getElementById('colors');
const orderPictures = fs.readdirSync('./images/orderPictures');
selectedColor = orderPictures[0];
const colorsHTML = orderPictures.map((file, index) => generateColorItemHTML(file, colorsHEX[file], index)).join('\n');
colorsElement.innerHTML = colorsHTML;

// ADD EVENT LISTENERS FOR COLOR ELEMETNS
let prevActiveColor = document.getElementById(`color0`);

function handleColorElementClick(fileName, element) {
  prevActiveColor.classList.remove('border-warning');
  prevActiveColor.classList.add('border-muted');

  element.classList.remove('border-muted');
  element.classList.add('border-warning');

  prevActiveColor = element;
  selectedColor = fileName;

  selectedColorText = colorsText[fileName];
  colorTextElement.innerHTML = selectedColorText || colorsText[firstKey];

  if (selectImages.includes(fileName)) {
    selectedPicture.src = defaultSelectedPictureSource + fileName;
  } else {
    selectedPicture.src = defaultSelectedPictureSource + selectImages[0];
  }
}

// colorImages.forEach((fileName, index) => {
//   const colorElement = document.getElementById(`color${index}`);
//   colorElement.addEventListener('click', () => handleColorElementClick(fileName, colorElement));
// })

orderPictures.forEach((fileName, index) => {
  const colorElement = document.getElementById(`color${index}`);
  if (colorElement)
    colorElement.addEventListener('click', () => handleColorElementClick(fileName, colorElement));
})

// HANDLE SUBMIT FORM
const orderFormBlock = document.getElementById('orderFormBlock');
orderFormBlock.onsubmit = e => {
  e.preventDefault();
  const color = colorsText[selectedColor];
  const size = sizes[selectedSizeInd];
  const props = {
    color: color,
    size: size,
    price: orderPrice,
    phone: phoneNumber
  };

  // disable button while is processing
  const orderForm = document.getElementById('orderForm');
  const submitOrderBtn = document.getElementById('submitOrder');
  submitOrderBtn.classList.add('disabled');

  axios('https://plaid-shop-api.herokuapp.com/order/add' + queryCoder(props), {
    method: 'post'
  }).then(() => {
      Swal.fire({
      icon: 'success',
      title: 'Дякуємо за замовлення!',
      html: `
      <div class = "text-left mt-1 mt-md-3" style = "line-height: 1.5;">
        <div>В найближчий час з Вами зв'яжуться для уточнення замовлення.</div>
        <hr>
        <div>Колір: ${color}</div>
        <div>Розмір: ${size}</div>
        <div>Ціна: ${orderPrice} гривень</div>
      </div>
      `,
    })
    orderForm.reset();
    submitOrderBtn.classList.remove('disabled');
  }); 
}

// IMAGE FROM FORM ORDER
const defaultSelectedPictureSource = './images/orderPictures/';
const selectImages = fs.readdirSync('./images/orderPictures');
selectedPicture.src = defaultSelectedPictureSource + selectImages[0];
const firstImageName = selectImages[0];
colorTextElement.innerHTML = colorsText[firstImageName];

// HANDLE QUESTION FORM
const questionForm = document.getElementById('questionForm');
const questionText = document.getElementById('questionText');
const questionContact = document.getElementById('questionContact');
let questionTextValue;
let questionContactValue;
questionText.onchange = e => questionTextValue = e.target.value;
questionContact.onchange = e => questionContactValue = e.target.value;

questionForm.onsubmit = e => {
  e.preventDefault();

  const props = {
    question: questionTextValue,
    contact: questionContactValue,
  };
  axios('https://plaid-shop-api.herokuapp.com/question/add' + queryCoder(props), {
    method: 'post'
  });

  Swal.fire({
    icon: 'success',
    title: 'Дякуємо за запитання!',
    html: `
    <div class = "mt-1 mt-md-3" style = "line-height: 1.5;">
      В найближчий час з Вами зв'яжуться для відповіді на запитання. Також ви можете зв'язатися з нами за посиланнями, які можете знайти нижче
    </div>
    `,
  })
}