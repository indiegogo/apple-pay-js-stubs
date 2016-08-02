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
            ApplePaySession.stubCanMakePaymentsWithActiveCard = false;
            ApplePaySession.canMakePaymentsWithActiveCard("com.fake.merchant.identifier").should.eventually.equal(false);

            ApplePaySession.stubCanMakePaymentsWithActiveCard  = true;
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

    describe("abort()", function () {
        it("has implementation", function () {
            var session = new ApplePaySession(1, {});
            expect(function() {
                session.abort();
            }).to.not.throw();
        });
    });

    describe("completePayment(status)", function () {
        it("has implementation", function () {
            var session = new ApplePaySession(1, {});
            expect(function() {
                session.completePayment(123);
            }).to.not.throw();
        });
    });

    describe("canMakePayments()", function () {
        it("has implementation that returns true", function () {
            ApplePaySession.stubCanMakePayments = true;
            expect(ApplePaySession.canMakePayments()).to.be.true;
        });

        it("has implementation that returns false", function () {
            ApplePaySession.stubCanMakePayments = false;
            expect(ApplePaySession.canMakePayments()).to.be.false;
        });
    });

    describe("completeMerchantValidation()", function() {
        var session;
        beforeEach(function () {
            session = new ApplePaySession(1, {});
        });

        it('throws exception when no ApplePaySession.afterBeginAndValidation() callback is set when completeMerchantValidation is called', function () {
            expect(function() {
                session.completeMerchantValidation({});
            }).to.throw("Error: No post afterShowAndValidate actions defined");
        });

        it('does not throw an exception when ApplePaySession.afterBeginAndValidation() callback is set when completeMerchantValidation is called', function () {
            ApplePaySession.afterBeginAndValidation = function() {};
            expect(function() {
                session.completeMerchantValidation({});
            }).to.not.throw();
        });

        it('calls afterBeginAndValidation with session when completeMerchantValidation is called', function() {
            var calledWithSession;
            ApplePaySession.afterBeginAndValidation = function(session) {
                calledWithSession = session;
            };
            session.completeMerchantValidation({});
            expect(calledWithSession).to.eq(session);
        });

        it('clears afterBeginAndValidation after completeMerchantValidation is called', function() {
            var calledWithSession;
            ApplePaySession.afterBeginAndValidation = function(session) {
                calledWithSession = session;
            };
            session.completeMerchantValidation({});
            expect(ApplePaySession.afterBeginAndValidation).to.be.null;
        });
    });
});
