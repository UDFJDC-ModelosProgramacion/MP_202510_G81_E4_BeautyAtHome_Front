//Añadir el event listener al botón inicio
document.getElementById("btnHomePage").addEventListener("click", function(){
    window.location.href = 'home_page.html';
});

//Cargar la lista de lista de profesionales
getProfessionals();

async function getProfessionals() {
    try{
        const response = await fetch("http://localhost:8080/professionals", {
            mehtod: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if(!response.ok){
            console.error("Error al obtener a los profesionales disponibles");
            return;
        }

        const professionals = await response.json();
        const container = document.getElementById("professionalsContainer");
        //Limpiar el contenedor antes de cargar los profesionales
        container.innerHTML = "";

        for(const professionalsData of professionals){
            const card = document.createElement("div");
            card.className = "professionalCard";

            const image = document.createElement("img");
            image.src = professionalsData.imagenUrl || "https://via.placeholder.com/300x200?text=Sin+Imagen";
            image.alt = professionalsData.nombre;

            const name = document.createElement("h3");
            name.textContent = professionalsData.nombre;

            const description = document.createElement("p");
            description.textContent = professionalsData.description;

            card.appendChild(image);
            card.appendChild(name);
            card.appendChild(description);

            contenedor.appendChild(card);
        }

        // Si no hay profesionales, mostrar mensaje
        if (profesionales.length === 0) {
            contenedor.innerHTML = "<p>No hay profesionales disponibles por ahora.</p>";
        }
    } catch (error) {
        console.error("Error al cargar los profesionales:", error);
        const contenedor = document.getElementById("profesionales-container");
        contenedor.innerHTML = "<p>Ocurrió un error al cargar los profesionales.</p>";
    }
}