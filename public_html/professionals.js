//Añadir el event listener al botón inicio
document.getElementById("btnHomePage").addEventListener("click", function(){
    window.location.href = 'home_page.html';
});

//Cargar la lista de lista de profesionales
getProfessionals();

async function getProfessionals() {
    try{
        const response = await fetch("http://localhost:8080/api/professionals", {
            method: 'GET',
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
            card.className = "professional-card";

            const image = document.createElement("img");
            image.src = professionalsData.photoUrl;
            image.alt = professionalsData.name;

            const name = document.createElement("h3");
            name.textContent = professionalsData.name;

            const summary = document.createElement("p");
            summary.textContent = professionalsData.summary;

            card.appendChild(image);
            card.appendChild(name);
            card.appendChild(summary);

            card.addEventListener("click", function(){
                window.location.href = 'professional_profile.html';
            })

            container.appendChild(card);
        }

        // Si no hay profesionales, mostrar mensaje
        if (professionals.length === 0) {
            container.innerHTML = "<p>No hay profesionales disponibles por ahora.</p>";
        }
    } catch (error) {
        console.error("Error al cargar los profesionales:", error);
        const container = document.getElementById("professionalsContainer");
        container.innerHTML = "<p>Ocurrió un error al cargar los profesionales.</p>";
    }
}