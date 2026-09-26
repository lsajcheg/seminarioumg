// BD simulada
const categorias = [
  "Todas", "Desarrollo Web", "Diseño Web", "Bases de Datos",
  "Arquitectura", "Seguridad", "Programación",
  "DevOps"
];

const videos = [
  {
    id: 1,
    titulo: "Video 1 – Introducción",
    categoria: "Desarrollo Web",
    duracion: "00:10",
    descripcion: "Video educativo desde YouTube.",
    poster: "https://i.ytimg.com/vi/8GTaO9XhA5M/hqdefault.jpg",
    url: "https://www.youtube.com/embed/8GTaO9XhA5M"
  },
  {
    id: 2,
    titulo: "Video 2 – Tutorial",
    categoria: "Programación",
    duracion: "00:15",
    descripcion: "Segundo video educativo desde YouTube.",
    poster: "https://i.ytimg.com/vi/-ut593BSlCk/hqdefault.jpg",
    url: "https://www.youtube.com/embed/-ut593BSlCk"
  },
  {
    id: 3,
    titulo: "Video 3 – Explicación",
    categoria: "Bases de Datos",
    duracion: "00:20",
    descripcion: "Tercer video educativo desde YouTube.",
    poster: "https://i.ytimg.com/vi/6S8A-1jBD5Y/hqdefault.jpg",
    url: "https://www.youtube.com/embed/6S8A-1jBD5Y"
  }
];


let usuarioActual = null;

// Render categorías
const categoryList = document.getElementById("categoryList");
categorias.forEach(cat => {
  const div = document.createElement("div");
  div.className = "category";
  div.textContent = cat;
  div.onclick = () => seleccionarCategoria(cat);
  categoryList.appendChild(div);
});

let categoriaSeleccionada = "Todas";

// Render videos
function renderVideos() {
  const grid = document.getElementById("videoGrid");
  const term = document.getElementById("search").value.toLowerCase();

  grid.innerHTML = "";

  videos
    .filter(v => categoriaSeleccionada === "Todas" || v.categoria === categoriaSeleccionada)
    .filter(v => v.titulo.toLowerCase().includes(term))
    .forEach(v => {
      grid.innerHTML += `
        <div class="card">
          <img src="${v.poster}" onclick="abrirVideo(${v.id})">
          <h3>${v.titulo}</h3>
          <p><strong>${v.categoria}</strong> • ${v.duracion}</p>
          <p>${v.descripcion}</p>
        </div>
      `;
    });
}

function seleccionarCategoria(cat) {
  categoriaSeleccionada = cat;
  document.querySelectorAll(".category").forEach(c => c.classList.remove("active"));
  [...categoryList.children].find(c => c.textContent === cat).classList.add("active");
  renderVideos();
}

document.getElementById("search").addEventListener("input", renderVideos);

// Modal video
function abrirVideo(id) {
  const video = videos.find(v => v.id === id);
  document.getElementById("modalTitle").textContent = video.titulo;
  document.getElementById("modalPlayer").src = video.url;
  document.getElementById("modalVideo").style.display = "flex";
}

document.getElementById("closeVideo").onclick = () => {
  document.getElementById("modalVideo").style.display = "none";
  document.getElementById("modalPlayer").pause();
};

// Login modal
document.getElementById("btnLoginOpen").onclick = () =>
  document.getElementById("modalLogin").style.display = "flex";

document.getElementById("closeLogin").onclick = () =>
  document.getElementById("modalLogin").style.display = "none";

// Registro modal
document.getElementById("btnRegisterOpen").onclick = () =>
  document.getElementById("modalRegister").style.display = "flex";

document.getElementById("closeRegister").onclick = () =>
  document.getElementById("modalRegister").style.display = "none";

// Inicial
renderVideos();

