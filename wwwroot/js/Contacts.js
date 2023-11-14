$(document).ready(function () {
    GetContacts();
});

$('#buttonAddContact').click(function () {
    $('#contactPopupForm').modal('show');
    $('#contactFormTitle').text('Add Contact');
    $('#addContact').css('display', 'block');
    $('#updateContact').css('display', 'none');
})

function GetContacts() {
    $.ajax({
        url: 'Contacts/List',
        type: 'get',
        datatype: 'json',
        contentType: 'application/json;charset=utf-8',
        success: function (response) {
            if (response == null || response == undefined || response.length == 0) {
                let object = '<tr>';
                object += '<td colspan="5">' + 'Products not available' + '</td>';
                object += '</tr>';
                $('#tableBody').html(object);
            }
            else {
                let object = '';
                $.each(response, function (index, item) {
                    object += '<tr>';
                    object += '<td>' + item.name + '</td>';
                    object += '<td>' + item.mobilePhone + '</td>';
                    object += '<td>' + item.jobTitle + '</td>';
                    object += '<td>' + FormatDate(item.birthDate) + '</td>';
                    object += '<td> <a href="#" class="btn btn-primary btn-sm ms-1" onclick="FetchContact(' + "'" + item.id + "'" +')">Edit</a>';
                    object += '<a href="#" class="btn btn-danger btn-sm ms-1" onclick="DeleteContact(' + "'" + item.id + "'" + ')">Delete</a></td>';
                });
                $('#tableBody').html(object);
            }
        },
        error: function (response) {
            alert('Unable to fetch the data');
        }
    });
}

function AddContact() {
    let model = new Object();
    model.name = $('#inputName').val();
    model.mobilePhone = $('#inputMobilePhone').val();
    model.jobTitle = $('#inputJobTitle').val();
    model.birthDate = $('#inputBirthDate').val();

    $.ajax({
        url: 'Contacts/Add',
        data: model,
        type: 'post',
        success: function (response) {
            if (response == null || response == undefined || response.length == 0) {
                alert('Unable to add Contact');
            }
            else {
                GetContacts();
                alert("Done!");
            }
        },
        error: function () {
            alert('Unable to add Contact');
        }
    });
}

function FetchContact(id) {

    $.ajax({
        url: 'Contacts/GetById?id=' + id,
        type: 'get',
        datatype: 'json',
        contentType: 'application/json;charset=utf-8',
        success: function (response) {
            if (response == null || response == undefined || response.length == 0) {
                alert('Unable to load Contact info');
            }
            else {
                $('#contactPopupForm').modal('show');
                $('#contactFormTitle').text('Update Contact');
                $('#addContact').css('display', 'none');
                $('#updateContact').css('display', 'block');
                $('#inputId').val(response.id);
                $('#inputName').val(response.name);
                $('#inputMobilePhone').val(response.mobilePhone);
                $('#inputJobTitle').val(response.jobTitle);
                $('#inputBirthDate').val(response.birthDate.slice(0, 10));
            }
        },
        error: function () {
            alert('Unable to load Contact info');
        }
    });
}

function UpdateContact() {
    let model = new Object();
    model.id = $('#inputId').val();
    model.name = $('#inputName').val();
    model.mobilePhone = $('#inputMobilePhone').val();
    model.jobTitle = $('#inputJobTitle').val();
    model.birthDate = $('#inputBirthDate').val();

    $.ajax({
        url: 'Contacts/Update',
        data: model,
        type: 'post',
        success: function (response) {
            if (response == null || response == undefined || response.length == 0) {
                alert('Unable to update Contact');
            }
            else {
                GetContacts();
            }
        },
        error: function () {
            alert('Unable to update Contact');
        }
    });
}

function DeleteContact(id) {
    if (confirm('Are you sure to delete it?')) {
        $.ajax({
            url: 'Contacts/Delete?id=' + id,
            type: 'post',
            success: function (response) {
                if (response == null || response == undefined || response.length == 0) {
                    alert('Unable to save');
                }
                else {
                    GetContacts();
                }
            },
            error: function () {
                alert('Unable to save');
            }
        });
    }
}

function HidePopup() {
    $('#contactPopupForm').modal('hide');
}

function ClearForm() {
    $('#inputName').val('');
    $('#inputMobilePhone').val('');
    $('#inputJobTitle').val('');
    $('#inputBirthDate').val('');
}

function FormatDate(dateStr) {
    return dateStr.slice(0, 10).split("-").reverse().join('.');
}