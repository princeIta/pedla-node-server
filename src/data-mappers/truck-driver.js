const { Types } = require("mongoose");

const BaseMapper = require("./base");
const {
	TruckAndDriverEnt,
	TruckEnt,
	UserEnt,
	PeddlerProductEnt,
	ProductEnt,
} = require("../entities/domain");
const { isType } = require("../lib/utils");

module.exports = class TruckAndDriverMapper extends BaseMapper {
	constructor(models) {
		super();
		this.models = models;
	}

	async findTruckAndDrivers(filter, options) {
		const { TruckAndDriver } = this.models;
		const query = TruckAndDriver.find(filter)
			.populate("truckId")
			.populate("driverId");

		const { pagination } = options || {};
		const { page, limit } = pagination || {};

		if (limit && page) {
			query.limit(+limit);

			query.skip(+page * +limit);
		}

		const docs = await query;

		const results = [];
		if (docs) {
			for (const doc of docs) {
				results.push(this.toTruckAndDriverEnt(doc.toObject()));
			}

			return results;
		}
	}

	async findTruckAndDriver(filter) {
		const { TruckAndDriver } = this.models;
		const doc = await TruckAndDriver.findOne(filter)
			.sort("-createdAt")
			.populate({
				path: "truckId",
				populate: { path: "productId", populate: { path: "productId" } },
			})
			.populate("driverId");

		if (doc) {
			return this.toTruckAndDriverEnt(doc.toObject());
		}
	}

	async createTruckAndDriver(truckAndDriverEnt) {
		const { TruckAndDriver } = this.models;

		const newTruckAndDriver = this.toTruckAndDriverPersistence(
			truckAndDriverEnt
		);

		const doc = await TruckAndDriver.create(newTruckAndDriver);

		if (doc) {
			return this.toTruckAndDriverEnt(doc.toObject());
		}
	}

	async updateTruckAndDriverById(id, truckAndDriverEnt) {
		return await this.updateTruckAndDriver({ _id: id }, truckAndDriverEnt);
	}

	async updateTruckAndDriver(filter, truckAndDriverEnt) {
		const { TruckAndDriver } = this.models;

		const updates = this.toTruckAndDriverPersistence(truckAndDriverEnt);

		const doc = await TruckAndDriver.findOneAndUpdate(filter, updates, {
			new: true,
		});

		if (doc) {
			return this.toTruckAndDriverEnt(doc.toObject());
		}
	}

	async deleteTruckAndDriver(filter) {
		const { TruckAndDriver } = this.models;

		const doc = await TruckAndDriver.findOneAndDelete(filter);

		if (doc) {
			return this.toTruckAndDriverEnt(doc.toObject());
		}
	}

	toTruckAndDriverEnt(doc) {
		if (doc) {
			let truckEnt;
			let driverEnt;
			if (
				doc.truckId &&
				!Types.ObjectId.isValid(doc.truckId) &&
				doc.truckId._id
			) {
				// doc.truckId is an object. This indicates that it has been populated
				truckEnt = this._toEntity(doc.truckId, TruckEnt, {
					_id: "id",
					ownerId: "owner",
					productId: "product",
				});

				if (
					doc.truckId.productId &&
					!Types.ObjectId.isValid(doc.truckId.productId) &&
					doc.truckId.productId._id
				) {
					const entObj = doc.truckId.productId;

					truckEnt.product = this._toEntity(
						doc.truckId.productId,
						PeddlerProductEnt,
						{
							_id: "id",
						}
					);

					if (isType("object", entObj.productId)) {
						const productEnt = this._toEntity(entObj.productId, ProductEnt, {
							_id: "id",
						});

						truckEnt.product.product = productEnt;
					}
				}
			} else {
				truckEnt = this._toEntity({ id: doc.truckId }, TruckEnt, {
					_id: "id",
					ownerId: "owner",
					productId: "product",
				});
			}

			if (
				doc.driverId &&
				!Types.ObjectId.isValid(doc.driverId) &&
				doc.driverId._id
			) {
				driverEnt = this._toEntity(doc.driverId, UserEnt, {
					_id: "id",
					streetAddress: "address",
				});
			} else {
				driverEnt = this._toEntity({ id: doc.driverId }, UserEnt, {
					_id: "id",
					streetAddress: "address",
				});
			}

			doc.truckId = truckEnt;
			doc.driverId = driverEnt;

			const truckAndDriverEnt = this._toEntity(doc, TruckAndDriverEnt, {
				_id: "id",
				truckId: "truck",
				driverId: "driver",
			});

			return truckAndDriverEnt;
		}
	}

	toTruckAndDriverPersistence(ent) {
		if (ent.truck) {
			if (ent.truck.id) {
				ent.truck = ent.truck.id;
			} else {
				ent.truck = typeof ent.truck === "object" ? undefined : ent.truck;
			}
		}

		if (ent.driver) {
			if (ent.driver.id) {
				ent.driver = ent.driver.id;
			} else {
				ent.driver = typeof ent.driver === "object" ? undefined : ent.driver;
			}
		}

		return this._toPersistence(ent, {
			driver: "driverId",
			truck: "truckId",
		});
	}
};
