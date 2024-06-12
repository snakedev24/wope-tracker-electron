const { app, BrowserWindow, desktopCapturer, ipcMain, Menu } = require('electron')
const electronDialog = require('electron').dialog;
const path = require('path')
const isDev = require('electron-is-dev')
const ioHook = require('iohook');
const sqlite3 = require('sqlite3').verbose();
const appDataPath = app.getPath('appData');
let mainWindow: any = null;
var keydownlogs = 0;
var mousedownlogs = 0;

const insert = (screenshot, task, keyups, mouseclicks, project, duration, seconds) => {

    db.serialize(async () => {
        if (screenshot && keyups && mouseclicks && project && duration && seconds && task) {
            let qry = `INSERT INTO projectbilling ( screenshot ,task, keyups , mouseclicks, project, duration, seconds )VALUES('${screenshot}','${task}',${keyups},${mouseclicks},${project},'${duration}',${seconds});`
            await db.run(qry, function (err) {
                if (err) {
                    console.error(err.message);
                }
                console.log("saved Locally");
                mainWindow.webContents.send("log", 'saved')
                mainWindow.webContents.send("updatedashboard", { proid: project })
            });
        }
    });
}

const create = () => {
    let qry = `CREATE TABLE IF NOT EXISTS projectbilling (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            screenshot TEXT NOT NULL,
            task TEXT NOT NULL,
            keyups INTEGER NOT NULL,
            mouseclicks INTEGER NOT NULL,
            project INTEGER NOT NULL,
            duration TEXT NOT NULL,
            seconds INTEGER NOT NULL
        );`;
    db.serialize(() => {
        db.run(qry, function (err) {
            if (err) {
                console.error(err.message);
                mainWindow.webContents.send("log", err);
            }
            console.log("DB TABLE SETUP DONE");
            mainWindow.webContents.send("log", 'rows')
        });
    });
}

const select = () => {
    let qry = `SELECT * FROM projectbilling;`;

    db.all(qry, [], (err, rows) => {

        if (err) {
            console.error(err);
        }
        if (rows) {
            mainWindow.webContents.send("sync", rows)
        }
    });
}

const deleterow = (id) => {
    db.serialize(() => {
        if (id) {
            let qry = `DELETE FROM projectbilling WHERE id=${id}`;
            db.run(qry, function (err) {
                if (err) {
                    console.error(err.message);
                    mainWindow.webContents.send("log", { err })
                }
                mainWindow.webContents.send("log", "sent")
                console.log("deleted Locally");
            });
        }
    });
}

let db = new sqlite3.Database(path.join(appDataPath, 'digibuddies', 'database.db'), (err) => {
    if (err) {
        console.error(err.message);

    } else {
        console.log('Connected to the sqlite database.');
        create();
    }
});

const closewindow = () => {
    mainWindow.close();
}

const createMainWindow = () => {
    mainWindow = new BrowserWindow({
        autoHideMenuBar: false,
        // resizable:false,
        devTools: false,
        width: 1000,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js')
        }
    })
    // Menu.setApplicationMenu(null)
    mainWindow.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, 'index.html')}`
    )
}

app.on('ready', () => {
    createMainWindow();

})
// Menu.setApplicationMenu(null)

ioHook.on('keyup', () => {
    keydownlogs += 1;
});
ioHook.on('mouseup', () => {
    mousedownlogs += 1;
});
ipcMain.on('logger:start', () => {
    ioHook.start();
});
ipcMain.on('logger:stop', () => {
    ioHook.stop();
});
ipcMain.on('changetimr', () => {
    mainWindow.webContents.send("gettime", {})
});
ipcMain.on('updatetime', (e, data) => {
    mainWindow.webContents.send("updatedashboard", { proid: data.proid })
});
ipcMain.on('updatedashboardfromserver', (e, data) => {
    mainWindow.webContents.send("updatedashboardfromserver", {})
});
ipcMain.on('stop', () => {
    mainWindow.webContents.send("stoptimer", {})
});
ipcMain.on('minimize', () => {
    mainWindow.setBounds({ width: 250, height: 100 })
})
ipcMain.on('maximize', () => {
    mainWindow.setBounds({ width: 1000, height: 800, x: 0, y: 0 })
    mainWindow.webContents.send("setborder", {})
})
ipcMain.on('savelocally', (e, data) => {
    insert(data.image, data.task, data.keys, data.mouse, data.id, data.time, data.seconds)
})
ipcMain.on('fetch', () => {
    select();
})
ipcMain.on('getdatafromlocal', (e, data) => {
    let qry = `SELECT * FROM projectbilling where project=${data.project};`;

    db.all(qry, [], (err, rows) => {
        if (err) {
            console.error(err);
        }
        if (rows) {
            mainWindow.webContents.send("localdata", rows)
        }
    });
})
ipcMain.on('warn', () => {
    electronDialog.showMessageBox(mainWindow, {
        'type': 'question',
        'title': 'Confirmation',
        'message': "Are you sure?\nif you close the application your data will be deleted, Please connect to internet to save your data",
        'buttons': [
            'Yes',
            'No'
        ]
    }).then((result) => {
        if (result.response !== 0) { return; }
        if (result.response === 0) {
            console.log('chal bey');
            mainWindow.webContents.send("quit", {})
        }
    })
})
ipcMain.on('lowclicks', () => {
    electronDialog.showMessageBox(mainWindow, {
        type: 'info',
        message: 'you have low working on your project',
        buttons: ['OK'],
    })
})

ipcMain.on('clear', (e, data) => {
    deleterow(data.id);
})
ipcMain.on('quit', () => {
    closewindow()
    mainWindow.webContents.send("quit", {})
})
ipcMain.on('screenshot:capture', () => {
    desktopCapturer.getSources({
        types: ["screen"],
        thumbnailSize: { width: 1920, height: 1080 }
    }).then(sources => {
        let image = sources[0].thumbnail.toDataURL();
        mainWindow.webContents.send("screenshot:captured", { image: image, keylogs: keydownlogs, mouselogs: mousedownlogs });
        keydownlogs = 0;
        mousedownlogs = 0;
        // var fs = require('fs');

        // var data = image.replace(/^data:image\/\w+;base64,/, "");
        // var buf = Buffer.from(data, 'base64');

        // fs.writeFile(path.join(__dirname,`/Screens/image-${Date.now()}.png`), buf, (err) => {
        //     if (err) throw err;
        const photowindow = new BrowserWindow({
            modal: true,
            autoHideMenuBar: true,
            resizable: false,
            devTools: false,
            width: 300,
            height: 200,
            minWidth: 500, maxWidth: 500, minHeight: 300, maxHeight: 300,
            frame: false,
            transparent: true,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
            }
            // alwaysOnTop:true,
        })
        photowindow.loadURL(image);
        photowindow.show();

        setTimeout(() => {
            photowindow.close();
        }, 3000)
        // })
    })

})