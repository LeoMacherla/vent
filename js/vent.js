const { remote, ipcRenderer, } = require('electron');
const electron = require('electron');
const fs = require('fs');

const home = require('os').homedir;
const vent_dir = `${home}/Documents/Vent/`
const vents_dir = `${home}/Documents/Vent/Vents`;

if (!fs.existsSync(vent_dir)) { fs.mkdirSync(vent_dir); }

if (!fs.existsSync(vents_dir)) { fs.mkdirSync(vents_dir); }

//Window Options

function exitApplication() {
    window.close();
}

function minimiseApplication() {
    remote.BrowserWindow.getFocusedWindow().minimize();
}

function maximiseApplication() {
    remote.BrowserWindow.getFocusedWindow().maximize();
}

//Window fade in

window.onload = () => { document.body.style.opacity = 1; }

function navigatePage(page, vent) {
    document.body.style.opacity = 0;

    setTimeout(() => {
        window.location.href = `../pages/${page}.html`;
    }, 300);

    if (page === 'view') ipcRenderer.send('view-vent', vent);
}