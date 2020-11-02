let products;

$(document).ready(() => {
    loadProducts();

    $('#editProductBtn').click(function () {
        editProduct("/Product/Edit");
    });
});

function loadProducts() {
    products = $('#products')
        .DataTable({
            "ajax": {
                "url": "https://localhost:44313/api/products",
                "type": "get",
                "datatype": "json"
            },
            "columns": [
                { "data": "title", "width": "15%" },
                { "data": "identifier", "width": "15%" },
                { "data": "description", "width": "50%" },
                {
                    "data": "id",
                    "render": function (id) {
                        return `<div class="row">
                                    <a  class='btn btn-success text-white'
                                        onclick="editProduct('/Product/Edit/${id}')"
                                        style='cursor:pointer;'>
                                        <i class="fa fa-edit"></i> Edit
                                    </a>
                                    &nbsp;
                                    <a  class='btn btn-danger text-white'
                                        onclick="deleteProduct('https://localhost:44313/api/products?id=${id}')"
                                        style='cursor:pointer;'>
                                        <i class="fa fa-trash"></i> Delete
                                    </a>
                                </div>`
                    },
                    "width": "20%"
                }
            ]
        });
}