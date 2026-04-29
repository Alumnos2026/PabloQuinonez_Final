const booksData = [
  { title: 'Cien años de soledad', author: 'Gabriel García Márquez', genre: 'Novela', year: 1967, status: 'Disponible' },
  { title: 'Don Quijote de la Mancha', author: 'Miguel de Cervantes', genre: 'Clásico', year: 1605, status: 'Prestado' },
  { title: 'La sombra del viento', author: 'Carlos Ruiz Zafón', genre: 'Misterio', year: 2001, status: 'Disponible' },
  { title: 'Ficciones', author: 'Jorge Luis Borges', genre: 'Cuentos', year: 1944, status: 'Disponible' },
  { title: 'El Principito', author: 'Antoine de Saint-Exupéry', genre: 'Infantil', year: 1943, status: 'Prestado' }
];

let booksTable;

function renderBooks(rows) {
  const tableBody = $('#books-table tbody');
  tableBody.empty();

  rows.forEach(book => {
    const row = `<tr>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.genre}</td>
      <td>${book.year}</td>
      <td>${book.status}</td>
    </tr>`;
    tableBody.append(row);
  });

  if ($.fn.DataTable.isDataTable('#books-table')) {
    booksTable.clear().destroy();
  }

  booksTable = $('#books-table').DataTable({
    paging: true,
    searching: true,
    info: false,
    lengthChange: false,
    language: {
      search: 'Buscar:',
      paginate: {
        previous: 'Anterior',
        next: 'Siguiente'
      },
      zeroRecords: 'No se encontraron registros'
    }
  });
}

function loadSampleBooks() {
  renderBooks(booksData);
}

function fetchBooksFromApi() {
  const apiUrl = 'https://api.example.com/biblioteca/libros';

  $('#load-api').prop('disabled', true).text('Actualizando...');

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la respuesta de la API');
      }
      return response.json();
    })
    .then(data => {
      const books = Array.isArray(data) ? data : [];
      renderBooks(books);
    })
    .catch(() => {
      alert('No se pudo cargar la API. Cargando datos de muestra.');
      loadSampleBooks();
    })
    .finally(() => {
      $('#load-api').prop('disabled', false).text('Actualizar desde API');
    });
}

$(document).ready(function () {
  loadSampleBooks();

  $('#load-sample').on('click', function () {
    loadSampleBooks();
  });

  $('#load-api').on('click', function () {
    fetchBooksFromApi();
  });
});
