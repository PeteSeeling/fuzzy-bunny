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
    console.log(name, familyId);
    await createBunny(name, familyId);
    
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
console.log(familyId);
        idDropdown.append(optionEl);

    }
    // for each family

    // create an option tag

    // set the option's value and text content

    // and append the option to the select
});


checkAuth();

logoutButton.addEventListener('click', () => {
    logout();
});
