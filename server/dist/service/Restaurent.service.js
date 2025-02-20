"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSingleResturentService = exports.GetOrderService = exports.createRestaurantService = void 0;
const ImageUpload_1 = __importDefault(require("../helper/ImageUpload"));
const OrderSchema_1 = __importDefault(require("../models/OrderSchema"));
const ResturentSchema_1 = __importDefault(require("../models/ResturentSchema"));
const createRestaurantService = (userId, resturentName, city, country, deliveryPrice, deliveryTime, cusines, file) => __awaiter(void 0, void 0, void 0, function* () {
    if (!file) {
        throw new Error("Restaurant image is required");
    }
    // Check if user already has a restaurant
    const existingRestaurant = yield ResturentSchema_1.default.findOne({ user: userId });
    if (existingRestaurant) {
        throw new Error("Restaurant already exists for this user");
    }
    // Convert cuisines from comma-separated string to an array
    const cuisinesArray = cusines.split(",").map((cuisine) => cuisine.trim());
    // Upload image to Cloudinary
    const imageUrl = yield (0, ImageUpload_1.default)(file);
    // Create restaurant entry in database
    const restaurant = yield ResturentSchema_1.default.create({
        user: userId,
        resturentName,
        city,
        country,
        deliveryTime,
        cusines: cuisinesArray,
        deliveryPrice,
        imageFile: imageUrl,
    });
    return restaurant;
});
exports.createRestaurantService = createRestaurantService;
const GetOrderService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const resturent = yield ResturentSchema_1.default.findOne({ user: userId });
    if (!resturent)
        throw new Error("No Restaurant Found");
    return yield OrderSchema_1.default.find({ resturent: resturent._id })
        .populate("user")
        .populate("resturent");
});
exports.GetOrderService = GetOrderService;
const GetSingleResturentService = (restaurantId) => __awaiter(void 0, void 0, void 0, function* () {
    const resturent = yield ResturentSchema_1.default.findById(restaurantId).populate({
        path: "menu",
        options: { createdAt: -1 },
    });
    if (!resturent)
        throw new Error("Restaurant Not Found");
    return resturent;
});
exports.GetSingleResturentService = GetSingleResturentService;
//# sourceMappingURL=Restaurent.service.js.map