var ApplePaySession = window.ApplePaySession;

describe('apple-pay-js-stubs', function() {
    it("has window.ApplePaySession set", function () {
       expect(ApplePaySession).to.not.be.undefined;
    });

    describe('constructor', function () {
       it('should construct a session object', function() {
           var session = new ApplePaySession(1, {});
           expect(session).to.not.be.undefined;
       });
    });

    describe('static canMakePaymentsWithActiveCard()', function () {
        it('returns fulfilled promise with the configured mockCanMakePaymentsWithActiveCard value', function () {
            ApplePaySession.mockCanMakePaymentsWithActiveCard = false;
            ApplePaySession.canMakePaymentsWithActiveCard("com.fake.merchant.identifier").should.eventually.equal(false);

            ApplePaySession.mockCanMakePaymentsWithActiveCard = true;
            ApplePaySession.canMakePaymentsWithActiveCard("com.fake.merchant.identifier").should.eventually.equal(true);
        });
    });

    describe('begin()', function () {
        it('calls session.onvalidatemerchant() with expected validationURL', function () {
            var session = new ApplePaySession(1, {});
            var theEvent;
            session.onvalidatemerchant = function(event) {
                theEvent = event;
            };
            session.begin();
            expect(theEvent.validationURL).to.equal('https://apple-pay-gateway-cert.apple.com/paymentservices/startSession');
        });
    });
});
