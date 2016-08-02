var ApplePaySession = window.ApplePaySession;

describe('apple-pay-js-stubs', function() {
    it("has window.ApplePaySession set", function () {
       expect(ApplePaySession).to.not.be.undefined;
    });

    describe('static canMakePaymentsWithActiveCard', function () {
        it('returns fulfilled promise with the configured mockCanMakePaymentsWithActiveCard value', function () {
            ApplePaySession.mockCanMakePaymentsWithActiveCard = false;
            ApplePaySession.canMakePaymentsWithActiveCard("com.fake.merchant.identifier").should.eventually.equal(false);

            ApplePaySession.mockCanMakePaymentsWithActiveCard = true;
            ApplePaySession.canMakePaymentsWithActiveCard("com.fake.merchant.identifier").should.eventually.equal(true);
        });
    });
});
