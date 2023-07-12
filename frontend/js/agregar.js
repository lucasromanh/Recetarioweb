function validarURL(url) {
  // Expresión regular para validar la URL
  var regex = /^(ftp|http|https):\/\/[^ "]+$/;
  return regex.test(url);
}

function agregarReceta() {
  let nombre = document.getElementById("nombre").value;
  let ingredientes = document.getElementById("ingredientes").value;
  let preparacion = document.getElementById("preparacion").value;
  let imagenURL = document.getElementById("imagen").value;

  if (!validarURL(imagenURL)) {
    alert("La URL de la imagen no es válida");
    return;
  }

  let tiempoPreparacion = document.getElementById("tiempo_preparacion").value;
  let tiempoCoccion = document.getElementById("tiempo_coccion").value;
  let etiquetas = document.getElementById("etiquetas").value;

  let receta = {
    nombre: nombre,
    ingredientes: ingredientes,
    preparacion: preparacion,
    imagen: imagenURL,
    tiempo_preparacion: tiempoPreparacion,
    tiempo_coccion: tiempoCoccion,
    etiquetas: etiquetas,
  };

  let url = "http://127.0.0.1:5000/recetas";
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(receta),
  };

  fetch(url, options)
  .then((response) => {
    console.log(response);
    if (response.ok) {
      console.log("Receta agregada");
      alert("Receta agregada correctamente");
      window.location.href = "./index.html";
    } else {
      throw new Error("Receta agregada correctamente");
    }
  })
  .catch((error) => {
    console.error(error);
    alert("Receta agregada correctamente");
  });
}
