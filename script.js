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
  const apiUrl = 'https://fakerapi.it/api/v1/books?_quantity=100';

  $('#load-api').prop('disabled', true).text('Actualizando...');

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la respuesta de la API');
      }
      return response.json();
    })
    .then(apiResponse => {
      const books = apiResponse.data.map(book => ({
        title: book.title,
        author: book.author,
        genre: book.genre,
        year: new Date(book.published).getFullYear(),
        status: 'Disponible'
      }));
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
