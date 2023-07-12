console.log(location.search); // Lee los argumentos pasados a este formulario
var args = location.search.substr(1).split('&');
// Separa el string por los "&" creando una lista
// Ejemplo: ["id=1", "nombre=Pollo al Horno", "ingredientes=Pollo, Papas", ...]
console.log(args);

var parts = [];
for (let i = 0; i < args.length; ++i) {
  parts[i] = args[i].split('=');
}
console.log(parts);

document.getElementById("nombre").value = decodeURIComponent(parts[1][1]);
document.getElementById("ingredientes").value = decodeURIComponent(parts[2][1]);
document.getElementById("preparacion").value = decodeURIComponent(parts[3][1]);
document.getElementById("imagen").value = decodeURIComponent(parts[4][1]);
document.getElementById("tiempo_preparacion").value = decodeURIComponent(parts[5][1]);
document.getElementById("tiempo_coccion").value = decodeURIComponent(parts[6][1]);
document.getElementById("etiquetas").value = decodeURIComponent(parts[7][1]);

function modificarReceta() {
  let id = decodeURIComponent(parts[0][1]);
  let nombre = document.getElementById("nombre").value;
  let ingredientes = document.getElementById("ingredientes").value;
  let preparacion = document.getElementById("preparacion").value;
  let imagenUrl = document.getElementById("imagen").value; 
  let tiempoPreparacion = document.getElementById("tiempo_preparacion").value;
  let tiempoCoccion = document.getElementById("tiempo_coccion").value;
  let etiquetas = document.getElementById("etiquetas").value;

  let recetaModificada = new FormData(); 

  recetaModificada.append("id", id);
  recetaModificada.append("nombre", nombre);
  recetaModificada.append("ingredientes", ingredientes);
  recetaModificada.append("preparacion", preparacion);
  recetaModificada.append("imagenUrl", imagenUrl); 
  recetaModificada.append("tiempo_preparacion", tiempoPreparacion);
  recetaModificada.append("tiempo_coccion", tiempoCoccion);
  recetaModificada.append("etiquetas", etiquetas);

  let url = `http://127.0.0.1:5000/recetas/${id}`;
  var options = {
    body: recetaModificada,
    method: 'PUT',
    redirect: 'follow'
  };

  fetch(url, options)
    .then(() => {
      console.log("modificado");
      alert("Registro modificado");
      window.location.href = "./index.html";
    })
    .catch(err => {
      console.error(err);
      alert("Error al modificar");
    });
}
