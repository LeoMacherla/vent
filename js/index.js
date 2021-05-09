const vents_list = document.querySelector('.vents-list');

displayVents();
primaryColour();

function displayVents() {
    const vents = fs.readdirSync(vents_dir)
        .sort((v1, v2) => {
            const json1 = JSON.parse(fs.readFileSync(`${vents_dir}/${v1}`));
            const json2 = JSON.parse(fs.readFileSync(`${vents_dir}/${v2}`));

            if (json1.date < json2.date) return 1;
            else return -1;
        });


    vents.forEach(vent => {
        const json = JSON.parse(fs.readFileSync(`${vents_dir}/${vent}`));

        const li = document.createElement('li');
        li.classList.add('card');
        li.classList.add('vent');

        li.addEventListener('click', () => navigatePage('view', vent));

        const h2 = document.createElement('h2');
        h2.textContent = json.title;

        const span = document.createElement('span');
        span.classList.add('text-777');
        span.innerHTML = json.date;

        const p = document.createElement('p');

        if (json.options.preview) {
            p.textContent = json.body;
        } else {
            p.textContent = 'Preview Hidden';
        }

        const img = document.createElement('img');

        if (json.options.locked) {
            img.src = '../assets/lock.svg';
        }

        li.appendChild(h2);
        li.appendChild(span);
        li.appendChild(p);
        li.appendChild(img);
        vents_list.appendChild(li);
    });
}