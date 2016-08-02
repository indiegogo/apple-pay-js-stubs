class ApplePaySessionStub {
    constructor(version, paymentRequest) {
        this.version = version;
        this.request = paymentRequest;
    }

    static get mockCanMakePaymentsWithActiveCard() {
        return this._mockCanMakePaymentsWithActiveCard;
    }

    static set mockCanMakePaymentsWithActiveCard(value) {
        this._mockCanMakePaymentsWithActiveCard = value;
    }

    static canMakePaymentsWithActiveCard(merchantIdentifier) {
        return Promise.resolve(this.mockCanMakePaymentsWithActiveCard);
    }

    begin() {
        this._onvalidatemerchant(
            {validationURL: 'https://apple-pay-gateway-cert.apple.com/paymentservices/startSession'}
        );
    }

    set onvalidatemerchant(value) {
        this._onvalidatemerchant = value;
    }
};

window.ApplePaySession = ApplePaySessionStub;
//export default ApplePaySessionStub;