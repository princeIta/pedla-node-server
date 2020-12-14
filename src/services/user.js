const { UserEnt } = require("../entities/domain");
const { utils, error } = require("../lib");
const { eventEmitter, eventTypes } = require("../events");
const { permissions } = require("../db/mongo/enums/user");

const { Result, generateJwtToken } = utils;
const AppError = error.AppError;
const errorCodes = error.errorCodes;
const errMessages = error.messages;

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
		userEnt.isActivePeddler = true;
		let updatedUser = await userMapper.updateUserById(userEnt.id, userEnt);

		if (updatedUser) {
			eventEmitter.emit(eventTypes.peddlerVerified, updatedUser);

			const objRepr = updatedUser.repr();
			return Result.ok({ ...objRepr });
		}
	}

	async rejectRegisteredPeddler(userDto) {
		const { userMapper } = this.mappers;

		userDto.isActivePeddler = false;

		const userEnt = new UserEnt(userDto);

		userEnt.isActivePeddler = false;

		let updatedUser = await userMapper.rejectPeddler(userEnt.id);

		if (updatedUser) {
			eventEmitter.emit(eventTypes.peddlerRejected, updatedUser);

			const objRepr = updatedUser.repr();
			return Result.ok({ ...objRepr });
		}
	}

	async getPeddlers(status) {
		const { userMapper } = this.mappers;

		const peddlers = await userMapper.findPeddlersByVStatus(status);

		if (peddlers) {
			return Result.ok(peddlers.map((eachUser) => eachUser.repr()));
		} else {
			return Result.ok([]);
		}
	}

	async getProfile(userId) {
		const { userMapper } = this.mappers;

		const user = await userMapper.findUser({ _id: userId });

		if (user) {
			return Result.ok(user.repr());
		} else {
			return Result.ok(null);
		}
	}

	async updateProfile(userDto) {
		const { userMapper } = this.mappers;
		const userEnt = new UserEnt(userDto);

		let updatedUser = await userMapper.updateUserById(userEnt.id, userEnt);

		if (updatedUser) {
			const objRepr = updatedUser.repr();
			return Result.ok({ ...objRepr });
		} else {
			return Result.ok(null);
		}
	}

	async togglePresence(userDto) {
		const { userMapper } = this.mappers;
		const userEnt = new UserEnt(userDto);

		let updatedUser = await userMapper.updateUserById(userEnt.id, userEnt);

		if (updatedUser) {
			const objRepr = updatedUser.repr();
			return Result.ok({ id: objRepr.id, presence: objRepr.presence });
		} else {
			return Result.ok(null);
		}
	}

	async checkUserExistence(userDto) {
		const { userMapper } = this.mappers;
		const userEnt = new UserEnt(userDto);

		let user = await userMapper.searchFor(userEnt);

		if (user) {
			return Result.ok(true);
		} else {
			return Result.ok(false);
		}
	}

	async createDriver(userDto, peddler) {
		const { userMapper } = this.mappers;
		const userEnt = new UserEnt(userDto);

		const checkIsExistingUserQuery = { $or: [] };

		if (userDto.userName) {
			checkIsExistingUserQuery.$or.push({ userName: userDto.userName });
		}

		const isAlreadyExistingUser = await userMapper.findUser(
			checkIsExistingUserQuery
		);

		if (isAlreadyExistingUser) {
			return Result.fail(
				new AppError({
					name: errorCodes.NameConflictError.name,
					message: errMessages.userNameConflict,
					statusCode: errorCodes.NameConflictError.statusCode,
				})
			);
		}

		let newUser = await userMapper.createUser(userEnt);

		if (newUser) {
			eventEmitter.emit(
				eventTypes.driverCreated,
				Object.assign(newUser, {
					password: userDto.password,
					peddler: {
						firstName: peddler.firstName,
						lastName: peddler.lastName,
						id: peddler.Id,
						phoneNumber: peddler.phoneNumber,
					},
				})
			);

			return Result.ok({ success: true });
		} else {
			return Result.ok(null);
		}
	}

	async updateDriver(userDto, peddler) {
		const { userMapper } = this.mappers;
		const userEnt = new UserEnt(userDto);

		const isAlreadyExistingUser = await userMapper.findUser({
			userName: userEnt.userName,
		});

		if (isAlreadyExistingUser) {
			return Result.fail(
				new AppError({
					name: errorCodes.NameConflictError.name,
					message: errMessages.userNameConflict,
					statusCode: errorCodes.NameConflictError.statusCode,
				})
			);
		}

		let updatedUser = await userMapper.updateUserById(userEnt.id, userEnt);

		if (updatedUser) {
			eventEmitter.emit(
				eventTypes.driverUpdated,
				Object.assign(updatedUser, {
					peddler: {
						firstName: peddler.firstName,
						lastName: peddler.lastName,
						id: peddler.Id,
						email: peddler.email,
						phoneNumber: peddler.phoneNumber,
					},
				})
			);

			const objRepr = updatedUser.repr();
			return Result.ok({ ...objRepr });
		} else {
			return Result.ok(null);
		}
	}

	async findDrivers(userDto) {
		const { userMapper } = this.mappers;

		const foundUsers = await userMapper.findUsers(new UserEnt(userDto));

		if (foundUsers) {
			return Result.ok(foundUsers.map((eachUser) => eachUser.repr()));
		} else {
			return Result.ok([]);
		}
	}

	async assignTrucksToDriver() {}
};
