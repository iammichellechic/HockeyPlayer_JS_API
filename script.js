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

var OurUrl = "https://hockeyplayers.systementor.se/{michelle@yahoo.com}/player";
const playerId = document.getElementById("playerid");

class Player {
  constructor(namn, jersey, age, born) {
    this.namn = namn;
    this.jersey = jersey;
    this.age = age;
    this.born = born;
  }
}

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
    // editName.value = player.namn;
    // editAge.value = player.age;
    // editJersey.value = player.jersey;
    // editBdate.value = player.born;

    EditPlayers();

    // sectionEditPlayers.style.display = "block";
    // sectionListPlayers.style.display = "none";
    // sectionNewPlayers.style.display = "none";
  });

  return tr;
}

//LIST RELATED

listPlayers.addEventListener("click", () => {
  //    const url =
  //      "https://hockeyplayers.systementor.se/{michellechicsarmiento@yahoo.com}/player";
  //   //fetch
  //   fetch(url)
  //     .then((data) => data.json())
  // .then((json) => {
  //   alert(JSON.stringify(json));
  // });

  // var request = new XMLHttpRequest();

  // request.open(
  //   "GET",
  //   "https://hockeyplayers.systementor.se/{michelle@yahoo.com}/player",
  //   true
  // );

  // request.onload = function () {
  //   // Begin accessing JSON data here
  //   var data = JSON.parse(this.response);

  //   if (request.status >= 200 && request.status < 400) {
  //     data.forEach((player) => {
  //       //console.log(player.age);
  //       let tr = createNewTr(player);
  //       productTableBody.appendChild(tr);
  //     });
  //   } else {
  //     console.log("error");
  //   }
  // };

  // request.send();
  playerList();

  // sectionListPlayers.style.display = "block";
  // sectionNewPlayers.style.display = "none";
  // sectionEditPlayers.style.display = "none";
});

// Get all Players to display
function playerList() {
  sectionEditPlayers.style.display = "none";
  sectionListPlayers.style.display = "block";
  sectionNewPlayers.style.display = "none";

  // Call Web API to get a list of Products
  $.ajax({
    url: OurUrl,
    type: "GET",
    dataType: "json",
    success: function (players) {
      playerListSuccess(players);
    },
    error: function (request, message, error) {
      handleException(request, message, error);
    },
  });
}

// Display list returned from Web API call
function playerListSuccess(players) {
  // Iterate over the collection of data
  $.each(players, function (index, player) {
    // Add a row to the Product table
    playerAddRow(player);
  });
}

// Add Product row to <table>
function playerAddRow(player) {
  // Append row to <table>
  productTableBody.append(createNewTr(player));
}

//NEW RELATED

newPlayers.addEventListener("click", () => {
  playerAdd();

  sectionEditPlayers.style.display = "none";
  sectionListPlayers.style.display = "none";
  sectionNewPlayers.style.display = "block";
});

function playerAdd(player) {
  // Call Web API to add a new player
  //player.id = 0; --undefined

  $.ajax({
    url: OurUrl,
    type: "POST",
    contentType: "application/json;charset=utf-8",
    data: JSON.stringify(player),
    success: function (player) {
      playerList();
    },
    error: function (request, message, error) {
      handleException(request, message, error);
    },
  });
}

submitNewButton.addEventListener("click", () => {
  createPlayerObj();

  sectionList.style.display = "block";
  sectionNew.style.display = "none";
  sectionEdit.style.display = "none";
});

function createPlayerObj() {
  let nyttNamn = newName.value;
  let nyttAge = parseInt(newAge.value);
  let nyttBdate = newBdate.value;
  let nyttJersey = parseInt(newJersey.value);

  //let playerID = playerId.value(0); --not a function

  let person = new Player(nyttNamn, nyttJersey, nyttAge, nyttBdate);
  playerAdd(person);

  // let tr = createNewTr(person);
  // productTableBody.appendChild(tr);
}

//EDIT Related

//REMOVE this
editPlayers.addEventListener("click", () => {
  sectionEditPlayers.style.display = "block";
  sectionListPlayers.style.display = "none";
  sectionNewPlayers.style.display = "none";
});

function EditPlayers(player_id) {
  sectionEditPlayers.style.display = "block";
  sectionListPlayers.style.display = "none";
  sectionNewPlayers.style.display = "none";

  // Get product id from data- attribute
  var id = $(player_id).data("id");

  // Store product id in hidden field
  //$("#productid").val(id);

  playerId.value = id;

  // Call Web API to get a player
  $.ajax({
    url: OurUrl + id,
    type: "GET",
    dataType: "json",
    success: function (player) {
      editFields(player);

      // Change Update Button Text
      // $("#updateButton").text("Update");
      //$("#action").text("Edit player");
    },
    error: function (request, message, error) {
      handleException(request, message, error);
    },
  });
}

function editFields(player) {
  editName = player.namn;
  editAge = player.age;
  editJersey = player.jersey;
  editBdate = player.born;
}

submitEditButton.addEventListener("click", () => {
  player = new Player();
  player.id = playerId.value;

  playerUpdate(player);
});

function playerUpdate(player) {
  var url = OurUrl + player.id;

  // Call Web API to update product
  $.ajax({
    url: url,
    type: "PUT",
    contentType: "application/json;charset=utf-8",
    data: JSON.stringify(player),
    success: function (player) {
      playerList();
    },
    error: function (request, message, error) {
      handleException(request, message, error);
    },
  });
}

//search fxn
//https://www.w3schools.com/howto/howto_js_filter_table.asp

function search_player() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("searchbar");
  filter = input.value.toUpperCase();
  table = document.getElementById("playersTableList");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

//sorting
//https://www.w3schools.com/howto/howto_js_sort_table.asp

function sortTable(n) {
  var table,
    rows,
    switching,
    i,
    x,
    y,
    shouldSwitch,
    dir,
    switchcount = 0;
  table = document.getElementById("playersTableList");
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < rows.length - 1; i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}
