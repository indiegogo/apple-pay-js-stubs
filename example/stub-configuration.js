// Stub Configuration

$( document ).ready(function () {
    $( ".stub-config").prop("disabled",true);
});

function loadStubs() {
    loadScript("../src/apple-pay-js-stubs.js", function() {
        enableStubPaymentsForBrowser();
        configureApplePay();
    });
    $ ( "#enable-stubbing").text("Stubs Loaded");
    $ ( "#enable-stubbing").prop("disabled",true);
    $ ( ".stub-config").prop("disabled",false);

    $ ( "#stub-config-cancel").click(configureStubBehaviourCancel);
    $ ( "#stub-config-shipping-authorize").click(configureStubBehaviourShippingAuthorize);
}

function resetExample() {
    enableStubPaymentsForBrowser();
}

function enableStubPaymentsForBrowser() {
    ApplePaySession.stubCanMakePaymentsWithActiveCard = true;
    ApplePaySession.stubExecuteAfterMerchantValidation = function (session) {
        logSessionError("Error: No stub behaviour selected - please choose a configuration above first!");
    }
}

function configureStubBehaviourCancel() {
    ApplePaySession.stubExecuteAfterMerchantValidation = function (session) {
        // 1. Stub acts as if the user cancels the paysheet
        var event = {};
        session.oncancel(event);

        resetExample();
    };
}

function configureStubBehaviourShippingAuthorize() {
    ApplePaySession.stubExecuteAfterMerchantValidation = function (session) {
        // 1. Stub acts as if the user selects a on a shipping address
        var event = {};
        session.onshippingcontactselected(event);
        // 2. Stub acts as if the user authorizes the payment
        session.onpaymentauthorized(event);

        resetExample();
    };
}

$("#enable-stubbing").click(function () {
    loadStubs();
    configureApplePay();
});