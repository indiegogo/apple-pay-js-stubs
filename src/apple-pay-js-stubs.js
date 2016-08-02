class ApplePaySessionStub {
    constructor(version, request) {
        this.version = version;
        this.request = request;
    }

    //var mockCanMakePaymentsWithActiveCard;
    get mockCanMakePaymentsWithActiveCard() {
        return this.mockCanMakePaymentsWithActiveCard;
    }
    set mockCanMakePaymentsWithActiveCard(value) {
        this.mockCanMakePaymentsWithActiveCard = value;
    }
    static canMakePaymentsWithActiveCard(merchantIdentifier) {
        return Promise.resolve(this.mockCanMakePaymentsWithActiveCard);
    }
};

window.ApplePaySession = ApplePaySessionStub;
//export default ApplePaySessionStub;