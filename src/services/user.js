const { UserEnt } = require("../entities/domain");
const { utils } = require("../lib");
const { eventEmitter, eventTypes } = require("../events");
const { permissions } = require("../db/mongo/enums/user");

const { Result, generateJwtToken } = utils;

module.exports = class User {
	constructor({ mappers }) {
		this.mappers = mappers;
	}

	async updateUser(userDto) {
		const { userMapper } = this.mappers;
		const userEnt = new UserEnt(userDto);

		let updatedUser = await userMapper.updateUserById(userEnt.id, userEnt);

		if (updatedUser) {
			eventEmitter.emit(eventTypes.userProfileCreated, updatedUser);

			const objRepr = updatedUser.repr();
			const token = generateJwtToken(objRepr);
			return Result.ok({ ...objRepr, token });
		}
	}

	async verifyRegisteredPeddler(userDto) {
		const { userMapper } = this.mappers;
		const userEnt = new UserEnt(userDto);

		userEnt.permission = permissions.PERM001;
		let updatedUser = await userMapper.updateUserById(userEnt.id, userEnt);

		if (updatedUser) {
			eventEmitter.emit(eventTypes.peddlerVerified, updatedUser);

			const objRepr = updatedUser.repr();
			return Result.ok({ ...objRepr });
		}
	}

	async updateProfile(userDto) {
		const { userMapper } = this.mappers;
		const userEnt = new UserEnt(userDto);

		let updatedUser = await userMapper.updateUserById(userEnt.id, userEnt);

		if (updatedUser) {
			const objRepr = updatedUser.repr();
			return Result.ok({ ...objRepr });
		}
	}

	async togglePresence(userDto) {
		const { userMapper } = this.mappers;
		const userEnt = new UserEnt(userDto);

		let updatedUser = await userMapper.updateUserById(userEnt.id, userEnt);

		if (updatedUser) {
			const objRepr = updatedUser.repr();
			return Result.ok({ id: objRepr.id, presence: objRepr.presence });
		}
	}
};