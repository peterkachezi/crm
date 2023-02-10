﻿
$(document).ready(function () {

   

});

function GetAllData() {

    var t = $('#tblUsers').DataTable({
        "ajax": {
            "url": "/SuperAdmin/UserManager/GetUsers",
            "type": "GET",
            "datatype": "json"
        },

        "columns": [

            { "data": "id" },
            { "data": "fullName" },
            { "data": "phoneNumber" },
            { "data": "email" },
            { "data": "roleName" },
            { "data": "newCreateDate" },
            { "data": "createdByName" },
            { "data": "status" },

            {
                data: null,
                mRender: function (row) {
                    return "<a href='#' class='btn-sm success' onclick=GetUser('" + row.id + "'); >Edit</a> / <a href='#' class='btn-sm danger' onclick=DeleteRecord('" + row.id + "'); > Delete</a > ";

                }
            }

        ]

    });
    t.on('order.dt search.dt', function () {
        t.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1;
        });
    }).draw();
}

function ShowLoader() {

    $("#loadMe").modal('show');
}

function HideLoader() {

    $("#loadMe").modal('hide');
}

$("#btnCreateAccount").click(function () {



    if ($('#txtFirstName').val() == '') {
        $('#txtFirstName').focus();
        swal({
            position: 'top-end',
            type: "error",
            title: "first name is a required field",
            showConfirmButton: true,
        });
        return false;
    }

    if ($('#txtLastName').val() == '') {
        $('#txtLastName').focus();
        swal({
            position: 'top-end',
            type: "error",
            title: "last name is a required field",
            showConfirmButton: true,
        });
        return false;
    }

    if ($('#txtPhoneNumber').val() == '') {
        $('#txtPhoneNumber').focus();
        swal({
            position: 'top-end',
            type: "error",
            title: "phone number is a required field",
            showConfirmButton: true,
        });
        return false;
    }

    if ($('#txtEmail').val() == '') {
        $('#txtEmail').focus();
        swal({
            position: 'top-end',
            type: "error",
            title: "Email is a required field",
            showConfirmButton: true,
        });
        return false;
    }


    $("#divLoader").show();

    $("#modalRegisterUser").modal('hide');

    var data = $("#frmRegisterUser").serialize();

    $.ajax({

        type: "POST",

        url: "/SuperAdmin/UserManager/RegisterUser/",

        data: data,      
        success: function (response) {

            if (response.success) {
                swal({
                    position: 'top-end',
                    type: "success",
                    title: response.responseText,
                    showConfirmButton: false,
                }), setTimeout(function () { location.reload(); }, 3000);

            } else {
                swal({
                    position: 'top-end',
                    type: "error",
                    title: response.responseText,
                    showConfirmButton: true,
                    timer: 5000,
                });
            }
        },

        error: function (response) {
            alert("error!");
        }
        
    })

})

$("#btnUpdateAccount").click(function () {

    if ($('#txtfirstName1').val() == '') {
        $('#txtfirstName1').focus();
        swal({
            position: 'top-end',
            type: "error",
            title: "first name is a required field",
            showConfirmButton: true,
        });
        return false;
    }

    if ($('#txtlastName1').val() == '') {
        $('#txtlastName1').focus();
        swal({
            position: 'top-end',
            type: "error",
            title: "last name is a required field",
            showConfirmButton: true,
        });
        return false;
    }


    if ($('#txtPhoneNumber1').val() == '') {
        $('#txtPhoneNumber1').focus();
        swal({
            position: 'top-end',
            type: "error",
            title: "phone number is a required field",
            showConfirmButton: true,
        });
        return false;
    }


    if ($('#txtEmail1').val() == '') {
        $('#txtEmail1').focus();
        swal({
            position: 'top-end',
            type: "error",
            title: "Email is a required field",
            showConfirmButton: true,
        });
        return false;
    }

    if ($('#txtRoleName1').val() == '') {
        $('#txtRoleName1').focus();
        swal({
            position: 'top-end',
            type: "error",
            title: "Role Name is a required field",
            showConfirmButton: true,
        });
        return false;
    }

    $("#modalUpdateUser").modal('hide');

    var data = $("#frmUpdateAccount").serialize();

    $.ajax({

        type: "POST",

        url: "/SuperAdmin/UserManager/Update/",

        data: data,

        beforeSend: function () { ShowLoader(); },

        success: function (response) {

            if (response.success) {
                swal({
                    position: 'top-end',
                    type: "success",
                    title: response.responseText,
                    showConfirmButton: false,
                }), setTimeout(function () { location.reload(); }, 3000);

            } else {
                swal({
                    position: 'top-end',
                    type: "error",
                    title: response.responseText,
                    showConfirmButton: true,
                    timer: 5000,
                });
            }
        },

        error: function (response) {
            alert("error!");
        },
        complete: function () {
            HideLoader();
        }
    })

})

function GetUser(e) {

    var id = e;

    console.log(id);

    $.get("/SuperAdmin/UserManager/GetUserById/?Id=" + id, function (data, status) {
        console.log(data);
        if (data == null) {
            alert("Does not exist");
        } else {

            $("#txtId").val(data.data.id);
            $("#txtfirstName1").val(data.data.firstName);
            $("#txtlastName1").val(data.data.lastName);
            $("#txtphoneNumber1").val(data.data.phoneNumber);
            $("#txtemail1").val(data.data.email);
            $("#txtRole1").val(data.data.roleId);


            $("#txtroleName1").val(data.data.roleName);


            $('#modalUpdateUser').modal({ backdrop: 'static', keyboard: false })
            $("#modalUpdateUser").modal('show');
        }

    });
};

function ViewDetail(e) {

    var id = e;

    window.location.href = "/SuperAdmin/UserManager/Details/" + id;

}

//Allow users to enter numbers only
$(".numericOnly").bind('keypress', function (e) {
    if (e.keyCode == '9' || e.keyCode == '16') {
        return;
    }
    var code;
    if (e.keyCode) code = e.keyCode;
    else if (e.which) code = e.which;
    if (e.which == 46)
        return false;
    if (code == 8 || code == 46)
        return true;
    if (code < 48 || code > 57)
        return false;
});

//Disable paste
$(".numericOnly").bind("paste", function (e) {
    e.preventDefault();
});

$(".numericOnly").bind('mouseenter', function (e) {
    var val = $(this).val();
    if (val != '0') {
        val = val.replace(/[^0-9]+/g, "")
        $(this).val(val);
    }
});