const { createApp } = Vue;

createApp({
  data() {
    return {
      url: "http://127.0.0.1:5000/recetas",
      recetas: [],
      error: false,
      cargando: true,
    };
  },
  created() {
    this.fetchData(this.url);
  },
  methods: {
    fetchData(url) {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          this.recetas = data;
          this.cargando = false;
        })
        .catch(err => {
          console.error(err);
          this.error = true;
        });
    },
    eliminarReceta(id) {
      if (confirm("¿Estás seguro de que quieres eliminar esta receta?")) {
        const url = this.url + "/" + id;
        var options = {
          method: 'DELETE',
        };
        fetch(url, options)
          .then(res => res.text())
          .then(res => {
            this.fetchData(this.url);
          });
      } else {
        alert("Eliminación cancelada.");
      }
    },
  }
}).mount('#app');
