function ShowLoader() {
    $("#divLoader").show();
}
function HideLoader() {
    $("#divLoader").Hide();
}
$("#btnCreateDependant").click(function () {



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

    if ($('#txtDateOfBirth').val() == '') {
        $('#txtDateOfBirth').focus();
        swal({
            position: 'top-end',
            type: "error",
            title: "date of birth is a required field",
            showConfirmButton: true,
        });
        return false;
    }

    $("#addDependantModal").modal('hide');

    $("#divLoader").show();

    var data = $("#frmCreateDependant").serialize();

    $.ajax({

        type: "POST",

        url: "/Claims/Dependants/Create/",

        data: data,

        success: function (response) {

            if (response.success) {

                swal({

                    position: 'top-end',

                    type: "success",

                    title: response.responseText,

                    showConfirmButton: false,

                }), setTimeout(function () { location.reload(); }, 500);

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
$("#btnUpdateDependant").click(function () {

    if ($('#txtFirstName1').val() == '') {
        $('#txtFirstName1').focus();
        swal({
            position: 'top-end',
            type: "error",
            title: "first name is a required field",
            showConfirmButton: true,
        });
        return false;
    }

    if ($('#txtLastName1').val() == '') {
        $('#txtLastName1').focus();
        swal({
            position: 'top-end',
            type: "error",
            title: "last name is a required field",
            showConfirmButton: true,
        });
        return false;
    }

    if ($('#txtDateOfBirth1').val() == '') {
        $('#txtDateOfBirth1').focus();
        swal({
            position: 'top-end',
            type: "error",
            title: "date of birth is a required field",
            showConfirmButton: true,
        });
        return false;
    }

    $("#updateDependantModal").modal('hide');

    ShowLoader();

    var data = $("#frmUpdateDependant").serialize();

    $.ajax({

        type: "POST",

        url: "/Claims/Dependants/Update/",

        data: data,

        success: function (response) {

            if (response.success) {

                swal({

                    position: 'top-end',

                    type: "success",

                    title: response.responseText,

                    showConfirmButton: false,

                }), setTimeout(function () { location.reload(); }, 500);

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
function GetRecord(e) {

    var id = e;

    $.get("/Claims/Dependants/GetById/?Id=" + id, function (data, status) {

        console.log(data);
        if (data == null) {
            alert("Does not exist");
        } else {

            $("#txtId").val(data.data.id);
            $("#txtFirstName1").val(data.data.firstName);
            $("#txtLastName1").val(data.data.lastName);
            $("#txtPhoneNumber1").val(data.data.phoneNumber);
            $("#txtGender1").val(data.data.gender);
            $("#txtEmail1").val(data.data.email);
            $("#txtRelation1").val(data.data.relation);
            $("#txtDateOfBirth1").val(data.data.dateOfBirth);


            $('#updateDependantModal').modal({ backdrop: 'static', keyboard: false })
            $("#updateDependantModal").modal('show');
        }

    });
};
function GetPrincipalRecord(e) {

    var id = e;

    console.log(id);

    $.get("/Claims/Members/GetById/?Id=" + id, function (data, status) {

        console.log(data);
        if (data == null) {
            alert("Does not exist");
        } else {

            $("#txtPrincipalId").val(data.data.id);

            $("#txtFirstNamePrincipal").val(data.data.firstName);

            $("#txtLastNamePrincipal").val(data.data.lastName);

            $("#txtPhoneNumberPrincipal").val(data.data.phoneNumber);

            $("#txtGenderPrincipal").val(data.data.gender);

            $("#txtEmailPrincipal").val(data.data.email);

            $("#txtRelationPrincipal").val(data.data.relation);

            $("#txtNationalIdPrincipal").val(data.data.nationalId);


            $('#updateMemberModal').modal({ backdrop: 'static', keyboard: false })

            $("#updateMemberModal").modal('show');
        }

    });
};
function DeleteRecord(e) {

    $("#divLoader").show();
    var id = e;

    console.log(id);


    swal(

        {
            title: "Are you sure?",

            text: "Once deleted, you will not be able to recover this  file!",

            type: "success",

            showCancelButton: true,

            confirmButtonColor: "##62b76e",

            confirmButtonText: "Yes, Procceed!",

            closeOnConfirm: false
        },

        function () {

            $.ajax({

                type: "GET",

                url: "/Claims/Dependants/DeleteDependant/" + id,

                success: function (response) {

                    if (response.success) {

                        swal({

                            position: 'top-end',

                            type: "success",

                            title: response.responseText,

                            showConfirmButton: false,

                            // timer: 2000,

                        });
                        setTimeout(function () { location.reload(); }, 500);

                    }

                    else {
                        swal({
                            position: 'top-end',
                            type: "error",
                            title: response.responseText,
                            showConfirmButton: true,
                            timer: 5000,
                        });
                        $("#divLoader").hide();
                    }

                },
                error: function (response) {
                    swal({
                        position: 'top-end',
                        type: "error",
                        title: "Server error ,kindly contact the admin for assistance",
                        showConfirmButton: false,
                        timer: 5000,
                    });
                    $("#divLoader").hide();
                }

            })

        }
    );
}
$("#btnUpdateMemberDetails").click(function () {

    if ($('#txtFirstNamePrincipal').val() == '') {
        $('#txtFirstNamePrincipal').focus();
        swal({
            position: 'top-end',
            type: "error",
            title: "first name is a required field",
            showConfirmButton: true,
        });
        return false;
    }

    if ($('#txtLastNamePrincipal').val() == '') {
        $('#txtLastNamePrincipal').focus();
        swal({
            position: 'top-end',
            type: "error",
            title: "last name is a required field",
            showConfirmButton: true,
        });
        return false;
    }

    if ($('#txtPhoneNumberPrincipal').val() == '') {
        $('#txtPhoneNumberPrincipal').focus();
        swal({
            position: 'top-end',
            type: "error",
            title: "Phone number is a required field",
            showConfirmButton: true,
        });
        return false;
    }

    $("#updateMemberModal").modal('hide');

    ShowLoader();

    var data = $("#frmUpdateMemberDetails").serialize();

    $.ajax({

        type: "POST",

        url: "/Claims/Members/Update/",

        data: data,

        success: function (response) {

            if (response.success) {

                swal({

                    position: 'top-end',

                    type: "success",

                    title: response.responseText,

                    showConfirmButton: false,

                }), setTimeout(function () { location.reload(); }, 500);

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
function ApproveDependant(e) {

    debugger

    var memberNumber = e;

    console.log(memberNumber);

    swal(

        {
            title: "Are you sure?",

            text: "Approving Dependant!",

            type: "success",

            showCancelButton: true,

            confirmButtonColor: "##62b76e",

            confirmButtonText: "Yes, Procceed!",

            closeOnConfirm: false
        },

        function () {

            $.ajax({

                type: "GET",

                url: "/Claims/Dependants/ApproveDependant?MemberNumber=" + memberNumber,

                success: function (response) {

                    if (response.success) {

                        swal({

                            position: 'top-end',

                            type: "success",

                            title: response.responseText,

                            showConfirmButton: false,

                            // timer: 2000,

                        });
                        setTimeout(function () { location.reload(); }, 500);

                    }

                    else {
                        swal({
                            position: 'top-end',
                            type: "error",
                            title: response.responseText,
                            showConfirmButton: true,
                            timer: 5000,
                        });
                        $("#divLoader").hide();
                    }

                },
                error: function (response) {
                    swal({
                        position: 'top-end',
                        type: "error",
                        title: "Server error ,kindly contact the admin for assistance",
                        showConfirmButton: false,
                        timer: 5000,
                    });

                }

            })

        }
    );
}
function SuspendDependant(e) {

    debugger

    $("#divLoader").show();

    var id = e;

    console.log(id);


    swal(

        {
            title: "Are you sure?",

            text: "Suspending dependant!",

            type: "success",

            showCancelButton: true,

            confirmButtonColor: "##62b76e",

            confirmButtonText: "Yes, Procceed!",

            closeOnConfirm: false
        },

        function () {

            $.ajax({

                type: "GET",

                url: "/Claims/Dependants/SuspendDependant/" + id,

                success: function (response) {

                    if (response.success) {

                        swal({

                            position: 'top-end',

                            type: "success",

                            title: response.responseText,

                            showConfirmButton: false,

                            // timer: 2000,

                        });
                        setTimeout(function () { location.reload(); }, 500);

                    }

                    else {
                        swal({
                            position: 'top-end',
                            type: "error",
                            title: response.responseText,
                            showConfirmButton: true,
                            timer: 5000,
                        });
                        $("#divLoader").hide();
                    }

                },
                error: function (response) {
                    swal({
                        position: 'top-end',
                        type: "error",
                        title: "Server error ,kindly contact the admin for assistance",
                        showConfirmButton: false,
                        timer: 5000,
                    });
                    $("#divLoader").hide();
                }

            })

        }
    );
}
function GetDependantDocuments(m, n, p, id) {

    debugger

    var memberNumber = m;

    var fullName = n + "'s Documents";

    var principalNumber = p;

    var dependantId = id;

    console.log(memberNumber);

    var tr = '';

    $.ajax({


        url: '/Claims/Members/GetMemberDocuments?MemberNumber=' + memberNumber,

        method: 'Get',

        success: (result) => {

            $.each(result, (k, v) => {

                tr += `<tr>
                    <td>${v.name}</td>       

                      <td><a class="" href="${v.documentUrl}" target="_blank"><i class="fa fa-eye"> </i> View Document</a></td>


                       </tr>`
            })
            $("#tblDocs").html(tr);

            console.log(result);


            $("#txtDependantNames").text(fullName);

            $("#txtMemberNumber2").val(memberNumber);

            $("#txtprincipalNumber2").val(principalNumber);

            $("#txtdependantId2").val(dependantId);

            $('#DependantDocumentsModal').modal({ backdrop: 'static', keyboard: false })

            $("#DependantDocumentsModal").modal('show');
        },
        error: (error) => {
            console.log(error);
        }
    });
}
function ViewDocuments(e, name) {

    debugger

    var memberNumber = e;

    var fullName = name + "'s Documents";

    console.log(memberNumber);

    var tr = '';

    $.ajax({

        url: '/Claims/Members/GetMemberDocuments?MemberNumber=' + memberNumber,

        method: 'Get',

        success: (result) => {

            $.each(result, (k, v) => {

                tr += `<tr>
                    <td>${v.name}</td>       

                      <td><a class="" href="${v.documentUrl}" target="_blank"><i class="fa fa-eye"> </i> View Document</a></td>

                  </tr>`
            })
            $("#tblViewDocs").html(tr);

            console.log(result);

            $("#txtDependantNames3").text(fullName);

            $("#txtMemberNumber3").val(memberNumber);

            $('#ViewDocumentsModal').modal({ backdrop: 'static', keyboard: false })

            $("#ViewDocumentsModal").modal('show');
        },
        error: (error) => {
            console.log(error);
        }
    });



}
function GetSuspensionModal(e, name) {

    var id = e;

    var fullName = "Suspend" + " " + name;

    $("#txtId").val(id);

    $("#txtMemberName").text(fullName);


    $('#ModalSuspendMember').modal({ backdrop: 'static', keyboard: false })

    $("#ModalSuspendMember").modal('show');

};
$("#btnSuspend").click(function () {

    debugger



    if ($('#txtSuspensionRemarks').val() == "") {
        $('#txtSuspensionRemarks').focus();
        swal({
            position: 'top-end',
            type: "error",
            title: "Suspension remark is a required field",
            showConfirmButton: true,
        });

        return false;
    }

    $("#divLoader").show();



    $("#ModalSuspendMember").modal('hide');

    var formData = new FormData($('#frmSuspendPrincipalMember').get(0));

    swal(

        {
            title: "Are you sure?",

            text: "Suspending Member!",

            type: "success",

            showCancelButton: true,

            confirmButtonColor: "##62b76e",

            confirmButtonText: "Yes, Procceed!",

            closeOnConfirm: false
        },

        function () {

            $.ajax({
                type: "POST",
                url: "/Claims/Dependants/SuspendDependant", // NB: Use the correct action name
                data: formData,
                dataType: 'json',
                contentType: false,
                processData: false,


                success: function (response) {
                    if (response.success) {

                        swal({
                            position: 'top-end',

                            type: "success",

                            title: response.responseText,

                            showConfirmButton: false,

                        }), setTimeout(function () { location.reload(); }, 500);

                    } else {

                        swal({
                            position: 'top-end',
                            type: "error",
                            title: response.responseText,
                            showConfirmButton: true,
                            timer: 5000,
                        });

                    }

                    $("#divLoader").hide();
                },


                error: function (error) {
                    alert("errror");
                }
            });

        }
    );

});
$("#btnSuspendRequest").click(function () {

    debugger

    if ($('#txtSuspensionRemarks').val() == "") {
        $('#txtSuspensionRemarks').focus();
        swal({
            position: 'top-end',
            type: "error",
            title: "Suspension remark is a required field",
            showConfirmButton: true,
        });

        return false;
    }

    $("#divLoader").show();

    $("#ModalSuspendMember").modal('hide');

    var formData = new FormData($('#frmSuspendEditRequest').get(0));

    swal(
        {
            title: "Are you sure?",

            text: "Suspending Member!",

            type: "success",

            showCancelButton: true,

            confirmButtonColor: "##62b76e",

            confirmButtonText: "Yes, Procceed!",

            closeOnConfirm: false
        },

        function () {

            $.ajax({
                type: "POST",
                url: "/Claims/EditRequests_Dependants/SuspendRequest", // NB: Use the correct action name
                data: formData,
                dataType: 'json',
                contentType: false,
                processData: false,


                success: function (response) {
                    if (response.success) {

                        swal({
                            position: 'top-end',

                            type: "success",

                            title: response.responseText,

                            showConfirmButton: false,

                        }), setTimeout(function () { location.reload(); }, 500);

                    } else {

                        swal({
                            position: 'top-end',
                            type: "error",
                            title: response.responseText,
                            showConfirmButton: true,
                            timer: 5000,
                        });

                    }

                    $("#divLoader").hide();
                },


                error: function (error) {
                    alert("errror");
                }
            });

        }
    );

});
$("#btnReinstateDependant").click(function () {

    $("#divLoader").show();

    $("#DependantDocumentsModal").modal('hide');

    var formData = new FormData($('#frmReinstateDependant').get(0));

    swal(

        {
            title: "Are you sure?",

            text: "Reinstating Dependant!",

            type: "success",

            showCancelButton: true,

            confirmButtonColor: "##62b76e",

            confirmButtonText: "Yes, Procceed!",

            closeOnConfirm: false
        },

        function () {

            $.ajax({
                type: "POST",
                url: "/Claims/Dependants/ReinstateDependant", // NB: Use the correct action name
                data: formData,
                dataType: 'json',
                contentType: false,
                processData: false,


                success: function (response) {

                    if (response.success) {

                        swal({
                            position: 'top-end',

                            type: "success",

                            title: response.responseText,

                            showConfirmButton: false,

                        }), setTimeout(function () { location.reload(); }, 500);

                    } else {

                        swal({
                            position: 'top-end',
                            type: "error",
                            title: response.responseText,
                            showConfirmButton: true,
                            timer: 5000,
                        });

                    }

                    $("#divLoader").hide();
                },


                error: function (error) {
                    alert("errror");
                }
            });

        }
    );

});
$("#btnApproveDependant").click(function () {

    $("#divLoader").show();

    $('#divLoader').delay(500).hide(5000);

    $("#DependantDocumentsModal").modal('hide');

    var formData = new FormData($('#frmApproveDependant').get(0));

    swal(

        {
            title: "Are you sure?",

            text: "Approving Dependant!",

            type: "success",

            showCancelButton: true,

            confirmButtonColor: "##62b76e",

            confirmButtonText: "Yes, Procceed!",

            closeOnConfirm: false
        },

        function () {

            $.ajax({
                type: "POST",
                url: "/Claims/Dependants/ApproveDependant", // NB: Use the correct action name
                data: formData,
                dataType: 'json',
                contentType: false,
                processData: false,


                success: function (response) {

                    if (response.success) {

                        swal({

                            position: 'top-end',

                            type: "success",

                            title: response.responseText,

                            showConfirmButton: false,

                            /*  timer: 500,*/

                        });
                        setTimeout(function () { location.reload(); }, 500);


                    } else {

                        swal({
                            position: 'top-end',
                            type: "error",
                            title: response.responseText,
                            showConfirmButton: true,
                            timer: 5000,
                        });

                    }

                    $("#divLoader").hide();
                },


                error: function (error) {
                    alert("errror");
                }
            });

        }
    );

});
function GetAllData() {

    ShowLoader();

    $('#divLoader').delay(500).hide(5000);

    var memberNumber = $("#txtMemberNumber").val();

    var phoneNumber = $("#txtPhoneNumber").val();

    var status = $("#txtStatus").val();

    var t = $('#tblMembers').DataTable();

    t.destroy();

    $("#tblMembers").show();

    t = $('#tblMembers').DataTable({

        "ajax": {
            "url": "/Claims/EditMembersRequest/GetEditMemberRequest?MemberNumber=" + memberNumber + "&PhoneNumber=" + phoneNumber + "&Status=" + status,

            "type": "GET",

            "datatype": "json",
        },

        "columns": [

            { "data": "id" },
            { "data": "principalNumber" },
            { "data": "fullName" },
            { "data": "gender" },
            { "data": "newDateOfBirth" },
            { "data": "age" },
            { "data": "phoneNumber" },
            { "data": "relation" },
            { "data": "jobGroup" },

            {
                data: null,

                mRender: function (data, type, row) {

                    var status = row.status;
                    console.log(row);
                    if (status == 0) {
                        return "<span class='pending'> Awaiting approval </span>"
                    }

                    if (status == 1) {
                        return "<span class='approved'> Approved </span>"
                    }
                    if (status == 2) {
                        return "<span class='suspended' > Suspended </span>"
                    }

                    if (status == 3) {
                        return "<span class='suspended' > Deleted </span>"
                    }

                    if (status == 4) {
                        return "<span class='suspended' > Deleted </span>"
                    }
                }
            },

            { "data": "newCreateDate" },

            {
                data: null,
                mRender: function (data, type, row) {

                    var status = row.status;

                    if (status == 0) {
                        return "<div class='dropdown'>"

                            + "<button  class='dropdown-toggle' type ='button' id ='dropdownMenuButton' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>Option </button>"

                            + "<div class='dropdown-menu' aria-labelledby='dropdownMenuButton'>"

                            + "<a class='dropdown-item' href ='#'  onclick=GetDependantDocuments('" + row.memberNumber + "','" + row.fullName + "');>Approve </a>"

                            + "<a class='dropdown-item' href ='#'  onclick=GetSuspensionModal('" + row.id + "','" + row.firstName + "');>Suspend </a>"

                            + "<a class='dropdown-item' href ='#'  onclick=ViewDocuments('" + row.memberNumber + "','" + row.firstName + "');>View Documents </a>"


                            + "</div>"

                            + "</div>";

                    }

                    if (status == 1) {

                        return "<div class='dropdown'>"

                            + "<button  class='dropdown-toggle' type ='button' id ='dropdownMenuButton' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>Option </button>"

                            + "<div class='dropdown-menu' aria-labelledby='dropdownMenuButton'>"


                            + "<a class='dropdown-item' href ='#'  onclick=ViewDocuments('" + row.memberNumber + "','" + row.firstName + "');>View Documents </a>"

                            + "</div>"

                            + "</div>";


                    }
                    if (status == 2) {
                        return "<div class='dropdown'>"

                            + "<button  class='dropdown-toggle' type ='button' id ='dropdownMenuButton' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>Option </button>"

                            + "<div class='dropdown-menu' aria-labelledby='dropdownMenuButton'>"

                            + "<a class='dropdown-item' href ='#'  onclick=ViewDocuments('" + row.memberNumber + "','" + row.firstName + "');>View Documents </a>"

                            + "<a class='dropdown-item' href ='#'  onclick=GetDependantSuspensionDetals('" + row.id + "');>Suspension Details </a>"

                            + "</div>"

                            + "</div>";
                    }

                    if (status == 3) {
                        return "<div class='dropdown'>"

                            + "<button  class='dropdown-toggle' type ='button' id ='dropdownMenuButton' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>Option </button>"

                            + "<div class='dropdown-menu' aria-labelledby='dropdownMenuButton'>"

                            //+ "<a class='dropdown-item' href ='#'  onclick=GetDependantDocuments('" + row.memberNumber + "','" + row.firstName + "');>Activate </a>"

                            + "</div>"

                            + "</div>";
                    }

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
function GetDependantSuspensionDetals(e) {

    debugger

    var Id = e;

    $.get("/Claims/Dependants/GetById/?Id=" + Id, function (data, status) {

        console.log(data);

        if (data.data == null) {

            alert("No record found");

        } else {

            $("#txtId2").val(data.data.id);

            $("#txtSusReasons").text(data.data.suspensionRemarks);

            $('#ModalViewSuspensionDetails').modal({ backdrop: 'static', keyboard: false })

            $("#ModalViewSuspensionDetails").modal('show');
        }

    });
};
function CommitEditRequests(e) {

    debugger

    var id = e;

    console.log(id);

    swal(

        {
            title: "Are you sure?",

            text: "Approving Edit Request!",

            type: "success",

            showCancelButton: true,

            confirmButtonColor: "##62b76e",

            confirmButtonText: "Yes, Procceed!",

            closeOnConfirm: false
        },

        function () {

            $("#divLoader").show();

            $.ajax({

                type: "GET",

                url: "/Claims/EditRequests_Dependants/ApproveEditRequest?Id=" + id,

                success: function (response) {

                    if (response.success) {

                        swal({

                            position: 'top-end',

                            type: "success",

                            title: response.responseText,

                            showConfirmButton: false,

                            // timer: 2000,

                        });
                        setTimeout(function () { location.reload(); }, 500);

                    }

                    else {
                        swal({
                            position: 'top-end',
                            type: "error",
                            title: response.responseText,
                            showConfirmButton: true,
                            timer: 5000,
                        });
                        $("#divLoader").hide();
                    }

                },

                error: function (response) {
                    swal({
                        position: 'top-end',
                        type: "error",
                        title: "Server error ,kindly contact the admin for assistance",
                        showConfirmButton: false,
                        timer: 5000,
                    });
                    $("#divLoader").hide();
                }

            })

        }
    );
}
function DeleteRequest(e) {

    $("#divLoader").show();
    var id = e;

    console.log(id);


    swal(

        {
            title: "Are you sure?",

            text: "Once deleted, you will not be able to recover this  file!",

            type: "success",

            showCancelButton: true,

            confirmButtonColor: "##62b76e",

            confirmButtonText: "Yes, Procceed!",

            closeOnConfirm: false
        },

        function () {

            $.ajax({

                type: "GET",

                url: "/Claims/EditRequests_Dependants/Delete/" + id,

                success: function (response) {

                    if (response.success) {

                        swal({

                            position: 'top-end',

                            type: "success",

                            title: response.responseText,

                            showConfirmButton: false,

                            // timer: 2000,

                        });
                        setTimeout(function () { location.reload(); }, 3000);

                    }

                    else {
                        swal({
                            position: 'top-end',
                            type: "error",
                            title: response.responseText,
                            showConfirmButton: true,
                            timer: 5000,
                        });
                        $("#divLoader").hide();
                    }

                },
                error: function (response) {
                    swal({
                        position: 'top-end',
                        type: "error",
                        title: "Server error ,kindly contact the admin for assistance",
                        showConfirmButton: false,
                        timer: 5000,
                    });
                    $("#divLoader").hide();
                }

            })

        }
    );
}