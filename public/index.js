const electron = require("electron");
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

const {
    app,
    BrowserWindow,
    ipcMain,
} = electron;

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        height: 600,
        width: 800,
        webPreferences: {
            backgroundThrottling: false,
            nodeIntegration: false,
            preload: __dirname + '/preload.js',
        }
    });

    //mainWindow.loadURL(`file://${__dirname}/public/index.html`);
    mainWindow.loadURL('http://localhost:3000');
});
// Open the DevTools.
// mainWindow.webContents.openDevTools();

// Emitted when the window is closed.
// mainWindow.on('closed', function () {
//     // Dereference the window object, usually you would store windows
//     // in an array if your app supports multi windows, this is the time
//     // when you should delete the corresponding element.
//     mainWindow = null
// })

let serialData = [];
// document.addEventListener('DOMContentLoaded', function () {
//     //     console.log('All assets are loadeddddd');



//     //console.log('Error: ', "Neetika");
var port = new SerialPort('/dev/cu.wchusbserial1430', {
    baudRate: 9600,
    parity: 'none',
    stopBits: 1,
    dataBits: 8,
    flowControl: false,
});
// Open errors will be emitted as an error event
var parser = port.pipe(new Readline({
    delimiter: '\n'
}));
port.on('error', function (err) {
    console.log('Error: ', err.message);

})



port.on("open", function () {
    // for (var i = 0; i < 1000; i++) {
    //console.log("openmmmm");
    // port.write("22")
    //      setTimeout(function() {
    //     port.write("1"); // will be received on the other end of the port.
    //   }, 200000);
    // }
});

parser.on('data', (serialData)=>{
    var serialDataRecd = serialData.substring(0, serialData.length-1)
    //console.log("------",serialDataRecd);
    if (serialDataRecd==="HSuccess"){
        console.log("Handshake success")
        mainWindow.webContents.send('handshake:complete', "handshakeData sucessful")
    }else if (serialDataRecd==="dc"){
        console.log("disconnected")
       mainWindow.webContents.send('serial:stopped', "serial stopped")
    }
    else if (serialDataRecd.includes("RUN") ){
         console.log("recieved bv" ,serialDataRecd)
        mainWindow.webContents.send('diagnostics:complete', serialDataRecd)
      }
    else{
        //send data to console that handshake is not sucessful
        console.log("donno")
        mainWindow.webContents.send('handshake:complete', "handshakeData error")
    }
})

ipcMain.on('handshake:start', (event, handshakeData) => {
    console.log("handshakeData before write"); //send this data to serial out
    // console.log('lets check port', port);

    if (port.isOpen) {
        //console.log("its open now");

    } else {
        //console.log("its noooooooo open");        
        port.open(() => {
            console.log("opened now")
        })
    }  
    setTimeout(function () {
        port.write('neetika\n');
     }, 2000);

    port.on('error', function (err) {
        console.log('Error: ', err.message);

    })
    
});

ipcMain.on('serial:stop', (event, serialDisconnect) => {
    console.log("please disconnect"); //send this data to serial out
    //setTimeout(function () {
        port.write('close\n');
     //}, 2000);
     setTimeout(function () {
    port.close(() => {
        //console.log("yesssssssssssssssssss")
    })}, 2000);
    mainWindow.webContents.send('serial:stopped', "serial stopped")
});

ipcMain.on('diagnostics:start', (event, serialDiagnosticData) => {
    console.log("serial diagnostic data", serialDiagnosticData); //send this data to serial out
        port.write(serialDiagnosticData);    
   
});

//     // parser.on('data', (data) => {
//     //     //serialData.shift();
//     //     console.log('Data serial:', serialData);
//     //     serialData.push(data);

//     //     document.querySelector('#result').innerHTML = ` Data from serial port is ${data}`;
//     //     console.log('gs original value :', g.originalValue);
//     //     // g.refresh(data);
//     //     // myLineChart.data.datasets[0].data.push(data);
//     //     // myLineChart.data.labels.push("Newly Added");
//     //     // if (myLineChart.data.datasets[0].data.length == 50) {
//     //     //     myLineChart.data.datasets[0].data.shift();
//     //     //     myLineChart.data.labels.shift();
//     //     // }
//     //     // myLineChart.update();
//     // });


//     // // Read data that is available but keep the stream from entering "flowing mode"
//     // parser.on('readable', (data) => {
//     // console.log('Data: again', data);
//     // document.querySelector('#result').innerHTML = ` Data from serial port is ${data}`;

//     // });

// });