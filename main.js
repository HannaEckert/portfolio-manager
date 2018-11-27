process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true;

const electron = require('electron')

const app = electron.app
const BrowserWindow = electron.BrowserWindow

let mainWindow

function createWindow() {
	mainWindow = new BrowserWindow({ 
		  width: 1000
		, height: 800 
		, webPreferences: {
			zoomFactor: 0.2
		}
	})

	mainWindow.loadURL(`file://${__dirname}/index.html`)
	mainWindow.webContents.openDevTools()
}

app.on('ready', createWindow)

exports.updateImages = function(images) {
	console.log(images)
	// Here, the file has to be written and uploaded
}