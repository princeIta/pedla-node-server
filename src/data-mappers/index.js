const dbModels = require("../db/mongo/models");

const UserMapper = require("./user");
const SecretMapper = require("./secret");
const ProductMapper = require("./product");
const PeddlerProductMapper = require("./peddler-product");
const GeoMapper = require("./geo-location");
const TruckMapper = require("./truck");
const OrderMapper = require("./order");
const PushDeviceMapper = require("./push-device");
const BlogPostMapper = require("./blog-post");
const PaymentMapper = require("./payment");
const MessageMapper = require("./message");
const ActivityMapper = require("./activity");

module.exports = {
	userMapper: new UserMapper(dbModels),
	secretMapper: new SecretMapper(dbModels),
	productMapper: new ProductMapper(dbModels),
	peddlerProductMapper: new PeddlerProductMapper(dbModels),
	geoMapper: new GeoMapper(dbModels),
	truckMapper: new TruckMapper(dbModels),
	orderMapper: new OrderMapper(dbModels),
	pushDeviceMapper: new PushDeviceMapper(dbModels),
	blogPostMapper: new BlogPostMapper(dbModels),
	paymentMapper: new PaymentMapper(dbModels),
	messageMapper: new MessageMapper(dbModels),
	activityMapper: new ActivityMapper(dbModels),
};
