const new_password = document.querySelector('#new-password');
const settings_dir = `${vent_dir}/config.json`;

if (!fs.existsSync(settings_dir)) fs.writeFileSync(settings_dir, JSON.stringify({ password: 'password' }, null, 4));

function savePassword() {
    if (new_password.value) {
        fs.writeFileSync(settings_dir, JSON.stringify({ password: new_password.value }, null, 4));
        navigatePage('index');
    }
}