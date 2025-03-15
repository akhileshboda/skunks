/*
var colorRadios = document.querySelectorAll('input[name="color"]');
var font = document.getElementById('Font');
var font_size = document.getElementById('Font Size');

localStorage.setItem('color', 'color')
localStorage.setItem('font', 'font')
localStorage.setItem('fontSize', 'font_size')

colorRadios.forEach(function(radio) {
  radio.addEventListener('change', function() {
    if (radio.checked) {
      localStorage.setItem('color', radio.value); // Save the selected color value
    }
  });
});
*/

document.addEventListener('DOMContentLoaded', function() {
    loadSettings();
    setupEventListeners();
});
