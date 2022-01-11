import { 
    checkAuth, 
    deleteBunny, 
    getFamilies, 
    logout,
} from '../fetch-utils.js';

checkAuth();

const familiesEl = document.querySelector('.families-container');
const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});


async function displayFamilies() {
    // fetch families from supabase
    const families = await getFamilies();
    // clear out the familiesEl
    familiesEl.textContent = '';

    for (let family of families) {
        // create three elements for each family, one for the whole family, one to hold the name, and one to hold the bunnies
        const wholeFamily = document.createElement('div');
        const familyName = document.createElement('h3');
        const familyBunnies = document.createElement('div');
        // add the bunnies css class to the bunnies el, and family css class to the family el
        wholeFamily.classList.add('family');
        familyName.textContent = family.name;
     
        familyBunnies.classList.add('bunnies');
       
        for (let bunny of family.fuzzy_bunnies) {
            const bunnyEl = document.createElement('p');
        
            bunnyEl.classList.add('bunny');
        // for each of this family's bunnie
            bunnyEl.addEventListener('click', async() =>{
                await deleteBunny(bunny.id);
                displayFamilies();
            });

            bunnyEl.textContent = `${bunny.name}`;
            familyBunnies.append(bunnyEl);
    
        }
        wholeFamily.append(familyName, familyBunnies);
        familiesEl.append(wholeFamily);
    // append the bunniesEl and nameEl to the familyEl
    // append the familyEl to the familiesEl
    }}

window.addEventListener('load', async() => {
    const families = await getFamilies();

    displayFamilies(families);
});