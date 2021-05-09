const { remote, ipcRenderer, } = require('electron')
const electron = require('electron')
const fs = require('fs')

const home = require('os').homedir
const vent_dir = `${home}/Documents/Vent/`
const vents_dir = `${home}/Documents/Vent/Vents`

if (!fs.existsSync(vent_dir)) { fs.mkdirSync(vent_dir) }

if (!fs.existsSync(vents_dir)) { fs.mkdirSync(vents_dir) }

//Window Options

function exitApplication() {
    window.close()
}

function minimiseApplication() {
    remote.BrowserWindow.getFocusedWindow().minimize()
}

function maximiseApplication() {
    remote.BrowserWindow.getFocusedWindow().maximize()
}

//Window fade in

window.onload = () => {
    ipcRenderer.send('app_version')
    ipcRenderer.on('app_version', (event, arg) => {
        ipcRenderer.removeAllListeners('app_version')
        document.querySelector('#dash-title').innerText = `Vent v${arg.version}`
    })

    document.body.style.opacity = 1
}

function navigatePage(page, vent) {
    document.body.style.opacity = 0

    setTimeout(() => {
        window.location.href = `../pages/${page}.html`
    }, 300)

    if (page === 'view') ipcRenderer.send('view-vent', vent)
}

// Primary colour
function primaryColour() {
    const json = JSON.parse(fs.readFileSync(`${vent_dir}/config.json`))
    const root = document.documentElement

    root.style.setProperty('--lilac', json.primary)
    const purple = lightenColour(json.primary, -60)
    console.log(purple)
    root.style.setProperty('--purple', purple)
}

function lightenColour(col, amt) {
    var usePound = false
    if (col[0] == "#") {
        col = col.slice(1)
        usePound = true
    }

    var num = parseInt(col, 16)

    var r = (num >> 16) + amt

    if (r > 255) r = 255
    else if (r < 0) r = 0

    var b = ((num >> 8) & 0x00FF) + amt

    if (b > 255) b = 255
    else if (b < 0) b = 0

    var g = (num & 0x0000FF) + amt

    if (g > 255) g = 255
    else if (g < 0) g = 0

    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16)
}

// Alert
const alert = document.querySelector('#alert')
const alertTitle = document.querySelector('#alert-title')
const alertDescription = document.querySelector('#alert-description')
const showAlert = (title, description, update) => {

    alertTitle.textContent = title
    alertDescription.textContent = description

    alert.style.transform = 'translateY(0%)'

    alert.addEventListener('click', () => {
        if (!update) alert.style.transform = 'translateY(-150%)'
        else ipcRenderer.send('restart-app')
    })
}

// Handle auto updater messages
ipcRenderer.on('update_available', () => {
    console.log('Update Available')
    showAlert('An Update Is Available', 'Hey, good news! An update has been detected. It is being downloaded...', false)
})

ipcRenderer.on('update_not_available', () => {
    console.log('Updates not available')
})

ipcRenderer.on('update_downloaded', () => {
    showAlert('Update Downloaded', 'The update has been successfully downloaded. Click this notification to install it.', true)
})