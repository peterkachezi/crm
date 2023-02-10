
$(function () {

    $("#txtSelectedMember").on("click", function () {

        $(".divNext").toggle(this.checked);

        var autoId = $("input[type='checkbox']").val();

        $("#txtAutoId").val(autoId);

        console.log(autoId);

    });
});
function SearchMember() {

    $("#divLoader").show();

    debugger


    if ($('#txtMemberNo').val() == '') {
        $('#txtMemberNo').focus();
        swal({
            position: 'top-end',
            type: "error",
            title: "Please enter Member No",
            showConfirmButton: true,
        });
        $("#divLoader").hide();
        return false;
    }

    if ($('#txtSchemeNo').val() == '') {
        $('#txtSchemeNo').focus();
        swal({
            position: 'top-end',
            type: "error",
            title: "Please select scheme",
            showConfirmButton: true,
        });
        $("#divLoader").hide();
        return false;
    }

    var memberNo = $("#txtMemberNo").val();

    var schemeNo = $("#txtSchemeNo").val();

    console.log(memberNo);

    window.location.href = "/Hospital/GenerateMvc/Index?MemberNo=" + memberNo + "&SchemeNo=" + schemeNo;

}

$("#btnGenerateMVC").click(function () {

    $("#divLoader").show();


    var formData = new FormData($('#frmMemberDetails').get(0));

    swal(

        {
            title: "Are you sure?",

            text: "Generating Mvc!",

            type: "success",

            showCancelButton: true,

            confirmButtonColor: "##62b76e",

            confirmButtonText: "Yes, Procceed!",

            closeOnConfirm: false
        },

        function () {

            $.ajax({
                type: "POST",
                url: "/Hospital/GenerateMvc/GenerateMVC", // NB: Use the correct action name
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

                            showConfirmButton: true,

                        })

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