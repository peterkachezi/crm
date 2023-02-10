function GetApproveModalForm(e, name) {    

    var id = e;

    var fullName = "APPROVE" + " - " + name;

    $("#txtAuto_id").val(id);

    $("#txtMemberName").text(fullName);

    $('#ModalApproveIssues').modal({ backdrop: 'static', keyboard: false })

    $("#ModalApproveIssues").modal('show');

}

$("#btnApprove").click(function () {

    debugger

    if ($('#txtMaklRemarks').val() == '') {
        $('#txtMaklRemarks').focus();
        swal({
            position: 'top-end',
            type: "error",
            title: "Remark is a required field",
            showConfirmButton: true,
        });

        return false;
    }

    $("#divLoader").show();

    $("#ModalApproveIssues").modal('hide');

    var formData = new FormData($('#frmApproveSupportIssues').get(0));

    swal(

        {
            title: "Are you sure?",

            text: "Approving Member!",

            type: "success",

            showCancelButton: true,

            confirmButtonColor: "##62b76e",

            confirmButtonText: "Yes, Procceed!",

            closeOnConfirm: false
        },

        function () {

            $.ajax({
                type: "POST",
                url: "/Claims/SupportDesk/ApproveSupportDeskIssues", // NB: Use the correct action name
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

function GetRejectModalForm(e, name) {

    var id = e;

    var fullName = "REJECT" + " - " + name;

    $("#txtAuto_id1").val(id);

    $("#txtMemberName1").text(fullName);

    $('#ModalRejectIssues').modal({ backdrop: 'static', keyboard: false })

    $("#ModalRejectIssues").modal('show');

}

$("#btnReject").click(function () {

    debugger

    if ($('#txtMaklRemarks1').val() == '') {
        $('#txtMaklRemarks1').focus();
        swal({
            position: 'top-end',
            type: "error",
            title: "Remark is a required field",
            showConfirmButton: true,
        });

        return false;
    }

    $("#divLoader").show();

    $("#ModalRejectIssues").modal('hide');

    var formData = new FormData($('#frmRejectSupportIssues').get(0));

    swal(

        {
            title: "Are you sure?",

            text: "Rejecting member approval request!",

            type: "success",

            showCancelButton: true,

            confirmButtonColor: "##62b76e",

            confirmButtonText: "Yes, Procceed!",

            closeOnConfirm: false
        },

        function () {

            $.ajax({
                type: "POST",
                url: "/Claims/SupportDesk/RejectSupportDeskIssues", // NB: Use the correct action name
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
                        $("#divLoader").hide();
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