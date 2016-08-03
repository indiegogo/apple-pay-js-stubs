$( document ).ready(function () {
    configureApplePay();
});

function configureApplePay() {
    if (window.ApplePaySession) {
        ApplePaySession.canMakePaymentsWithActiveCard("com.example.e-commerce").
        then(function (canMakePayments) {
            if (canMakePayments) {
                $(".apple-pay").show();
                $(".no-apple-pay").hide();
            } else {
                $(".apple-pay").hide();
                $(".no-apple-pay").show();
            }
        });
    }
}

$( ".apple-pay" ).click(function() {
    var request = {};
    var session = new ApplePaySession(1, request);
    session.onvalidatemerchant = function (event) {
        logSessionInteraction("Validate Merchant Requested");
        var fakeMerchantSession = {};
        session.completeMerchantValidation(fakeMerchantSession);
    }

    session.oncancel = function(event) {
        logSessionInteraction("Payment Cancelled");
    }

    session.onshippingcontactselected = function(event) {
        logSessionInteraction("Shipping Contact Selected");
        session.completeShippingContactSelection(123, [], {}, {});
    };

    session.onpaymentauthorized = function(event) {
        logSessionInteraction("Payment Authorized by User");
        session.completePayment();
    };

    session.begin();
});