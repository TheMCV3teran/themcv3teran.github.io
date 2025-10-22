const rulesBtn = document.getElementById("rulesBtn");
const mapBtn = document.getElementById("mapBtn");
const pdfViewer = document.getElementById("pdfViewer");
const mapImage = document.getElementById("mapImage");

rulesBtn.addEventListener("click", () => {
  pdfViewer.style.display = "block";
  mapImage.style.display = "none";
  rulesBtn.classList.add("active");
  mapBtn.classList.remove("active");
});

mapBtn.addEventListener("click", () => {
  pdfViewer.style.display = "none";
  mapImage.style.display = "block";
  mapBtn.classList.add("active");
  rulesBtn.classList.remove("active");
});
