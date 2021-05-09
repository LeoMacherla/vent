const new_password = document.querySelector('#new-password');
const primary_color = document.querySelector('#primary-color');
const primary_color_label = document.querySelector('#primary-color-label');
const settings_dir = `${vent_dir}config.json`;


if (!fs.existsSync(settings_dir)) fs.writeFileSync(settings_dir, JSON.stringify({ password: 'password', primary: '#dc6bff', censorType: 'hover' }, null, 4));


const current_settings = JSON.parse(fs.readFileSync(settings_dir));
primaryColour();

primary_color.value = current_settings.primary;
primary_color_label.textContent = primary_color.value;
primary_color_label.style.color = primary_color.value;

let rads = Array.from(document.getElementsByName('censor-radio'));
rads = rads.filter(r => r.value == current_settings.censorType);
rads[0].checked = true;

primary_color.addEventListener('change', () => {
    primary_color.style.borderColor = primary_color.value;
    primary_color_label.textContent = primary_color.value;
    primary_color_label.style.color = primary_color.value;
});

function saveSettings() {
    const obj = {
        password: '',
        primary: '',
        censorType: 'Test',
    }

    if (new_password.value) {
        obj.password = new_password.value;
    } else {
        obj.password = current_settings.password;
    }

    if (primary_color.value) {
        obj.primary = primary_color.value;
    } else {
        obj.primary = current_settings.primary;
    }

    const radio = Array.from(document.getElementsByName('censor-radio')).filter(r => r.checked);
    obj.censorType = radio[0].value;

    fs.writeFileSync(settings_dir, JSON.stringify(obj, null, 4));
    navigatePage('index');
}

function resetColour() {
    primary_color.value = '#dc6bff';
    primary_color.style.borderColor = primary_color.value;
    primary_color_label.textContent = primary_color.value;
    primary_color_label.style.color = primary_color.value;
    primaryColour();
}