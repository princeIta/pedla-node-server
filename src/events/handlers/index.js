const createAndSendOtp = require("./create-and-send-otp");
const alertOpsTeam = require("./alert-ops-team");
const sendPeddlerCode = require("./send-peddler-code");
const notifyPeddlerRejection = require("./notify-peddler-rejection");

module.exports = {
	createAndSendOtp,
	alertOpsTeam,
	sendPeddlerCode,
	notifyPeddlerRejection,
};
