const {ipcRenderer} = require('electron')
const ipc = ipcRenderer;

const close = document.getElementById('close-button');

close.addEventListener('click', () => {
    ipc.send('close');
})

const minimize = document.getElementById('min-button');

minimize.addEventListener('click', () => {
    ipc.send('minimize');
})