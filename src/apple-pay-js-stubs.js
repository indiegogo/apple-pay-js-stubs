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

    static set afterBeginAndValidation(callback) {
        this._afterBeginAndValidation = callback;
    }

    static get afterBeginAndValidation() {
        return this._afterBeginAndValidation;
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
        if (!ApplePaySession._afterBeginAndValidation) {
            throw "Error: No post afterShowAndValidate actions defined";
        }
        ApplePaySession.afterBeginAndValidation(this);
        ApplePaySession.afterBeginAndValidation = null;
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