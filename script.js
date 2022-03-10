const sectionListPlayers = document.getElementById("sectionListPlayers");
const sectionNewPlayers = document.getElementById("sectionNewPlayers");
const sectionEditPlayers = document.getElementById("sectionEditPlayers");

const productTableBody = document.getElementById("productTableBody");
const listPlayers = document.getElementById("listPlayers");
const newPlayers = document.getElementById("newPlayers");
const editPlayers = document.getElementById("editPlayers");

const submitNewButton = document.getElementById("submitNewButton");
const newName = document.getElementById("newName");
const newAge = document.getElementById("newAge");
const newJersey = document.getElementById("newJersey");
const newBdate = document.getElementById("newBdate");

const submitEditButton = document.getElementById("submitEditButton");
const editName = document.getElementById("editName");
const editAge = document.getElementById("editAge");
const editJersey = document.getElementById("editJersey");
const editBdate = document.getElementById("editBdate");

const searchBar = document.getElementById("searchbar");
var OurUrl = "https://hockeyplayers.systementor.se/{michelle@yahoo.com}/player";

class Player {
  constructor(id, namn, jersey, age, born) {
    this.id = id;
    this.namn = namn;
    this.jersey = jersey;
    this.age = age;
    this.born = born;
  }
}

const players = [];

//get player list
function playerList() {
  const request = {
    headers: {
      "Content-type": "application/json",
    },
    method: "GET",
  };

  fetch(OurUrl, request)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item) => {
        const p = new Player(
          item.id,
          item.namn,
          item.age,
          item.jersey,
          item.born
        );
        players.push(p);
      });
      console.log(players);
      playerListSuccess(players);
    });
}

let currentPlayer = null;

//CREATE TR
function createNewTr(player) {
  let tr = document.createElement("tr");

  let td1 = document.createElement("td");
  tr.appendChild(td1);
  td1.innerText = player.namn;

  let td11 = document.createElement("td");
  tr.appendChild(td11);
  td11.innerText = player.age;

  let td111 = document.createElement("td");
  tr.appendChild(td111);
  td111.innerText = player.jersey;

  let td1111 = document.createElement("td");
  tr.appendChild(td1111);
  td1111.innerText = player.born;

  let td2 = document.createElement("td");
  tr.appendChild(td2);
  td2.innerHTML = '<i class="bi bi-pencil-square"></i>';

  td2.addEventListener("click", () => {
    currentPlayer = player;
    editName.value = player.namn;
    editAge.value = player.age;
    editJersey.value = player.jersey;
    editBdate.value = player.born;
    sectionEditPlayers.style.display = "block";
    sectionListPlayers.style.display = "none";
    sectionNewPlayers.style.display = "none";
  });

  return tr;
}

// Display list returned from Web API call
function playerListSuccess(items) {
  productTableBody.innerHTML = "";
  items.forEach((item) => {
    let tr = createNewTr(item);
    productTableBody.appendChild(tr);
  });
}

playerList();

//LIST RELATED

listPlayers.addEventListener("click", () => {
  sectionEditPlayers.style.display = "none";
  sectionListPlayers.style.display = "block";
  sectionNewPlayers.style.display = "none";
});

//NEW RELATED

newPlayers.addEventListener("click", () => {
  sectionEditPlayers.style.display = "none";
  sectionListPlayers.style.display = "none";
  sectionNewPlayers.style.display = "block";
});

submitNewButton.addEventListener("click", () => {
  const nyPlayer = {
    namn: newName.value,
    age: newAge.value,
    jersey: newJersey.value,
    born: newBdate.value,
  };

  const request = {
    method: "POST",
    body: JSON.stringify(nyPlayer),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  fetch(OurUrl, request)
    .then((response) => response.json())
    .then((json) => playerList());

  sectionListPlayers.style.display = "block";
  sectionNewPlayers.style.display = "none";
  sectionEditPlayers.style.display = "none";
});

//EDIT Related

//submitEditButton.addEventListener("click", playerUpdate);

//function playerUpdate() {
submitEditButton.addEventListener("click", () => {
  //mappa inputs editname,editprice ->objektet

  currentPlayer.namn = editName.value;
  currentPlayer.age = editAge.value;
  currentPlayer.jersey = editJersey.value;
  currentPlayer.born = editBdate.value;
  var url = OurUrl + currentPlayer.id;

  // Call Web API to update product

  const request = {
    method: "PUT",
    body: JSON.stringify({
      id: currentPlayer.id,
      namn: editName.value,
      age: editAge.value,
      jersey: editJersey.value,
      born: editBdate.value,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  fetch(url, request)
    //no json response
    .then((response) => playerListSuccess(players));
  //.then((json) =>

  //playerListSuccess(players);
  sectionEditPlayers.style.display = "none";
  sectionListPlayers.style.display = "block";
  sectionNewPlayers.style.display = "none";
});

//search fxn
//https://www.w3schools.com/howto/howto_js_filter_table.asp -- V1

//cleaner code

searchBar.addEventListener("keyup", () => {
  let filteredPlayers = players.filter((p) =>
    p.namn.toLowerCase().includes(searchBar.value.toLowerCase())
  );

  playerListSuccess(filteredPlayers);
});

//sorting
//https://www.w3schools.com/howto/howto_js_sort_table.asp -v1
// https://stackoverflow.com/questions/14267781/sorting-html-table-with-javascript -v2 //avoid writing onclick on HTML

const getCellValue = (tr, idx) =>
  tr.children[idx].innerText || tr.children[idx].textContent;

const comparer = (idx, asc) => (a, b) =>
  ((v1, v2) =>
    v1 !== "" && v2 !== "" && !isNaN(v1) && !isNaN(v2)
      ? v1 - v2
      : v1.toString().localeCompare(v2))(
    getCellValue(asc ? a : b, idx),
    getCellValue(asc ? b : a, idx)
  );

// do the work...

document.querySelectorAll("th").forEach((th) =>
  th.addEventListener("click", () => {
    const table = th.closest("table");
    const tbody = table.querySelector("tbody");
    Array.from(tbody.querySelectorAll("tr"))
      .sort(
        comparer(
          Array.from(th.parentNode.children).indexOf(th),
          (this.asc = !this.asc)
        )
      )
      .forEach((tr) => tbody.appendChild(tr));
  })
);
