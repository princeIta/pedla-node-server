const createAndSendOtp = require("./create-and-send-otp");
const alertOpsTeam = require("./alert-ops-team");
const sendPeddlerCode = require("./send-peddler-code");
const notifyPeddlerRejection = require("./notify-peddler-rejection");
const sendDriverInfo = require("./send-driver-info");
const updatePushDevice = require("./update-push-device");
const sendPushNotification = require("./send-notification");

module.exports = {
	createAndSendOtp,
	alertOpsTeam,
	sendPeddlerCode,
	notifyPeddlerRejection,
	sendDriverInfo,
	updatePushDevice,
	sendPushNotification,
};
