let dataTable;
let dataTableInitialized = false;

const dataTableOptions = {
  columnDefs: [{ className: "text-center", targets: "_all" }],
  destroy: true,
  responsive: true,
  autoWidth: false,
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
    const respuesta = await fetch(
      "https://fakerapi.it/api/v1/books?_quantity=100",
    );

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

//============================================================
// DEMOSTRACIÓN DE DOM - Crear elementos y modificar contenido
//============================================================

let contadorElementos = 0;
const btnCrear = document.getElementById("btn-crear-elemento");
const listaElementos = document.getElementById("lista-elementos");
const btnModificar = document.getElementById("btn-modificar");
const elementoModificar = document.getElementById("elemento-a-modificar");

const crearYAgregarElemento = () => {
  contadorElementos++;
  const nuevoElemento = document.createElement("div");
  nuevoElemento.className = "alert alert-success d-flex justify-content-between align-items-center mb-2";
  nuevoElemento.innerHTML = `
    <span><i class="bi bi-check-circle-fill"></i> Elemento creado #${contadorElementos} - ¡Agregado con <code>createElement</code> y <code>appendChild</code>!</span>
    <small class="text-muted">${new Date().toLocaleTimeString()}</small>
  `;
  const mensajeInicial = listaElementos.querySelector("small");
  if (mensajeInicial) {
    listaElementos.removeChild(mensajeInicial);
  }
  listaElementos.appendChild(nuevoElemento);
};

const modificarContenido = () => {
  const tiempoActual = new Date().toLocaleString();
  elementoModificar.innerHTML = `
    <strong>Contenido modificado:</strong>
    <span class="d-block mt-2">
      <i class="bi bi-check2-circle"></i> Texto actualizado usando <code>textContent</code> e <code>innerHTML</code>
    </span>
    <small class="text-muted d-block mt-2">Modificado a las: ${tiempoActual}</small>
  `;
};

btnCrear.addEventListener("click", crearYAgregarElemento);
btnModificar.addEventListener("click", modificarContenido);
