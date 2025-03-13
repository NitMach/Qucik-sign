const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const colorPicker = document.getElementById("colorPicker");
const canvasColor = document.getElementById("canvasColor");
const fontSize = document.getElementById("fontSize");
const clearButton = document.getElementById("clearButton");
const saveButton = document.getElementById("saveButton");
const retrieveButton = document.getElementById("retriveButton");

let isDrawing = false;
let lastX = 0;
let lastY = 0;

colorPicker.addEventListener("change", (e) => {
  ctx.strokeStyle = e.target.value;
});

canvasColor.addEventListener("change", (e) => {
  canvas.style.backgroundColor = e.target.value;
});

fontSize.addEventListener("change", (e) => {
  ctx.lineWidth = e.target.value;
});

canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mousemove", (e) => {
  if (!isDrawing) return;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));

clearButton.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  localStorage.removeItem("signature");
});

saveButton.addEventListener("click", () => {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "signature.png";
  link.click();
  localStorage.setItem("signature", image);
});

retrieveButton.addEventListener("click", () => {
  const savedImage = localStorage.getItem("signature");
  if (savedImage) {
    const img = new Image();
    img.src = savedImage;
    img.onload = () => ctx.drawImage(img, 0, 0);
  } else {
    alert("No saved signature found!");
  }
});
