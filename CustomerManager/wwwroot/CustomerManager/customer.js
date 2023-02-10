function DeleteRecord(e) {

    $("#divLoader").show();

    var customerId = e;

    console.log(customerId);

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

                url: "/Customers/Delete/?CustomerID=" + customerId,

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

$("#btnSubmit").click(function () {

    if ($('#txtFirstName').val() == '') {
        $('#txtFirstName').focus();
        swal({
            position: 'top-end',
            type: "error",
            title: "Please enter first name",
            showConfirmButton: true,
        });

        return false;
    }

    if ($('#txtLastName').val() == '') {
        $('#txtLastName').focus();
        swal({
            position: 'top-end',
            type: "error",
            title: "Please enter last name",
            showConfirmButton: true,
        });

        return false;
    }

    if ($('#txtPhoneNumber').val() == '') {
        $('#txtPhoneNumber').focus();
        swal({
            position: 'top-end',
            type: "error",
            title: "Please enter phone number",
            showConfirmButton: true,
        });

        return false;
    }

    $("#ModalCreateCustomer").modal('hide');

    $("#divLoader").show();

    var formData = new FormData($('#frmAddCustomers').get(0));

    $.ajax({
        type: "POST",
        url: "/Customers/Create", // NB: Use the correct action name
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

});

$("#btnUpdateCustomer").click(function () {

    if ($('#txtFirstName1').val() == '') {
        $('#txtFirstName1').focus();
        swal({
            position: 'top-end',
            type: "error",
            title: "Please enter first name",
            showConfirmButton: true,
        });

        return false;
    }

    if ($('#txtLastName1').val() == '') {
        $('#txtLastName1').focus();
        swal({
            position: 'top-end',
            type: "error",
            title: "Please enter last name",
            showConfirmButton: true,
        });

        return false;
    }

    if ($('#txtPhoneNumber1').val() == '') {
        $('#txtPhoneNumber1').focus();
        swal({
            position: 'top-end',
            type: "error",
            title: "Please enter phone number",
            showConfirmButton: true,
        });

        return false;
    }

    $("#ModalUpdateCustomer").modal('hide');

    $("#divLoader").show();

    var formData = new FormData($('#frmUpdateCustomers').get(0));

    $.ajax({
        type: "POST",
        url: "/Customers/Update", // NB: Use the correct action name
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

});

function GetCustomer(e) {

    var customerId = e;
    $.get("/Customers/GetById/?CustomerId=" + customerId, function (data, status) {

        console.log(data);
        if (data == null) {
            alert("Does not exist");
        } else {

            $("#txtCustomerId").val(data.data.customerID);     
            $("#txtFirstName1").val(data.data.firstName);
            $("#txtLastName1").val(data.data.lastName);
            $("#txtEmailAddress1").val(data.data.emailAddress);
            $("#txtDesignation1").val(data.data.designation);
            $("#txtCompany1").val(data.data.company);
            $("#txtCity1").val(data.data.city);
            $("#txtCollegeName1").val(data.data.collegeName);
            $("#txtState1").val(data.data.state);
            $("#txtSource1").val(data.data.source);
            $("#txtIsActive1").val(data.data.isActive);
            $("#txtPhoneNumber1").val(data.data.phoneNumber);

            $('#ModalUpdateCustomer').modal({ backdrop: 'static', keyboard: false })
            $("#ModalUpdateCustomer").modal('show');
        }

    });
};

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


