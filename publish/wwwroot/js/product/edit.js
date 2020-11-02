let productDialog;
let isUnique;

function editProduct(url) {
    var formDiv = $('<div/>');
    $.get(url)
        .done(function (response) {
            formDiv.html(response);
            productDialog = formDiv.dialog({
                autoOpen: true,
                resizeable: false,
                width: 600,
                height: 400,
                modal: true,
                title: 'Edit product type',
                close: function () {
                    productDialog.dialog('destroy').remove();
                }
            });

            $("#closeDialogBtn").click(function () {
                productDialog.dialog('destroy').remove();
            });
        });
}

function submitProduct(form) {
    $.validator.unobtrusive.parse(form);
    var data = $(form).serializeJSON();
    data = JSON.stringify(data);

    if ($(form).valid()) {
        $.ajax({
            type: "POST",
            url: "https://localhost:44313/api/products",
            contentType: "application/json; charset=utf-8",
            data: data,
            success: function (data) {
                if (data.success) {
                    productDialog.dialog('close');
                    toastr.success(data.message);
                    products.ajax.reload();
                }
                else {
                    toastr.error(data.message);
                }
            }
        }).fail(function (data) {
            console.log(data);
        });
    }

    else
        console.log("Cannot post data!");

    return false;
}


function deleteProduct(url) {
    swal({
        title: "Continue?",
        text: "Surely sure to delete?",
        icon: "warning",
        buttons: true,
        dangerMode: true
    }).then((willDelete) => {
        if (willDelete) {
            $.ajax({
                type: "DELETE",
                url: url,
                success: function (data) {
                    if (data.success) {
                        toastr.success(data.message);
                        products.ajax.reload();
                    }
                    else {
                        toastr.error(data.message);
                    }
                }
            });
        }
    });
}
