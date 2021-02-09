const BaseMapper = require("./base");
const { OFFLINE, ONLINE } = require("../db/mongo/enums/user/presence");

module.exports = class ActivityMapper extends BaseMapper {
	constructor(models) {
		super();
		this.models = models;
	}

	resetUserPresence(user) {
		const { User } = this.models;

		User.findByIdAndUpdate(user.id, {
			presence: ONLINE,
			lastActive: new Date(),
		}).then((doc, err) => {
			if (err) {
				throw err;
			}

			if (doc) {
				console.log("update successful");
			}
		});
	}

	setInactiveUsersOffline(inactiveTTL) {
		const { User } = this.models;

		const lastActive = Date.now() - inactiveTTL;

		User.updateMany(
			{ presence: ONLINE, lastActive: { $lt: new Date(lastActive) } },
			{ presence: OFFLINE }
		).then((doc, err) => {
			if (err) {
				throw err;
			}

			if (doc) {
				console.log("update successful");
			}
		});
	}
};
