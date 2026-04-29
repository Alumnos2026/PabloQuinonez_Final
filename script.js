let dataTable;
let dataTableInitialized = false;

const dataTableOptions = {
    columnDefs: [
        { className: "text-center", targets: "_all" }
    ],
    destroy: true,
    responsive: true,
    autoWidth: false
};

const initDataTable = async () => {
    if (dataTableInitialized) {
        dataTable.destroy();
    }

    // Cargar datos desde la API por defecto
    await loadApiData();

    dataTable = $("#books-table").DataTable(dataTableOptions);
    dataTableInitialized = true;
};

const loadApiData = async () => {
    try {
        const respuesta = await fetch("https://fakerapi.it/api/v1/books?_quantity=50");
        const data = await respuesta.json();
        const books = data.data;

        let content = "";
        books.forEach((book) => {
            content += `
            <tr>
                <td>${book.id}</td>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.genre}</td>
                <td>${book.published}</td>
                <td>Sí</td>
            </tr>`;
        });

        document.getElementById("books-tbody").innerHTML = content;

        // Reinicializar DataTable si ya existe
        if (dataTableInitialized) {
            dataTable.destroy();
            dataTable = $("#books-table").DataTable(dataTableOptions);
        }
    } catch (error) {
        console.error("Error al cargar los datos desde la API:", error);
        alert("Error al cargar los datos desde la API");
    }
};

window.addEventListener("load", initDataTable);