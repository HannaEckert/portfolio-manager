process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true;

const electron = require('electron')
const config = require("./config.json");
const app = electron.app
const BrowserWindow = electron.BrowserWindow

function createWindow() {
	let mainWindow = new BrowserWindow({ 
		  width: 350
		, height: 1000 
		, webPreferences: {
			zoomFactor: 0.2
		}
		, icon: './icon.png'
	})

	mainWindow.setMenuBarVisibility(false)
	mainWindow.loadURL(`file://${__dirname}/index.html`)
	// mainWindow.webContents.openDevTools()
}
app.on('ready', createWindow)


// Function exports

exports.getUrl = () => {
	return config.url
}

exports.updateImages = images => {
	const fs = require('fs')
	const Ftp = require('ftp')

	fs.writeFile(config.file, images.join('\n'), error => {
		if(error) { throw error }

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
