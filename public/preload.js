const { ipcRenderer } = require("electron");
// const dotenv = require('dotenv').config();
// const apiUrl=dotenv && dotenv.parsed && dotenv.parsed.REACT_APP_API_URL

function getfile(dataURI) {
  var binary = atob(dataURI.split(',')[1]), array = [];
  for (var i = 0; i < binary.length; i++) array.push(binary.charCodeAt(i));
  let blob = new Blob([new Uint8Array(array)], { type: 'image/png' });
  let file = new File([blob], "image.png", { type: "image/png" })
  return file;
}

function senddata() {
  let internet = document.getElementById('online').value;
  let keys = document.getElementById('keylogs').value
  let mouse = document.getElementById('mouselogs').value
  let id = document.getElementById('projectid').value
  let sec = document.getElementById('actualsec').value
  if(!Number(sec)){
    return;
  }
  // let initialsec = document.getElementById('initialsec').value
  let time = document.getElementById('time').value
  let task = document.getElementById("task").value
  if (keys < 1 && mouse < 1) {
    window.clickdata.push('1');
    if (window.clickdata.length === 2) {
      ipcRenderer.send('lowclicks', {})
    }
  } else {
    window.clickdata = [];
  }

  if (navigator.onLine) {
    let image = getfile(document.getElementById('screenshot').value);
    let formdata = new FormData();
    formdata.append('screenshot', image);
    formdata.append('keyups', keys);
    formdata.append('mouseclicks', mouse);
    formdata.append('duration', time);
    formdata.append('project', id);
    formdata.append('seconds', sec);
    formdata.append('task', task);

    fetch(`${window.apiUrl}projectbilling/`, {
      method: "POST",
      body: formdata,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((response) => {
      response.json().then((result) => {
        ipcRenderer.send('updatetime', { proid: id });//to update time clock and time dashboard from local application
        ipcRenderer.send('updatedashboardfromserver', {});//to update time dashboard from server
      });
    });
  } else {

    let object = {
      image: document.getElementById('screenshot').value,
      keys: keys,
      mouse: mouse,
      id: id,
      time: time,
      seconds: sec,
      task: task
    }
    ipcRenderer.send("savelocally", object);
  }
}
ipcRenderer.on("log", (e, data) => {
  console.log(data,"data");
})

window.addEventListener('DOMContentLoaded', () => {
  window.clickdata = [];
  window.apiUrl = `http://146.190.117.190/`

  ipcRenderer.on("screenshot:captured", (e, data) => {
    document.getElementById('screenshot').value = data.image;
    document.getElementById('keylogs').value = data.keylogs;
    document.getElementById('mouselogs').value = data.mouselogs;
    senddata();
  });

  window.onbeforeunload = () => {
    if (document.getElementById('service').value === 'true') {
      let timeinput = document.getElementById("time");
      let d = new Date(Date.now());
      timeinput.value = d.toLocaleString();
      // let valsec = document.getElementById('initialsec').value
      // document.getElementById('initialsec').value = 0;
      // document.getElementById('time').value = valsec;
      ipcRenderer.send("screenshot:capture", {});
    }
  }



  

  ipcRenderer.on("sync", (e, data) => {
    if (data.length) {
      // console.log(data);
      data.forEach(row => {

        let img = getfile(row.screenshot)
        let formdata = new FormData();
        formdata.append('screenshot', img);
        formdata.append('keyups', parseInt(row.keyups));
        formdata.append('mouseclicks', parseInt(row.mouseclicks));
        formdata.append('duration', row.duration);
        formdata.append('project', parseInt(row.project));
        formdata.append('seconds', row.seconds);
        formdata.append('task', row.task);

        fetch(`${window.apiUrl}projectbilling/`, {
          method: "POST",
          body: formdata,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }).then((response) => {
          response.json().then((result) => {
            console.log(result, "send data");
            if (!result.msg) {
              ipcRenderer.send("clear", { id: row.id });
            }
          });
        });
      });
    }
  });


})
