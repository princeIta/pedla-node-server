const BaseMapper = require("./base");

const isObjectEmpty = require("../lib/utils/is-object-empty");
const {
	UserEnt,
	PeddlerProductEnt,
	GeoEnt,
	ProductEnt,
} = require("../entities/domain");
const { presence } = require("../db/mongo/enums/user");
const {
	user: { types },
	order: { deliveryStatus },
} = require("../db/mongo/enums");
const { Types } = require("mongoose");

module.exports = class UserMapper extends BaseMapper {
	_toEntityTransform = {
		_id: "id",
		streetAddress: "address",
	};

	_toPersistenceTransform = {
		address: "streetAddress",
	};

	constructor(models) {
		super();
		this.models = models;
	}

	async findUser(filter, populateFn) {
		const { User } = this.models;

		const search = this._toPersistence(filter, this._toPersistenceTransform);
		const doc = User.findOne(search);
		if (populateFn) {
			populateFn(doc);
		}

		const result = await doc;
		if (result) {
			const entObj = result.toObject();
			if (result.avatarImg && result.avatarImg.uri) {
				entObj.avatarImg = result.avatarImg.uri;
			}
			const userEnt = this._toEntity(entObj, UserEnt, this._toEntityTransform);

			return userEnt;
		}
	}

	async countDocsByVStatus(status) {
		const { User } = this.models;

		const PEDDLER_STATUS = {
			uncategorized: "uncategorized",
			verified: "verified",
			unverified: "unverified",
		};

		const search = { type: types.PEDDLER };

		if (status === PEDDLER_STATUS.uncategorized) {
			search.isActivePeddler = { $exists: false };
		} else {
			if (status === PEDDLER_STATUS.verified) {
				search.isActivePeddler = true;
			} else {
				if (status === PEDDLER_STATUS.unverified) {
					search.isActivePeddler = false;
				}
			}
		}

		return await User.countDocuments(search);
	}

	async countDocs(filter) {
		const { User } = this.models;
		return await User.countDocuments(filter);
	}

	async findSupportAgents() {
		const supportAgents = await this.findUsers({ type: types.ADMIN });

		return supportAgents;
	}

	async findUsers(filter, options) {
		const { User } = this.models;
		const query = User.find(this._toPersistence(filter));

		const { pagination, populate } = options || {};

		const { limit = 0, page = 0 } = pagination || {};

		if (limit) {
			query.limit(+limit);

			query.skip(+limit * +page);
		}

		if (populate && typeof populate === "function") {
			populate(query);
		}

		const docs = await query;

		const results = [];
		if (docs) {
			for (const doc of docs) {
				const entObj = doc.toObject();
				if (doc.avatarImg && doc.avatarImg.uri) {
					entObj.avatarImg = doc.avatarImg.uri;
				}
				if (doc.peddler && doc.peddler.id) {
					entObj.peddler = this._toEntity(entObj.peddler, UserEnt, {
						_id: "id",
					});
					entObj.driverStats = await this.driverOrderStats(entObj.id);
				}
				results.push(this._toEntity(entObj, UserEnt, { _id: "id" }));
			}

			return results;
		}
	}

	async findPeddlersByVStatus(status, { pagination: { limit, page } }) {
		const { User } = this.models;

		const PEDDLER_STATUS = {
			uncategorized: "uncategorized",
			verified: "verified",
			unverified: "unverified",
		};

		const search = { type: types.PEDDLER };

		if (status === PEDDLER_STATUS.uncategorized) {
			search.isActivePeddler = { $exists: false };
		} else {
			if (status === PEDDLER_STATUS.verified) {
				search.isActivePeddler = true;
			} else {
				if (status === PEDDLER_STATUS.unverified) {
					search.isActivePeddler = false;
				}
			}
		}

		const query = User.find(search);

		if (limit) {
			query.limit(+limit);

			query.skip(+limit * +page);
		}

		const docs = await query;

		const results = [];
		if (docs) {
			for (const doc of docs) {
				results.push(
					this._toEntity(doc.toObject(), UserEnt, this._toEntityTransform)
				);
			}

			return results;
		}
	}

	async createUser(userEnt) {
		const { User } = this.models;

		const newUser = this._toPersistence(userEnt, this._toPersistenceTransform);

		const doc = await User.create(newUser);
		if (doc) {
			return this._toEntity(doc.toObject(), UserEnt, this._toEntityTransform);
		}
	}

	async updateUser(filter, updates) {
		const { User } = this.models;

		const doc = await User.findOne(filter);
		if (doc) {
			Object.assign(doc, updates);

			const saved = await doc.save();

			return this._toEntity(saved.toObject(), UserEnt, this._toEntityTransform);
		}
	}

	async updateUserById(userId, userEntUpdate) {
		const { User } = this.models;

		const updates = this._toPersistence(
			userEntUpdate,
			this._toPersistenceTransform
		);

		const doc = await User.findByIdAndUpdate(userId, updates, {
			new: true,
		});

		if (doc) {
			return this._toEntity(doc.toObject(), UserEnt, this._toEntityTransform);
		}
	}

	async rejectPeddler(userId) {
		const { User } = this.models;

		const doc = await User.findByIdAndUpdate(
			userId,
			{ isActivePeddler: false },
			{
				new: true,
			}
		);

		if (doc) {
			return this._toEntity(doc.toObject(), UserEnt, this._toEntityTransform);
		}
	}

	async signup(userId, userEntUpdate) {
		const { User } = this.models;

		const foundUser = await User.findById(userId);

		console.log({ foundUser: foundUser.toObject() });

		foundUser.password = userEntUpdate.password;
		foundUser.userName = userEntUpdate.userName;

		const savedDoc = await foundUser.save();

		if (savedDoc) {
			return this._toEntity(
				savedDoc.toObject(),
				UserEnt,
				this._toEntityTransform
			);
		}
	}

	async searchFor(userEnt) {
		const { User } = this.models;

		let matchEmailOrUserName = {};

		if (userEnt.email) {
			matchEmailOrUserName.$or = [];
			const matchEmail = { email: new RegExp(userEnt.email, "i") };
			matchEmailOrUserName.$or.push(matchEmail);
		}

		if (userEnt.userName) {
			if (!matchEmailOrUserName.$or) {
				matchEmailOrUserName.$or = [];
			}
			const matchUserName = {
				userName: new RegExp(userEnt.userName, "i"),
			};
			matchEmailOrUserName.$or.push(matchUserName);
		}

		const doc = await User.findOne(matchEmailOrUserName);

		if (doc && !isObjectEmpty(matchEmailOrUserName)) {
			const userEnt = this._toEntity(
				doc.toObject(),
				UserEnt,
				this._toEntityTransform
			);

			if (userEnt.isDriver()) {
				userEnt.driverStats = await this.driverOrderStats(userEnt.id);
			}
			return userEnt;
		}
	}

	async driverOrderStats(driverId) {
		const { Order } = this.models;
		const nCancelledOrdersPromise = Order.countDocuments({
			$and: [
				{ driverId: driverId },
				{ deliveryStatus: deliveryStatus.REJECTED },
			],
		});

		const nCompleteOrdersPromise = Order.countDocuments({
			$and: [
				{ driverId: driverId },
				{ deliveryStatus: deliveryStatus.DELIVERED },
			],
		});

		const nAllOrdersPromise = Order.countDocuments({
			driverId: driverId,
		});

		const totalDriverRatingPromise = Order.aggregate([
			{
				$match: {
					driverId: Types.ObjectId(driverId),
				},
			},
			{
				$group: {
					_id: null,
					totalRating: {
						$sum: "$rating",
					},
				},
			},
		]);

		// const

		const [
			nCompleteOrders,
			nCancelledOrders,
			nAllOrders,
			totalDriverRatingArr,
		] = await Promise.all([
			nCompleteOrdersPromise,
			nCancelledOrdersPromise,
			nAllOrdersPromise,
			totalDriverRatingPromise,
		]);

		const percAcceptance = ((+nCompleteOrders || 0) / (+nAllOrders || 1)) * 100;
		const percCancelled = ((+nCancelledOrders || 0) / (+nAllOrders || 1)) * 100;
		const totalOrdersRating = nAllOrders * 5;

		const totalDriverRating =
			totalDriverRatingArr && totalDriverRatingArr.length
				? totalDriverRatingArr[0].totalRating
				: 0;

		const averageRating = (5 * +totalDriverRating) / totalOrdersRating;

		return {
			nCancelled: +nCancelledOrders || 0,
			nComplete: +nCompleteOrders || 0,
			percAcceptance: percAcceptance ? +percAcceptance.toFixed(2) : 0,
			percCancelled: percCancelled ? +percCancelled.toFixed(2) : 0,
			rating: averageRating ? +averageRating.toFixed(1) : 0,
		};
	}

	async searchForProductDrivers({ productId, quantity, geo }, options) {
		const { PeddlerProduct, TruckAndDriver, User } = this.models;

		const { pagination } = options || {};
		const { page, limit } = pagination || {};

		const geoEnt = new GeoEnt(geo);
		const lat = geoEnt.getLat();
		const lon = geoEnt.getLon();

		const products = await PeddlerProduct.aggregate([
			{
				$match: {
					quantity: { $gt: +quantity || 1 },
					productId: Types.ObjectId(productId),
				},
			},
			{
				$lookup: {
					from: "users",
					let: { peddId: "$peddlerId" },
					pipeline: [
						{
							$geoNear: {
								near: { type: "Point", coordinates: [+lon, +lat] },
								key: "latlon",
								distanceField: "dist.calculated",
								spherical: true,
							},
						},
						{
							$match: {
								$expr: {
									$and: [
										{ $eq: ["$peddler", "$$peddId"] },
										{ $eq: ["$presence", presence.ONLINE] },
									],
								},
							},
						},
					],
					as: "drivers",
				},
			},
			{ $skip: +page },
			{ $limit: +limit },
		]);

		const driversList = [];

		if (products) {
			for (const p of products) {
				const { drivers, ...product } = p;
				if (drivers && drivers.length) {
					for (const driver of drivers) {
						//#
						const truckAndDriverQuery = TruckAndDriver.findOne({
							driverId: driver._id,
						})
							.populate({
								path: "truckId",
								populate: {
									path: "productId", // peddlers product loaded on the truck
									populate: {
										path: "productId", // system product
									},
								},
							})
							.sort("-createdAt");

						const peddlerQuery = User.findOne({ _id: driver.peddler });

						const driverStatsQuery = this.driverOrderStats(driver._id);

						const [truckAndDriver, peddler, driverStats] = await Promise.all([
							truckAndDriverQuery,
							peddlerQuery,
							driverStatsQuery,
						]);

						const foundDriverProduct =
							truckAndDriver &&
							truckAndDriver.truckId &&
							truckAndDriver.truckId.productId;

						if (isEqualIds(foundDriverProduct, product)) {
							const driverEnt = this._toEntity(driver, UserEnt, {
								streetAddress: "address",
								_id: "id",
							});

							driverEnt.peddlerCode = peddler.peddlerCode;

							const productTypeEnt = this._toEntity(
								foundDriverProduct.productId,
								ProductEnt,
								{ _id: "id" }
							);

							product.productId = productTypeEnt;

							const peddlerProductEnt = this._toEntity(
								product,
								PeddlerProductEnt,
								{
									_id: "id",
									peddlerId: "peddler",
									productId: "product",
								}
							);

							const peddlerProductRepr = peddlerProductEnt.repr();
							driverEnt.driverStats = driverStats;
							driverEnt.truck = { product: peddlerProductRepr };

							driversList.push(
								Object.assign(
									{},
									{ driver: driverEnt.repr() },
									{ product: peddlerProductRepr }
								)
							);
						}
						//#
					}
				}
			}
		}

		return driversList;
	}
};

function isEqualIds(mongoObj1, mongoObj2) {
	return (
		mongoObj1 &&
		mongoObj1._id &&
		mongoObj1._id.toString &&
		mongoObj2 &&
		mongoObj2._id &&
		mongoObj2._id.toString &&
		mongoObj1._id.toString() == mongoObj2._id.toString()
	);
}
