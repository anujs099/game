// variables
let interval = 0;
let log = [];
let selectedId = 0;
let spotAfter = 0;
var timer = 0;

//buttons
const pause = document.getElementById("pause");
const start = document.getElementById("start");
const reset = document.getElementById("reset");

const clearTableRows = () => {
  const table = document.getElementsByTagName("table")[0];
  const rows = table.getElementsByTagName("tr");
  while (rows.length > 1) {
    table.deleteRow(1);
  }
};

function resetTimer() {
  timer = 0;
  log = [];
  if (selectedId) {
    document
      .getElementById(`play-item-${selectedId}`)
      .classList.remove("selected-item");
  }
  timerInput.value = 0;
  clearTableRows();
}

function colorRandomTile(max) {
  return Math.abs(Math.ceil(Math.random() * (1 - max) + 1));
}
function addDotToRandomTile() {
  if (selectedId >= 0) {
    document
      .getElementById(`play-item-${selectedId}`)
      .classList.remove("selected-item");
  }
  selectedId = colorRandomTile(50);
  document
    .getElementById(`play-item-${selectedId}`)
    .classList.add("selected-item");
}

[pause, reset, start].forEach((item) => {
  item.addEventListener("click", function (event) {
    switch (event.target.name) {
      case "pause":
        clearInterval(interval);
        break;
      case "reset":
        clearInterval(interval);
        resetTimer();
        timer = 0;
        break;
      case "start":
        interval = setInterval(() => {
          timer++;
          addDotToRandomTile();
        }, spotAfter * 1000);
        break;
    }
  });
});

function handlePlayItemClick(event) {
  if (event.target.id.includes(selectedId)) {
    if (log.length < 5) {
      log.push(timer);
      fillTable();
    } else {
      clearInterval(interval);
      alert("Game Over");
    }
  }
}
const timerInput = document.getElementById("timer");
timerInput.addEventListener("change", (event) => {
  spotAfter = event.target.value;
});

for (let i = 0; i <= 80; i++) {
  const container = document.getElementById("play-container");
  const div = document.createElement("div");
  div.classList.add("play-item");
  div.id = `play-item-${i}`;
  container.appendChild(div);
  div.addEventListener("click", handlePlayItemClick);
}

const fillTable = () => {
  const item = log[log.length - 1];
  const index = log.length;
  const row = document.createElement("tr");
  const indexCell = document.createElement("td");
  indexCell.textContent = index;
  row.appendChild(indexCell);
  const itemCell = document.createElement("td");
  itemCell.textContent = item;
  row.appendChild(itemCell);

  document.getElementsByTagName("table")[0].appendChild(row);
};
