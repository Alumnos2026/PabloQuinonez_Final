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
    await loadApiData();

    dataTable = $("#books-table").DataTable(dataTableOptions);
    dataTableInitialized = true;
};

const loadApiData = async () => {
    const loadingState = document.getElementById("loading-state");
    const errorState = document.getElementById("error-state");
    const emptyState = document.getElementById("empty-state");
    const tableContainer = document.getElementById("table-container");
    const booksTbody = document.getElementById("books-tbody");

    loadingState.classList.remove("d-none");
    errorState.classList.add("d-none");
    emptyState.classList.add("d-none");
    tableContainer.classList.add("d-none");

    try {
        const respuesta = await fetch("https://fakerapi.it/api/v1/books?_quantity=100");
        
        if (!respuesta.ok) {
            throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);
        }
        
        const data = await respuesta.json();
        const books = data.data;

        if (!books || books.length === 0) {
            loadingState.classList.add("d-none");
            emptyState.classList.remove("d-none");
            return;
        }

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

        booksTbody.innerHTML = content;

        loadingState.classList.add("d-none");
        tableContainer.classList.remove("d-none");

        if (dataTableInitialized) {
            dataTable.destroy();
        }
        dataTable = $("#books-table").DataTable(dataTableOptions);
        dataTableInitialized = true;

    } catch (error) {
        console.error("Error al cargar los datos desde la API:", error);
        loadingState.classList.add("d-none");
        errorState.classList.remove("d-none");
    }
};

window.addEventListener("load", initDataTable);