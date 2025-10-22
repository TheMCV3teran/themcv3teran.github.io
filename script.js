const rulesBtn = document.getElementById("rulesBtn");
const mapBtn = document.getElementById("mapBtn");
const pdfViewer = document.getElementById("pdfViewer");
const mapContainer = document.getElementById("mapContainer");
const mapImage = document.getElementById("mapImage");
const zoomControls = document.getElementById("zoomControls");
const zoomLevel = document.getElementById("zoomLevel");
const zoomInBtn = document.getElementById("zoomIn");
const zoomOutBtn = document.getElementById("zoomOut");

let zoom = 1;

// Toggle between PDF and Map
rulesBtn.addEventListener("click", () => {
  pdfViewer.style.display = "block";
  mapContainer.style.display = "none";
  zoomControls.style.display = "none";
  rulesBtn.classList.add("active");
  mapBtn.classList.remove("active");
});

mapBtn.addEventListener("click", () => {
  pdfViewer.style.display = "none";
  mapContainer.style.display = "block";
  zoomControls.style.display = "flex";
  rulesBtn.classList.remove("active");
  mapBtn.classList.add("active");
});

// Zoom logic (integer scaling)
function updateZoom() {
  mapImage.style.transform = `scale(${zoom})`;
  zoomLevel.textContent = `${zoom}x`;
}

zoomInBtn.addEventListener("click", () => {
  zoom = Math.min(zoom + 1, 10); // max 10x zoom
  updateZoom();
});

zoomOutBtn.addEventListener("click", () => {
  zoom = Math.max(zoom - 1, 1); // min 1x zoom
  updateZoom();
});

// Initial state
updateZoom();
