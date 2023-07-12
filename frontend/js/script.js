const form = document.querySelector("form");
const mensaje = document.getElementById("mensaje");

form.addEventListener("submit", (event) => {
    event.preventDefault(); 

    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const email = document.getElementById("email").value;

    if (nombre === "Nombre existente" || apellido === "Apellido existente" || email === "Email existente") {
        mensaje.textContent = "El nombre, apellido o correo electrónico ya están siendo utilizados.";
    } else {
        form.submit();
    }
});


const provincias = [
    "Buenos Aires",
    "CABA",
    "Catamarca",
    "Chaco",
    "Chubut",
    "Córdoba",
    "Corrientes",
    "Entre Ríos",
    "Formosa",
    "Jujuy",
    "La Pampa",
    "La Rioja",
    "Mendoza",
    "Misiones",
    "Neuquén",
    "Río Negro",
    "Salta",
    "San Juan",
    "San Luis",
    "Santa Cruz",
    "Santa Fe",
    "Santiago del Estero",
    "Tierra del Fuego",
    "Tucumán"
];

const ciudades = { 
    "Buenos Aires": ["La Plata", "Mar del Plata", "Bahía Blanca", "Tandil", "Quilmes", "Lomas de Zamora", "San Isidro"],
    "CABA": ["CABA", "Belgrano", "Palermo", "Recoleta", "San Telmo", "Caballito", "Villa Devoto"],
    "Catamarca": ["San Fernando del Valle de Catamarca", "San José", "Santa Rosa", "Andalgalá", "Belén", "Fiambalá", "Santa María"],
    "Chaco": ["Resistencia", "Barranqueras", "Fontana", "Presidencia Roque Sáenz Peña", "General José de San Martín", "Villa Ángela", "Charata"],
    "Chubut": ["Rawson", "Comodoro Rivadavia", "Trelew", "Puerto Madryn", "Esquel", "Gaiman", "Sarmiento"],
    "Córdoba": ["Córdoba", "Villa Carlos Paz", "Río Cuarto", "Alta Gracia", "Jesús María", "Villa María", "La Falda"],
    "Corrientes": ["Corrientes", "Goya", "Mercedes", "Curuzú Cuatiá", "Esquina", "Santo Tomé", "Paso de los Libres"],
    "Entre Ríos": ["Paraná", "Concordia", "Gualeguaychú", "La Paz", "Colón", "Victoria", "Diamante"],
    "Formosa": ["Formosa", "Clorinda", "Pirané", "Las Lomitas", "El Colorado", "Ingeniero Juárez", "Ibarreta"],
    "Jujuy": ["San Salvador de Jujuy", "San Pedro", "Palpalá", "Libertador General San Martín", "Perico", "La Quiaca", "Humahuaca"],
    "La Pampa": ["Santa Rosa", "General Pico", "Toay", "Realicó", "General Acha", "Victorica", "Macachín"],
    "La Rioja": ["La Rioja", "Chilecito", "Famatina", "Aimogasta", "Chamical", "Villa Unión", "Chepes"],
    "Mendoza": ["Mendoza", "San Rafael", "Godoy Cruz", "Las Heras", "Maipú", "Luján de Cuyo", "Guaymallén"],
    "Misiones": ["Posadas", "Eldorado", "Puerto Iguazú", "Oberá", "Apostoles", "San Vicente", "Leandro N. Alem"],
    "Neuquén": ["Neuquén", "Cutral Có", "Plottier", "Zapala", "Centenario", "San Martín de los Andes", "Villa La Angostura"],
    "Río Negro": ["Viedma", "San Carlos de Bariloche", "General Roca", "Cipolletti", "Cinco Saltos", "Allen", "El Bolsón"],
    "Salta": ["Salta", "San Ramón de la Nueva Orán", "Tartagal", "Cafayate", "General Güemes", "Rosario de Lerma", "Metán"],
    "San Juan": ["San Juan", "Rivadavia", "Santa Lucía", "Chimbas", "Rawson", "Pocito", "Caucete"],
    "San Luis": ["San Luis", "Villa Mercedes", "Merlo", "La Punta", "Justo Daract", "Naschel", "Santa Rosa del Conlara"],
    "Santa Cruz": ["Río Gallegos", "Caleta Olivia", "El Calafate", "Pico Truncado", "Puerto Deseado", "Las Heras", "Perito Moreno"],
    "Santa Fe": ["Santa Fe", "Rosario", "Venado Tuerto", "Rafaela", "San Lorenzo", "Santo Tomé", "Reconquista"],
    "Santiago del Estero": ["Santiago del Estero", "La Banda", "Termas de Río Hondo", "Fernández", "Frías", "Loreto", "Añatuya"],
    "Tierra del Fuego": ["Ushuaia", "Río Grande", "Tolhuin", "Puerto Almanza", "San Sebastián", "Puerto Williams", "Estancia San Pablo"],
    "Tucumán": ["San Miguel de Tucumán", "Yerba Buena", "Concepción", "Banda del Río Salí", "Tafí Viejo", "Aguilares", "Monteros"]
};


const provinciaSelect = document.getElementById("provincia");
const ciudadSelect = document.getElementById("ciudad");

provincias.forEach((provincia) => {
    const option = document.createElement("option");
    option.value = provincia;
    option.textContent = provincia;
    provinciaSelect.appendChild(option);
});


provinciaSelect.addEventListener("change", () => {
    const selectedProvince = provinciaSelect.value;
    const cities = ciudades[selectedProvince] || [];

    ciudadSelect.innerHTML = ""; 

    cities.forEach((ciudad) => {
        const option = document.createElement("option");
        option.value = ciudad;
        option.textContent = ciudad;
        ciudadSelect.appendChild(option);
    });
});