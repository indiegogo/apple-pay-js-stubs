class ApplePaySessionStub {
    constructor(version, paymentRequest) {
        this.version = version;
        this.request = paymentRequest;
    }

    // Static Stub configuration

    static get mockCanMakePaymentsWithActiveCard() {
        return this._mockCanMakePaymentsWithActiveCard;
    }

    static set mockCanMakePaymentsWithActiveCard(value) {
        this._mockCanMakePaymentsWithActiveCard = value;
    }

    static set afterBeginAndValidation(callback) {
        this._afterBeginAndValidation = callback;
    }

    static get afterBeginAndValidation() {
        return this._afterBeginAndValidation;
    }

    // Static Apple Pay JS interface

    static canMakePaymentsWithActiveCard(merchantIdentifier) {
        return Promise.resolve(this.mockCanMakePaymentsWithActiveCard);
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

    completePayment(status) {
    }

    set onvalidatemerchant(value) {
        this._onvalidatemerchant = value;
    }
}

window.ApplePaySession = ApplePaySessionStub;
//export default ApplePaySessionStub;