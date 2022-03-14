const sectionListPlayers = document.getElementById("sectionListPlayers");
const sectionNewPlayers = document.getElementById("sectionNewPlayers");
const sectionEditPlayers = document.getElementById("sectionEditPlayers");

export function showSection(sectionsId) {
  if (sectionsId == "sectionListPlayers") {
    sectionListPlayers.style.display = "block";
    sectionNewPlayers.style.display = "none";
    sectionEditPlayers.style.display = "none";
  } else if (sectionsId == "sectionNewPlayers") {
    sectionListPlayers.style.display = "none";
    sectionNewPlayers.style.display = "block";
    sectionEditPlayers.style.display = "none";
  } else if (sectionsId == "sectionEditPlayers") {
    sectionListPlayers.style.display = "none";
    sectionNewPlayers.style.display = "none";
    sectionEditPlayers.style.display = "block";
  }
}
