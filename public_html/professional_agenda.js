// Añadir el event listener al botón de inicio
document.getElementById("btnHomePage").addEventListener("click", function () {
    window.location.href = "home_page.html";
});

// Iniciar carga de citas al cargar el DOM
getAppointments();

async function getAppointments() {
    const tableBody = document.querySelector("tbody");

    try {
        const response = await fetch("http://localhost:8080/api/appointments", {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            console.error("Error al obtener las citas asignadas");
            tableBody.innerHTML = "<tr><td colspan='5'>Error al cargar las citas</td></tr>";
            return;
        }

        const appointments = await response.json();

        // Limpiar tabla antes de cargar citas
        tableBody.innerHTML = "";

        // Si no hay citas
        if (appointments.length === 0) {
            tableBody.innerHTML = "<tr><td colspan='5'>No hay citas asignadas</td></tr>";
            return;
        }

        // Agregar cada cita a la tabla
        for (const appointment of appointments) {
            const row = document.createElement("tr");

            const clientCell = document.createElement("td");
            clientCell.textContent = appointment.clientName;

            const coverageCell = document.createElement("td");
            coverageCell.textContent = appointment.coverageAreaName;

            const serviceCell = document.createElement("td");
            serviceCell.textContent = appointment.serviceName;

            const professionalCell = document.createElement("td");
            professionalCell.textContent = appointment.professionalName;

            const dateCell = document.createElement("td");
            dateCell.textContent = formatDateTime(appointment.date);

            row.appendChild(clientCell);
            row.appendChild(coverageCell);
            row.appendChild(serviceCell);
            row.appendChild(professionalCell);
            row.appendChild(dateCell);

            tableBody.appendChild(row);
        }
    } catch (error) {
        console.error("Error al cargar las citas:", error);
        tableBody.innerHTML = "<tr><td colspan='5'>Ocurrió un error al cargar las citas</td></tr>";
    }
}

// Función para formatear fecha/hora a formato legible
function formatDateTime(isoString) {
    const date = new Date(isoString);
    const options = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    };
    return date.toLocaleString("es-CO", options);
}