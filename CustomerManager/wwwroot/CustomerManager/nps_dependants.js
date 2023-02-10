$(document).ready(function () {
});
function ApproveMember(e, relation) {

    var id = e;

    console.log(id);

    swal(

        {
            title: "Are you sure?",

            text: "Approving  Dependant!",

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


                url: "/Claims/NpsDependants/ApproveDependant?Id=" + id + "&Relation=" + relation,

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
                            /*  timer: 5000,*/
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
function ApprovePSMSMember(e) {

    debugger

    var autoId = e;

    console.log(autoId);

    swal(

        {
            title: "Are you sure?",

            text: "Approving  Member!",

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


                url: "/Claims/PSMSMembers/ApproveMember?AutoId=" + autoId,

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
$("#btnSuspend").click(function () {

    if ($('#txtSuspensionRemarks').val() == '') {
        $('#txtSuspensionRemarks').focus();
        swal({
            position: 'top-end',
            type: "error",
            title: "Remark is a required field",
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
                url: "/Claims/NpsDependants/SuspendMember", // NB: Use the correct action name
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

                    $("#divLoader").hide();
                },


                error: function (error) {
                    alert("errror");
                }
            });

        }
    );

});
$("#btnDelete").click(function () {

    if ($('#txtDeleteRemarks').val() == '') {
        $('#txtDeleteRemarks').focus();
        swal({
            position: 'top-end',
            type: "error",
            title: "Remark is a required field",
            showConfirmButton: true,
        });

        return false;
    }

    $("#divLoader").show();

    $("#ModalDeleteMember").modal('hide');

    var formData = new FormData($('#frmDeletePrincipalMember').get(0));

    swal(

        {
            title: "Are you sure?",

            text: "Deleting Member!",

            type: "success",

            showCancelButton: true,

            confirmButtonColor: "##62b76e",

            confirmButtonText: "Yes, Procceed!",

            closeOnConfirm: false
        },

        function () {

            $.ajax({
                type: "POST",
                url: "/Claims/Members/DeleteMember", // NB: Use the correct action name
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

                    $("#divLoader").hide();
                },


                error: function (error) {
                    alert("errror");
                }
            });

        }
    );

});
function SuspendDependant(e) {

    debugger

    $("#divLoader").show();
    var id = e;

    console.log(id);


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

                type: "GET",

                url: "/Claims/Members/SuspendMember/" + id,

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

function GetDependantDocuments(m,n,p,id) {

    debugger

    var memberNumber = m;

    var fullName = n + "'s Documents";

    var principalNumber = p;

    var dependantId = id;

    console.log(memberNumber);

    var tr = '';

    $.ajax({


        url: '/Claims/NpsDependants/GetMemberDocuments?MemberNumber=' + memberNumber,

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

function GetSuspensionModal(e, name) {

    var id = e;

    var fullName = "Suspend" + " " + name;

    $("#txtId").val(id);

    $("#txtMemberName").text(fullName);


    $('#ModalSuspendMember').modal({ backdrop: 'static', keyboard: false })

    $("#ModalSuspendMember").modal('show');

};
function GetDeleteMember(e, name) {

    var id = e;

    var fullName = "Delete" + " " + name;

    $("#txtId1").val(id);

    $("#txtMemberName1").text(fullName);


    $('#ModalDeleteMember').modal({ backdrop: 'static', keyboard: false })

    $("#ModalDeleteMember").modal('show');

}
function ViewDetails(e) {

    var id = e;

    window.location.href = "/Claims/EditMembersRequest/Review/" + id;

}
function GetAllData() {

    var memberNumber = $("#txtMemberNumber").val();

    var phoneNumber = $("#txtPhoneNumber").val();

    var status = $("#txtStatus").val();

    console.log(status);

    var t = $('#tblMembers').DataTable();

    t.destroy();

    $("#tblMembers").show();

    t = $('#tblMembers').DataTable({

        "ajax": {
            "url": "/Claims/EditMembersRequest/GetEditMemberRequest?MemberNumber=" + memberNumber + "&PhoneNumber=" + phoneNumber + "&Status=" + status,

            "type": "GET",
            "datatype": "json"
        },

        "columns": [

            { "data": "id" },
            { "data": "principalNumber" },
            { "data": "fullName" },
            { "data": "gender" },
            { "data": "phoneNumber" },
            { "data": "relation" },
            { "data": "jobGroup" },
            {
                data: null,

                mRender: function (data, type, row) {

                    var status = row.status;

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
                        return "<span class='Deleted' > Deleted </span>"
                    }

                    if (status == 4) {
                        return "<span class='Deleted' > Deleted </span>"
                    }
                }
            },

            { "data": "newCreateDate" },

            {
                data: null,
                mRender: function (data, type, row) {

                    return "<div class='dropdown'>"

                        + "<button  class='dropdown-toggle' type ='button' id ='dropdownMenuButton' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>Action </button>"

                        + "<div class='dropdown-menu' aria-labelledby='dropdownMenuButton'>"

                        + "<a class='dropdown-item' href ='#'  onclick=ApproveDependant('" + row.memberNumber + "');>Approve </a>"

                        + "<a class='dropdown-item' href ='#'  onclick=GetSuspensionModal('" + row.id + "','" + row.firstName + "');>Suspend </a>"

                        + "<a class='dropdown-item' href ='#'  onclick=GetDependantDocuments('" + row.memberNumber + "','" + row.firstName + "');>View Documents </a>"

                        + "</div>"

                        + "</div>";
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
function GetEditDetails(m) {
    debugger

    var memberNumber = m;

    $.get("/Claims/PSMSMembers/GetByMemberNumber/?MemberNumber=" + memberNumber, function (data, status) {

        console.log(data);

        if (data.data == null) {

            alert("No record found");

        } else {

            $("#txtAuto_idEdit").val(data.data.auto_id);
            $("#txtPhoneNumber").val(data.data.mobile);
            $("#txtName").val(data.data.name);
            $("#txtGender").val(data.data.sex);



            $("#txtRelationEdit").val(data.data.relation);

            $('#ModalEditDetails').modal({ backdrop: 'static', keyboard: false })

            $("#ModalEditDetails").modal('show');
        }

    });
};
$("#btnUpdateDetails").click(function () {

    if ($('#txtName').val() == '') {
        $('#txtName').focus();
        swal({
            position: 'top-end',
            type: "error",
            title: "Name is a required field",
            showConfirmButton: true,
        });

        return false;
    }

    if ($('#txtPhoneNumber').val() == '') {
        $('#txtPhoneNumber').focus();
        swal({
            position: 'top-end',
            type: "error",
            title: "Phone Number is a required field",
            showConfirmButton: true,
        });

        return false;
    }



    $("#divLoader").show();

    $("#ModalEditDetails").modal('hide');

    var formData = new FormData($('#frmEditDetails').get(0));

    swal(

        {
            title: "Are you sure?",

            text: "Updating Member Details!",

            type: "success",

            showCancelButton: true,

            confirmButtonColor: "##62b76e",

            confirmButtonText: "Yes, Procceed!",

            closeOnConfirm: false
        },

        function () {

            $.ajax({
                type: "POST",
                url: "/Claims/PSMSMembers/UpdateDetails", // NB: Use the correct action name
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

                    $("#divLoader").hide();
                },


                error: function (error) {
                    alert("errror");
                }
            });

        }
    );

});
function GetMemberRecord(e) {

    var autoId = e;

    $.get("/Claims/PSMSMembers/GetByAutoId/?AutoId=" + autoId, function (data, status) {

        console.log(data);
        if (data == null) {
            alert("Does not exist");
        } else {

            $("#txtAuto_id").val(data.data.auto_id);
            $("#txtName").val(data.data.name);
            $("#txtGender").val(data.data.sex);


            $('#ModalEditMemberDetails').modal({ backdrop: 'static', keyboard: false })
            $("#ModalEditMemberDetails").modal('show');
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

                url: "/Claims/EditRequest_Principals/ApproveEditRequest?Id=" + id,

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
function ViewDocuments(e, name) {

    debugger

    var memberNumber = e;

    var fullName = name + "'s Documents";

    console.log(memberNumber);

    var tr = '';

    $.ajax({

        url: '/Claims/NpsDependants/GetMemberDocuments?MemberNumber=' + memberNumber,

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

                url: "/Claims/EditRequest_Principals/Delete/" + id,

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
function ReinstateMember(e) {

    $("#divLoader").show();
    var id = e;

    console.log(id);
    swal(

        {
            title: "Are you sure?",

            text: "Reinstating Member!",

            type: "success",

            showCancelButton: true,

            confirmButtonColor: "##62b76e",

            confirmButtonText: "Yes, Procceed!",

            closeOnConfirm: false
        },

        function () {

            $.ajax({

                type: "GET",

                url: "/Claims/NpsDependants/ReinstateMember/" + id,

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
                url: "/Claims/NpsDependants/ApproveDependant", // NB: Use the correct action name
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