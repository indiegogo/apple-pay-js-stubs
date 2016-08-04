class ApplePaySessionStub {
    constructor(version, paymentRequest) {
        this.version = version;
        this.request = paymentRequest;
    }

    // Static Stub configuration

    static get stubCanMakePayments() {
        return this._stubCanMakePayments;
    }

    static set stubCanMakePayments(value) {
        this._stubCanMakePayments = value;
    }

    static get stubCanMakePaymentsWithActiveCard() {
        return this._stubCanMakePaymentsWithActiveCard;
    }

    static set stubCanMakePaymentsWithActiveCard(value) {
        this._stubCanMakePaymentsWithActiveCard = value;
    }

    static set stubExecuteAfterMerchantValidation(callback) {
        this._stubExecuteAfterMerchantValidation = callback;
    }

    static get stubExecuteAfterMerchantValidation() {
        return this._stubExecuteAfterMerchantValidation;
    }

    // Static Apple Pay JS interface

    static canMakePayments() {
        return this._stubCanMakePayments;
    }

    static canMakePaymentsWithActiveCard(merchantIdentifier) {
        return Promise.resolve(this.stubCanMakePaymentsWithActiveCard);
    }

    static supportsVersion(version) {
        return true;
    }

    // Instance Apple Pay JS interface

    abort() {}

    begin() {
        this._onvalidatemerchant(
            {validationURL: 'https://apple-pay-gateway-cert.apple.com/paymentservices/startSession'}
        );
    }

    completeMerchantValidation(merchantSession) {
        if (!ApplePaySession.stubExecuteAfterMerchantValidation) {
            throw "Error: No stubExecuteAfterMerchantValidation() callback set";
        }
        ApplePaySession.stubExecuteAfterMerchantValidation(this);
        ApplePaySession.stubExecuteAfterMerchantValidation = null;
    }

    completePayment(status) { }

    completePaymentMethodSelection(newTotal, newLineItems) { }

    completeShippingContactSelection(status, newShippingMethods, newTotal, newLineItems) { }

    completeShippingMethodSelection(status, newTotal, newLineItems) { }

    set onvalidatemerchant(value) {
        this._onvalidatemerchant = value;
    }
}

window.ApplePaySession = ApplePaySessionStub;