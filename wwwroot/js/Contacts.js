$(document).ready(function () {
    GetContacts();
});

function GetContacts() {
    $.ajax({
        url: 'Contacts/List',
        type: 'get',
        datatype: 'json',
        contentType: 'application/json;charset=utf-8',
        success: function (response) {
            if (response == null || response == undefined || response.length == 0) {
                var object = '<tr>';
                object += '<td colspan="5">' + 'No contacts found' + '</td>';
                object += '</tr>';
                $('#tableBody').html(object);
            }
            else {
                var object = '';
                $.each(response, function (index, item) {
                    object += '<tr>';
                    object += '<td>' + item.name + '</td>';
                    object += '<td>' + item.mobilePhone + '</td>';
                    object += '<td>' + item.jobTitle + '</td>';
                    object += '<td>' + item.birthDate + '</td>';
                    object += '<td> <a href="#" class="btn btn-primary btn-sm" onclick="Edit(' + item.Id + ')">Edit</a>';
                    object += '<a href="#" class="btn btn-danger btn-sm" onclick="Delete(' + item.Id + ')">Delete</a></td>';
                });
                $('#tableBody').html(object);
            }
        },
        error: function (response) {
            alert('Unable to fetch the data');
        }
    });
}