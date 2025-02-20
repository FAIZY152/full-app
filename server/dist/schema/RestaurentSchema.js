"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = exports.createRestaurantSchema = void 0;
const zod_1 = require("zod");
exports.createRestaurantSchema = zod_1.z.object({
    resturentName: zod_1.z
        .string()
        .min(3, "Restaurant name must be at least 3 characters long"),
    city: zod_1.z.string().min(2, "City name must be at least 2 characters long"),
    country: zod_1.z.string().min(2, "Country name must be at least 2 characters long"),
    deliveryPrice: zod_1.z.string().min(0, "Delivery price must be a positive number"),
    deliveryTime: zod_1.z.string().min(1, "Delivery time is required"),
    cusines: zod_1.z.string(),
});
const validateRequest = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next(); // ✅ Proceed if validation passes
        }
        catch (error) {
            return res.status(400).json({ success: false, errors: error.errors });
        }
    };
};
exports.validateRequest = validateRequest;
//# sourceMappingURL=RestaurentSchema.js.map