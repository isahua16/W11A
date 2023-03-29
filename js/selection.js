let message = document.querySelector(`#message`);
let pokemon_card = document.querySelector(`article`);
let cookie_json = Cookies.get(`chosen_pokemon`);

//Guard for cases where the user has not selected a pokemon. In this case, it will display an error message.
if(cookie_json === undefined)
{
    message[`outerHTML`] = `<h1 id="message">You have not selected a Pokemon!</h1>`
}

//In the case where the user has selected a pokemon, and their selection is stored as a cookie, parse the JSON, and insert the data in the empty article.
if(cookie_json !== undefined)
{
    let pokemon_data = JSON.parse(cookie_json);
    pokemon_card.insertAdjacentHTML(`afterbegin`, `<p>${pokemon_data[`description`]}</p>` );
    pokemon_card.insertAdjacentHTML(`afterbegin`, `<h3>${pokemon_data[`name`]}</h3>` );
    pokemon_card.insertAdjacentHTML(`afterbegin`, `<img src="${pokemon_data[`image_url`]}" alt="">` );
}


