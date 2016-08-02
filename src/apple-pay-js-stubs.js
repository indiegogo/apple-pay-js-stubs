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

    // Instance Apple Pay JS interface

    completeMerchantValidation(merchantSession) {
        if (!ApplePaySession.stubExecuteAfterMerchantValidation) {
            throw "Error: No stubExecuteAfterMerchantValidation() callback set";
        }
        ApplePaySession.stubExecuteAfterMerchantValidation(this);
        ApplePaySession.stubExecuteAfterMerchantValidation = null;
    }

    begin() {
        this._onvalidatemerchant(
            {validationURL: 'https://apple-pay-gateway-cert.apple.com/paymentservices/startSession'}
        );
    }

    abort() {}

    completePayment(status) {
    }

    set onvalidatemerchant(value) {
        this._onvalidatemerchant = value;
    }
}

window.ApplePaySession = ApplePaySessionStub;
//export default ApplePaySessionStub;