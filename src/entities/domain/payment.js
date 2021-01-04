const { isType } = require("../../lib/utils");

module.exports = class Payment {
	order;
	id;
	paymentMethod;
	gatewayAccessCode;
	gatewayReference;
	status;
	proofOfPayment;

	constructor(fields = {}) {
		for (let key in fields) {
			if (fields[key]) {
				this[key] = fields[key];
			}
		}
	}

	// object representation of the domain entity.
	repr() {
		const objectRepr = {
			order:
				(this.order && this.order.repr ? this.order.repr() : this.order) ||
				null,
			id: this.id,
			paymentMethod: this.paymentMethod,
			gatewayAccessCode: this.gatewayAccessCode,
			gatewayReference: this.gatewayReference,
			status: this.status,
			proofOfPayment:
				(isType("object", this.proofOfPayment) && this.proofOfPayment.uri) ||
				this.proofOfPayment ||
				null,
		};

		return objectRepr;
	}
};