const { utils } = require("../lib");
const { eventEmitter, eventTypes } = require("../events");

const { Result } = utils;

module.exports = class Message {
	constructor({ mappers }) {
		this.mappers = mappers;
	}

	async send(sender, to, message) {
		const { messageMapper } = this.mappers;

		const created = await messageMapper.create({
			from: sender.id,
			to,
			message,
		});

		if (created) {
		}

		return Result.ok(created.repr());
	}

	async getRead(user, options) {
		const { messageMapper } = this.mappers;

		const { pagination } = options || {};
		const { limit, page } = pagination || {};

		const totalReadMessages = await messageMapper.countRead(user.id);

		const totalPages = limit ? Math.ceil(totalReadMessages / +limit) : 1;

		const readMessages = await messageMapper.getReadMessages(user.id, {
			pagination: { limit: +limit || 30, page: page ? +page - 1 : 0 },
		});

		if (readMessages) {
			const results = [];

			for (const eachMessage of readMessages) {
				results.push(eachMessage.repr());
			}

			return Result.ok({
				data: results,
				pagination: {
					currentPage: +page || 1,
					totalPages,
					totalDocs: totalReadMessages,
				},
			});
		} else {
			return Result.ok(null);
		}
	}

	async getUnread(user, options) {
		const { messageMapper } = this.mappers;

		const { pagination } = options || {};
		const { limit = 30, page } = pagination || {};

		const totalUnreadMessages = await messageMapper.countUnread(user.id);

		const totalPages = limit ? Math.ceil(totalUnreadMessages / +limit) : 1;

		const unreadMessages = await messageMapper.getUnreadMessages(user.id, {
			pagination: { limit: +limit, page: page ? +page - 1 : 0 },
		});

		if (unreadMessages) {
			const results = [];

			for (const eachMessage of unreadMessages) {
				results.push(eachMessage.repr());
			}

			return Result.ok({
				data: results,
				pagination: {
					currentPage: +page || 1,
					totalPages,
					totalDocs: totalUnreadMessages,
				},
			});
		} else {
			return Result.ok(null);
		}
	}

	async read(messageId) {
		const { messageMapper } = this.mappers;

		const read = await messageMapper.read(messageId);

		if (read) {
			return Result.ok(read.repr());
		} else {
			return Result.ok(null);
		}
	}
};
