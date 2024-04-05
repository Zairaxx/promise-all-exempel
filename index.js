let dropdownChoice = document.querySelector("#character");
let button = document.querySelector("#getCharacter");
let div = document.querySelector("#character-info");

let getData = async (url) => {
  let response = await fetch(url);
  let data = await response.json();
  return data;
};

button.addEventListener("click", async () => {
  let characterId = dropdownChoice.value;
  console.log(characterId);
  //fetch
  let data = await getData("https://swapi.dev/api/people/" + characterId);

  //Add to DOM
  div.innerHTML = `
  <p>Namn:${data.name}</p>
  <p>Födelseår:${data.birth_year}</p>
  <p>Längd:${data.height} cm</p>
  <p>Vikt:${data.mass} kg</p>
  <p>Förekommer i följande filmer:</p>
  `;

  //Promise.all
  console.log(data.films);

  //Filmer personen förekommer i
  let promises = data.films.map((movieURL) => {
    return getData(movieURL);
  });
  let movies = await Promise.all(promises);
  console.log(movies);

  movies.forEach((movie) => {
    div.innerHTML += `<p>${movie.title}</p>`;
  });

  //Fordon som personen ägt
  let vehicles = await Promise.all(
    data.vehicles.map((vehicle) => getData(vehicle))
  );
  console.log(vehicles);
  let text = "<strong>Fordon: </strong>";

  vehicles.forEach((vehicle) => {
    text += `<p> ${vehicle.name}</p>`;
  });

  console.log(text);
  div.innerHTML += text;

  //Starships

  //Exempel på .map

  //   let fruits = ["Mango", "Päron", "Äpple"];

  //   let milkshakes = fruits.map((fruit) => {
  //     return fruit + " milkshake";
  //   });

  //   console.log(milkshakes); //[ "Mango milkshake", "Päron milkshake", "Äpple milkshake" ];

  let starships = await Promise.all(
    data.starships.map((ship) => getData(ship))
  );
  console.log(starships);

  let shipText = "<strong>Starships: </strong>";

  starships.forEach((ship) => {
    shipText += `<p> ${ship.name}</p>`;
  });

  div.innerHTML += shipText;
});
