process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true;

const electron = require('electron')
const config = require("./config.json");
const app = electron.app
const BrowserWindow = electron.BrowserWindow

function createWindow() {
	let mainWindow = new BrowserWindow({ 
		  width: 300
		, height: 1000 
		, webPreferences: {
			zoomFactor: 0.2
		}
	})

	mainWindow.loadURL(`file://${__dirname}/index.html`)
	// mainWindow.webContents.openDevTools()
}
app.on('ready', createWindow)


// Function exports

exports.getUrl = function() {
	return config.url
}

exports.updateImages = function(images) {
	const fs = require('fs')
	const Ftp = require('ftp')

	fs.writeFile(config.file, images.join('\n'), error => {
		if(error) { throw error }
g
		let ftp = new Ftp()
		ftp.on('ready', () => {
			ftp.put(config.file, config.file, error => {
				if(error) { throw error }
				ftp.end()
			})
		})
		ftp.connect(config.ftp)
	})
}