const BaseController = require("./base");
const { UserDto } = require("../../entities/dtos");
const { user: userService } = require("../../services");
const { types: userTypes, presence } = require("../../db/mongo/enums").user;

module.exports = class Otp extends BaseController {
	constructor() {
		super();
		this._bindAll(this);
	}

	async createBuyerProfile(req, res, next) {
		const {
			firstName,
			lastName,
			password,
			email,
			address,
			phoneNumber,
		} = req.body;

		const { user } = req._App;

		const userDto = new UserDto();
		userDto.address = address;
		userDto.firstName = firstName;
		userDto.lastName = lastName;
		userDto.password = password;
		userDto.email = email;
		userDto.phoneNumber = phoneNumber;
		userDto.type = userTypes.BUYER;
		userDto.id = user.id;

		const result = await userService.updateUser(userDto);

		return this.response(result, res);
	}

	async verifyRegisteredPeddler(req, res, next) {
		const userDto = new UserDto();

		const { peddlerId } = req.params;

		userDto.id = peddlerId;

		const result = await userService.verifyRegisteredPeddler(userDto);

		return this.response(result, res);
	}

	async updateProfile(req, res, next) {
		const userDto = new UserDto();

		const { user } = req._App;
		const { firstName, lastName, address, phoneNumber } = req.body;

		userDto.address = address;
		userDto.firstName = firstName;
		userDto.lastName = lastName;
		userDto.phoneNumber = phoneNumber;
		userDto.id = user.id;

		const result = await userService.updateProfile(userDto);

		return this.response(result, res);
	}

	async setOnline(req, res, next) {
		const userDto = new UserDto();

		const { user } = req._App;

		userDto.id = user.id;
		userDto.presence = presence.ONLINE;

		const result = await userService.togglePresence(userDto);

		return this.response(result, res);
	}

	async setOffline(req, res, next) {
		const userDto = new UserDto();

		const { user } = req._App;

		userDto.id = user.id;
		userDto.presence = presence.OFFLINE;

		const result = await userService.togglePresence(userDto);
		return this.response(result, res);
	}

	async getOnlinePeddlers(req, res, next) {}
};