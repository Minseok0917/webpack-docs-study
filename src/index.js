import AppComponent from './app'


console.log('AppComponent',AppComponent());

const $app = document.getElementById('app');
$app.textContent = process.env.mode;