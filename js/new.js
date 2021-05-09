const entry_title = document.getElementById('name');
const entry_date = document.getElementById('date');
const entry_body = document.getElementById('body');

const entry_preview = document.getElementById('preview');
const entry_locked = document.getElementById('locked');

const save_button = document.getElementById('save');

primaryColour();

setInterval(() => { initDate(); }, 500)

save_button.addEventListener('click', () => {
    save();
});

function initDate() {
    const date = new Date();
    const date_shornened = date.toLocaleDateString();
    const time = date.toLocaleTimeString();

    entry_date.innerHTML = `${date_shornened} ${time}`;
}

function genID() {
    let r = Math.random().toString(36).substring(7);
    return r;
}

function save() {
    const vents = fs.readdirSync(vents_dir).filter(vent => vent.includes('.json'));
    const id = genID();

    if (!vents.includes(id)) {
        const vent_object = {
            id: id,
            date: entry_date.innerHTML,
            title: entry_title.value,
            body: entry_body.value,
            options: {
                preview: entry_preview.checked,
                locked: entry_locked.checked,
            }
        }

        fs.writeFileSync(`${vents_dir}/${id}.json`,
            JSON.stringify(vent_object, null, 4));

        navigatePage('index');
    }
}