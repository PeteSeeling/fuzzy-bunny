import { 
    createBunny, 
    getFamilies, 
    checkAuth, 
    logout 
} from '../fetch-utils.js';

const form = document.querySelector('.bunny-form');
const logoutButton = document.getElementById('logout');

form.addEventListener('submit', async(e) => {
    e.preventDefault();
    // prevent default
    const data = new FormData(form);
    // get the name and family id from the for
    const name = data.get('bunny-name');
    const familyId = data.get('family-id');
    // use createBunny to create a bunny with this name and family id
    const newBunny = { name, family_id:familyId };
 
    await createBunny(newBunny);

    form.reset();
});

window.addEventListener('load', async() => {
    // let's dynamically fill in the families dropdown from supabase
    const idDropdown = document.querySelector('.family-id');
    // grab the select HTML element from the DOM
    const familyId = await getFamilies();
    // go get the families from supabase
    for (let family of familyId){
        const optionEl = document.createElement('option');

        optionEl.value = family.id;
        optionEl.textContent = family.name;

        idDropdown.append(optionEl);

    }
});
checkAuth();

logoutButton.addEventListener('click', () => {
    logout();
});
