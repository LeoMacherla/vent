//Require Electron
const { BrowserWindow, app, ipcMain } = require('electron');

//Electron reload
// require('electron-reload')(__dirname, {
//     ignored: /data|[/\\]\./,
// });

//Disable security warnings
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

//Main window
function createMain() {
    const main = new BrowserWindow({
        width: 560,
        height: 800,
        frame: null,
        resizable: false,
        icon: './assets/icon.png',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    });

    main.loadFile('./pages/index.html');
    main.setMenu(null);

    main.webContents.toggleDevTools();

    main.webContents.on('did-finish-load', function () {
        //Show main window once web contents has locaded
        main.show();

        ipcMain.on('view-vent', (e, arg) => {
            setTimeout(() => {
                main.webContents.send('vent-id', arg);
            }, 500);
        });
    });

    //Tries to quit the application when main window is closed
    main.on('closed', function () {
        app.quit();
    });
}

//Once the Electron application is initialised (when it is ready) the function createMain is called
app.whenReady()
    .then(createMain);

//When the application is launched, if it has no windows open then it will call the createMain function
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createMain();
    }
});