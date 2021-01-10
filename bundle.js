(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){


const defaultSource = './images/gallery/';
const gallery = document.getElementById('gallery');

function generateItemHTML(fileName) {
  return `
    <div class="col-lg-4 col-md-6 col-sm-12 p-2 w-100 d-grid">
      <img src="${defaultSource + fileName}" class="img-cover">
    </div>
  `
}

const files = ["3 нова.jpg","IMG_3250.JPG","IMG_3251.JPG","IMG_3254.JPG","IMG_3255.JPG","IMG_3263.JPG","IMG_3278.JPG","IMG_3374.JPG","IMG_3375.JPG"];
console.log(files);

const imagesHTML = files.map(file => generateItemHTML(file)).join('\n');
gallery.innerHTML = imagesHTML;
},{}]},{},[1]);
