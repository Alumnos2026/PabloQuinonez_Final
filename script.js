let dataTable;
let dataTableInitialized = false;

const dataTableOptions = {
    columnDefs: [
        { orderable: false, targets: [7, 8] },
        
        { className: "text-center", targets: "_all" } 
    ],
    pageLength: 3,
    destroy: true,
    responsive: true,
    autoWidth: false
};
const initDataTable = async () => {
    if (dataTableInitialized) {
        dataTable.destroy();
    }

    await listaUsuarios();

    dataTable = $("#datatable_users").DataTable(dataTableOptions);
    dataTableInitialized = true;
};

const listaUsuarios = async () => {
    try {
        const respuesta = await fetch("https://jsonplaceholder.typicode.com/users");
        const users = await respuesta.json();

        let content = "";
        users.forEach((user, index) => { 
            content += `
            <tr>
                <td>${index + 1}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.address.city}</td>
                <td>${user.company.name}</td>
                <td>${user.phone}</td>
                <td>${user.website}</td>
                <td>${user.address.zipcode}</td>
                <td class="text-center">
                <i class="fa-solid fa-check" style="color: green;"></i>
                </td>
                <td>
                    <button class="btn btn-sm btn-primary"><i class="fa-solid fa-pencil"></i></button>
                    <button class="btn btn-sm btn-danger"><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>`;
        });

        document.getElementById("tableBody_users").innerHTML = content;
        
    } catch (error) {
        console.error(error);
        alert("Error al cargar los usuarios");
    }
};

window.addEventListener("load", initDataTable);