const title = document.querySelector('#title');
const date = document.querySelector('#date');
const body = document.querySelector('#body');

let json;

ipcRenderer.on('vent-id', (e, arg) => {
    json = JSON.parse(fs.readFileSync(`${vents_dir}/${arg}`));

    title.textContent = json.title;
    date.textContent = json.date;

    if (json.options.locked) {
        body.innerHTML = '<input type="password" name="password" id="password" placeholder="Password"> <button class="btn" onclick="verifyPassword()">Acess Entry</button>';
    } else {
        body.innerHTML = json.body;
    }
});

function verifyPassword() {

    const config = JSON.parse(fs.readFileSync(`${vent_dir}/config.json`));
    const password = config.password;

    if (document.querySelector('#password').value === password) {
        body.innerHTML = json.body;
    }
}