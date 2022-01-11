import { 
    checkAuth, 
    createBunny, 
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
        wholeFamily.append(familyName, familyBunnies);
        familiesEl.append(wholeFamily);

       
        for (let bunny of family.fuzzy_bunnies) {
            const bunnyEl = document.createElement('p');

            bunnyEl.classList.add('bunny');
           
        // for each of this family's bunnie
            bunnyEl.addEventListener('click', async() =>{
                await deleteBunny(bunny.id);
                displayFamilies();
         
            });
            bunnyEl.textContent = `${bunny.name}`;

        // make an element with the css class 'bunny', and put the bunny's name in the text content
            familyBunnies.append(bunnyEl);
            wholeFamily.append(familyBunnies);
        // add an event listener to the bunny el. On click, delete the bunny, then refetch and redisplay all families.
        familiesEl.append(wholeFamily);


        // append this bunnyEl to the bunniesEl
        }

    // append the bunniesEl and nameEl to the familyEl

    // append the familyEl to the familiesEl
    }}

window.addEventListener('load', async() => {
    const families = await getFamilies();

    displayFamilies(families);
});