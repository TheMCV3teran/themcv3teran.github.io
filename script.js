const rulesBtn = document.getElementById("rulesBtn");
const mapBtn = document.getElementById("mapBtn");
const pdfViewer = document.getElementById("pdfViewer");
const mapContainer = document.getElementById("mapContainer");
const mapImage = document.getElementById("mapImage");

let zoom = 1;
const maxZoom = 10;
const minZoom = 1;
let offsetX = 0;
let offsetY = 0;
let isPanning = false;
let startX, startY;

// Switch between PDF and Map
rulesBtn.addEventListener("click", () => {
  pdfViewer.style.display = "block";
  mapContainer.style.display = "none";
  rulesBtn.classList.add("active");
  mapBtn.classList.remove("active");
});

mapBtn.addEventListener("click", () => {
  pdfViewer.style.display = "none";
  mapContainer.style.display = "block";
  rulesBtn.classList.remove("active");
  mapBtn.classList.add("active");
});

// Apply transform to map image
function updateTransform() {
  mapImage.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${zoom})`;
}

// Handle scroll wheel zoom
mapContainer.addEventListener("wheel", (e) => {
  e.preventDefault();

  const rect = mapContainer.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  const prevZoom = zoom;
  zoom += e.deltaY < 0 ? 1 : -1;
  zoom = Math.min(Math.max(zoom, minZoom), maxZoom);

  // adjust offsets to zoom toward cursor
  const scaleChange = zoom / prevZoom;
  offsetX = mouseX - (mouseX - offsetX) * scaleChange;
  offsetY = mouseY - (mouseY - offsetY) * scaleChange;

  constrainImage();
  updateTransform();
});

// Pan with click and drag
mapContainer.addEventListener("mousedown", (e) => {
  isPanning = true;
  startX = e.clientX - offsetX;
  startY = e.clientY - offsetY;
});

window.addEventListener("mouseup", () => (isPanning = false));

window.addEventListener("mousemove", (e) => {
  if (!isPanning) return;
  offsetX = e.clientX - startX;
  offsetY = e.clientY - startY;
  constrainImage();
  updateTransform();
});

// Keep the image within frame
function constrainImage() {
  const rect = mapContainer.getBoundingClientRect();
  const imgWidth = mapImage.naturalWidth * zoom;
  const imgHeight = mapImage.naturalHeight * zoom;

  // Keep inside frame edges
  const maxOffsetX = Math.max(rect.width - imgWidth, 0);
  const maxOffsetY = Math.max(rect.height - imgHeight, 0);

  offsetX = Math.min(Math.max(offsetX, maxOffsetX), 0);
  offsetY = Math.min(Math.max(offsetY, maxOffsetY), 0);
}

// Reset transform on load
mapImage.addEventListener("load", () => {
  zoom = 1;
  offsetX = 0;
  offsetY = 0;
  updateTransform();
});
