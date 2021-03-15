const User = require("./user");

module.exports = class Driver extends User {
	userName;
	peddler;
	truck;
	orderStats;
	rating;
	peddlerCode;

	constructor(fields = {}) {
		super(fields);
	}

	toDto() {
		const dto = super.toDto();

		dto.peddler =
			(this.peddler && this.peddler.toDto
				? this.peddler.toDto()
				: this.peddler) || null;
		dto.driverStats = this.orderStats || null;
		dto.peddlerCode = this.peddlerCode || null;
		dto.userName = this.userName || null;
		dto.truck = this.truck || null;
		dto.rating =
			this.rating && +this.rating.totalRating / this.rating.ratingCount;

		return dto;
	}
};