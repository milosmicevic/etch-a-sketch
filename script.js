const board = document.querySelector(".board");
const boardColor = "#eee";
const colorPicker = document.querySelector(".color-picker");
const drawButton = document.querySelector(".draw-button");
const eraserButton = document.querySelector(".eraser-button");
const clearAllButton = document.querySelector(".clear-button");
const sliderLabel = document.querySelector(".slider-label");

let slider = document.querySelector(".slider");
let selectedColor = "#4c5c68";
let lastUsedColor;
let gridSize = 16;

function createGrid(size) {
  for (let i = 1; i <= size * size; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.style.width = `calc(100% / ${size})`;
    cell.style.height = `calc(100% / ${size})`;
    cell.style.border = "1px solid #e2e2e2";

    board.appendChild(cell);
  }
}

function reloadGrid(size) {
  board.innerHTML = "";
  createGrid(size);
}

function changeGridSize(size) {
  gridSize = size;
  reloadGrid(gridSize);
  draw();
}

function selectColor(event) {
  selectedColor = event.target.value;
  draw();
}

function draw() {
  const cells = document.querySelectorAll(".cell");
  if (selectedColor !== boardColor) {
    cells.forEach((cell) => {
      cell.addEventListener("mouseover", () => {
        cell.style.backgroundColor = selectedColor;
      });
    });
  } else {
    cells.forEach((cell) => {
      cell.addEventListener("mouseover", () => {
        cell.style.backgroundColor = lastUsedColor;
      });
    });
  }

  clearActiveClasses();
  drawButton.classList.add("active");
}

function erase() {
  lastUsedColor = selectedColor;
  selectedColor = boardColor;

  clearActiveClasses();
  eraserButton.classList.add("active");
}

function clearAll() {
  const cells = document.querySelectorAll(".cell");

  cells.forEach((cell) => {
    cell.style.backgroundColor = boardColor;
  });
}

function updateSliderLabel() {
  sliderLabel.innerText = `${slider.value} x ${slider.value}`;
}

function clearActiveClasses() {
  drawButton.classList.remove("active");
  eraserButton.classList.remove("active");
}

colorPicker.addEventListener("change", (e) => selectColor(e));
drawButton.addEventListener("click", draw);
eraserButton.addEventListener("click", erase);
clearAllButton.addEventListener("click", clearAll);
slider.addEventListener("mousemove", (e) => updateSliderLabel(e.target.value));
slider.addEventListener("change", (e) => changeGridSize(e.target.value));

window.onload = () => {
  createGrid(gridSize);
  colorPicker.value = "#4c5c68";
};
