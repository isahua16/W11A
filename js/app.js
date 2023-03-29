function choose_pokemon(event)
{   
    //This logic will display a border around the currently selected pokemon. 
    if(!document.querySelector(`.selected`))
    {
        // If the selector for the selected class returns null, add the selected class to pokemon the user just clicked
        event[`currentTarget`][`classList`].add(`selected`);
    }
    else
    {
        //Otherwise, remove the selected class from whatever element has the selected class and then add the selected class to the current selection. I think I could reduce my code by removing the selected class without checking if it exists first, but I think it would through an error in the cases when it does not exist.
        document.querySelector(`.selected`)[`classList`].remove(`selected`);
        event[`currentTarget`][`classList`].add(`selected`);
    }

    let pokemon_selection;
    for(let i = 0; i < party.length; i++)
    {
        //Compare all the pokemon's names available in the party to match it to the clicked elemebt's pokemon attribute. I convert the `name` key to lower case here because attributes are all lower case.
        if(party[i][`name`].toLowerCase() === event[`currentTarget`].getAttribute(`pokemon`))
        {
            //When it finds a match, convert the data to JSON and store it into the cookie. And also break the loop. I found this keyword online in order to interrupt the loop as soon as it finds a match similar to the return keyword in functions.
            pokemon_selection = JSON.stringify(party[i]);
            Cookies.set(`chosen_pokemon`, pokemon_selection);
            break;
        } 
    }
}


let party = [
    {
        name:`Charmander`,
        image_url: `/images/charmander.png`,
        description: `Charmander is a fire-type Pokemon that resembles a small orange lizard with a flame at the end of its tail. It has large, blue eyes and a pointed snout. Charmander's flame burns brighter as it becomes stronger, and it is said that when the flame goes out, Charmander will die. Charmander is known for its fierce determination and loyalty to its trainer, making it a popular choice among Pokemon trainers.`
    },
    {
        name: `Squirtle`,
        image_url: `/images/squirtle.png`,
        description: `Squirtle is a water-type Pokemon that resembles a small blue turtle with a shell on its back. Its eyes are large and brown, and it has long, pointed ears. Squirtle is known for its powerful water attacks, which it can shoot from its mouth or manipulate with its tail. It is also able to retract its limbs and head into its shell for protection. Squirtle is a loyal and friendly Pokemon, making it a popular choice for trainers who value cooperation and teamwork.`
    },
    {
        name: `Bulbasaur`,
        image_url: `/images/bulbasaur.png`,
        description: `Bulbasaur is a grass/poison-type Pokemon that looks like a small, squat dinosaur with a large, green bulb on its back. The bulb contains nutrients that Bulbasaur needs to survive, and it can also release powerful attacks. Bulbasaur's eyes are a bright red color, and it has pointed ears and sharp teeth. This Pokemon is known for its calm and patient nature, as well as its ability to quickly adapt to different environments.`
    }
];

//Create an array of all the elements that contain the selection class and add event listeners to all of them
let pokemon_buttons = document.querySelectorAll(`.selection`);
for(let i = 0; i < pokemon_buttons.length; i++)
{
    pokemon_buttons[i].addEventListener(`click`, choose_pokemon);
}

//This code is making sure the user can only select one pokemon. I thought of using radio buttons for this, but I was not sure how to use JS with radio buttons.
if(Cookies.get(`chosen_pokemon`) !== undefined)
{
    //If there is a cookie of chosen_pokemon, get this data and parse it.
    let stored_selection = JSON.parse(Cookies.get(`chosen_pokemon`));
    
    //For all available pokemon buttons, check to see if their outer html contain the name of the pokemon stored in the cookie. If it does, add the selected class to that button.
    for(let i = 0; i < pokemon_buttons.length; i++)
    {
        if (pokemon_buttons[i][`outerHTML`].includes(`pokemon="${stored_selection[`name`].toLowerCase()}"`) === true)
        {
            pokemon_buttons[i][`classList`].add(`selected`);
            break;
        }
    }
}

