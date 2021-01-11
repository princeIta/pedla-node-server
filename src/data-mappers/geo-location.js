const BaseMapper = require("./base");
const { GeoEnt, UserEnt } = require("../entities/domain");

module.exports = class GeoMapper extends BaseMapper {
	constructor(models) {
		super();
		this.models = models;
	}

	async updateGeoLocation(geoId, geoEnt) {
		const { User } = this.models;

		const updates = this._toPersistence(geoEnt, this._toPersistenceTransform);

		const doc = await User.findByIdAndUpdate(geoId, updates, {
			new: true,
		});

		if (doc) {
			return this._toEntity(doc.toObject(), GeoEnt, this._toEntityTransform);
		}
	}

	async findUsersByGeoLocation(filter, limit) {
		const { User } = this.models;
		const query = User.find(filter).populate("peddler");

		if (limit && +limit) {
			query.limit(+limit);
		}

		const docs = await query;

		const results = [];
		if (docs) {
			for (const doc of docs) {
				const entObj = doc.toObject();
				if (doc.avatarImg && doc.avatarImg.uri) {
					entObj.avatarImg = doc.avatarImg.uri;
				}
				results.push(this._toEntity(entObj, UserEnt, { _id: "id" }));
			}

			return results;
		}
	}
};
