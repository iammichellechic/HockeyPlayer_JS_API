import { players, Player } from "./Data/Player.js";
import { showSection } from "./UI/Sections.js";

const productTableBody = document.getElementById("productTableBody");
const listPlayers = document.getElementById("listPlayers");
const newPlayers = document.getElementById("newPlayers");

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
var asc; //global scope strict mode

//GET player list
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

    showSection("sectionEditPlayers");
  });

  return tr;
}

// Display list returned from Web API call

//export function playerListSuccess(items){  --No no no circular referencing
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
  showSection("sectionListPlayers");
});

//NEW RELATED

newPlayers.addEventListener("click", () => {
  showSection("sectionNewPlayers");
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

  showSection("sectionListPlayers");
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

  showSection("sectionListPlayers");
});

//SEARCH fxn
//cleaner code -covers all params
//https://betterprogramming.pub/sort-and-filter-dynamic-data-in-table-with-javascript-e7a1d2025e3c
searchBar.addEventListener("keyup", () => {
  filterPlayers();
  //playerListSuccess(filteredPlayers);
});

function filterPlayers() {
  // let filteredPlayers = players.filter((p) =>
  //   p.namn.toLowerCase().includes(searchBar.value.toLowerCase())
  // );
  let filteredPlayers = searchBar.value.toUpperCase();
  let rows = productTableBody.getElementsByTagName("TR");
  let flag = false;

  for (let row of rows) {
    let cells = row.getElementsByTagName("TD");
    for (let cell of cells) {
      if (cell.textContent.toUpperCase().indexOf(filteredPlayers) > -1) {
        if (filteredPlayers) {
          cell.style.backgroundColor = "pink";
        } else {
          cell.style.backgroundColor = "";
        }

        flag = true;
      } else {
        cell.style.backgroundColor = "";
      }
    }

    if (flag) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }

    flag = false;
  }
}

//SORTING
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

document.querySelectorAll("th").forEach((th) =>
  th.addEventListener("click", () => {
    const table = th.closest("table");
    const tbody = table.querySelector("tbody");
    Array.from(tbody.querySelectorAll("tr"))
      .sort(
        comparer(
          Array.from(th.parentNode.children).indexOf(th),
          // this.asc=!this.asc --undefined strict mode
          (asc = !asc)
        )
      )
      .forEach((tr) => tbody.appendChild(tr));
  })
);
