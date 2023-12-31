$(document).ready(function () {
    GetContacts();
});

$('#buttonAddContact').click(function () {
    $('#contactFormTitle').text('Add Contact');
    $('#addContact').css('display', 'block');
    $('#updateContact').css('display', 'none');
    $('#contactPopupForm').modal('show');
})

function GetContacts() {
    $('#contactsTableSpinner').css('display', 'block');
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
                    object += '<td> <a href="#" class="btn btn-outline-primary btn-sm ms-1" onclick="FetchContact(' + "'" + item.id + "'" +')">Edit</a>';
                    object += '<a href="#" class="btn btn-outline-danger btn-sm ms-1" onclick="DeleteContact(' + "'" + item.id + "'" + ')">Delete</a></td>';
                });
                $('#contactsTableSpinner').css('display', 'none');
                $('#tableBody').html(object);
            }
        },
        error: function (response) {
            alert('Unable to fetch the data');
        }
    });
}

function AddContact() {
    if (!ValidateContact()) {
        return;
    }

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
                ShowErrorAlert('Unable to add Contact');
            }
            else {
                HidePopupForm();
                ShowSuccessAlert("Successfully Added");
                GetContacts();
            }
        },
        error: function () {
            ShowErrorAlert('Unable to add Contact');
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
                ShowErrorAlert('Unable to load Contact info');
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
            ShowErrorAlert('Unable to load Contact info');
        }
    });
}

function UpdateContact() {
    if (!ValidateContact()) {
        return;
    }

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
                ShowErrorAlert('Unable to update Contact');
            }
            else {
                HidePopupForm();
                ShowSuccessAlert("Successfully Updated");
                GetContacts();
            }
        },
        error: function () {
            ShowErrorAlert('Unable to update Contact');
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
                    ShowErrorAlert('Unable to delete record');
                }
                else {
                    ShowSuccessAlert("Successfully Deleted");
                    GetContacts();
                }
            },
            error: function () {
                ShowErrorAlert('Unable to delete record');
            }
        });
    }
}

function ValidateContact() {
    let name = document.getElementById('inputName');
    let mobilePhone = document.getElementById('inputMobilePhone');
    let jobTitle = document.getElementById('inputJobTitle');
    let birthDate = document.getElementById('inputBirthDate');
    let nameError = document.getElementById('inputName-error');
    let mobilePhoneError = document.getElementById('inputMobilePhone-error');
    let jobTitleError = document.getElementById('inputJobTitle-error');
    let birthDateError = document.getElementById('inputBirthDate-error');
    const phoneRegExp = /^[\+]?[0-9]{0,3}[-\s\.]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    let today = new Date();
    let approved = true;

    if (name.value == '') {
        nameError.innerText = "Name shouldn't be empty";
        approved = false;
    }
    else if (name.value.length > 40) {
        nameError.innerText = "Name shouldn't be longer than 40 symbols";
        approved = false;
    }
    else {
        nameError.innerText = '';
    }

    if (mobilePhone.value == '') {
        mobilePhoneError.innerText = "Mobile Phone shouldn't be empty";
        approved = false;
    }
    else if (mobilePhone.value.length > 15) {
        mobilePhoneError.innerText = "Mobile Phone shouldn't be longer than 15 symbols";
        approved = false;
    }
    else if (!phoneRegExp.test(mobilePhone.value)) {
        mobilePhoneError.innerText = "Mobile Phone is not in valid format";
        approved = false;
    }
    else {
        mobilePhoneError.innerText = '';
    }
    
    if (jobTitle.value == '') {
        jobTitleError.innerText = "Job Title shouldn't be empty";
        approved = false;
    }
    else if (jobTitle.value.length > 50) {
        jobTitleError.innerText = "Job Title shouldn't be longer than 50 symbols";
        approved = false;
    }
    else {
        jobTitleError.innerText = '';
    }

    if (birthDate.value == '') {
        birthDateError.innerText = "Birth Date shouldn't be empty";
        approved = false;
    }
    else if (birthDate.value < '1900-01-01' || birthDate.value > today.toISOString().slice(0,10)) {
        birthDateError.innerText = "Birth Date should be in range between 01.01.1900 and today";
        approved = false;
    }
    else {
        birthDateError.innerText = '';
    }

    return approved;
}

function HidePopupForm() {
    $('#contactPopupForm').modal('hide');
    ClearValidationWarnings();
    ClearForm();
}

function ClearForm() {
    $('#inputName').val('');
    $('#inputMobilePhone').val('');
    $('#inputJobTitle').val('');
    $('#inputBirthDate').val('');
}

function ClearValidationWarnings() {
    $('#inputName-error').text('');
    $('#inputMobilePhone-error').text('');
    $('#inputJobTitle-error').text('');
    $('#inputBirthDate-error').text('');
}

function FormatDate(dateStr) {
    return dateStr.slice(0, 10).split("-").reverse().join('.');
}

function ShowErrorAlert(message) {
    $('#errorAlertText').text(message);
    $('#errorAlert').show('fade');
    setTimeout(function () {
        $('#errorAlert').hide(400);
    }, 3000);
    $('#errorAlertClose').click(function () {
        $('#errorAlert').hide(400);
    });
}

function ShowSuccessAlert(message) {
    $('#successAlertText').text(message);
    $('#successAlert').show(200);
    setTimeout(function () {
        $('#successAlert').hide(200);
    }, 2000);
}