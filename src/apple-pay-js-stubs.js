// Based on solution by naomik here http://stackoverflow.com/a/24216547
class Emitter {
    constructor() {
      var delegate = document.createDocumentFragment();
      [
        'addEventListener',
        'dispatchEvent',
        'removeEventListener'
      ].forEach(f =>
        this[f] = (...xs) => delegate[f](...xs)
      )
    }
}

class ApplePayPaymentAuthorizedEvent extends Event {
    constructor(payment) {
      super("paymentauthorized");
      this._payment = payment;
    }

    get payment() {
      return this._payment;
    }
}
window.ApplePayPaymentAuthorizedEvent = ApplePayPaymentAuthorizedEvent;

class ApplePaySessionStub extends Emitter {
    constructor(version, paymentRequest) {
        super();
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
        if (this._onvalidatemerchant) {
            this._onvalidatemerchant(
                {validationURL: 'https://apple-pay-gateway-cert.apple.com/paymentservices/startSession'}
            );
        } else {
            this.completeMerchantValidation();
        }
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