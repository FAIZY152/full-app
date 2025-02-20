"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resturentRoute = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("../middlewares/multer"));
const ResturentController_1 = require("../controller/ResturentController");
const IsAuthenticated_1 = __importStar(require("../middlewares/IsAuthenticated"));
exports.resturentRoute = express_1.default.Router();
// Resturents
exports.resturentRoute.get("/", (req, res) => {
    res.send("Hello Resturent");
});
exports.resturentRoute.post("/create-resturent", IsAuthenticated_1.IsAdmin, multer_1.default.single("image"), ResturentController_1.CreateResturent);
exports.resturentRoute.get("/get-resturent", IsAuthenticated_1.default, ResturentController_1.GetResturent);
exports.resturentRoute.get("/resturents/:resturenId", IsAuthenticated_1.default, ResturentController_1.GetSingleResturent);
exports.resturentRoute.put("/update-resturent", IsAuthenticated_1.IsAdmin, multer_1.default.single("image"), ResturentController_1.UpdateResturent);
// order
exports.resturentRoute.get("/order", IsAuthenticated_1.default, ResturentController_1.GetOrders);
exports.resturentRoute.put("/order/status/:orderId", IsAuthenticated_1.default, ResturentController_1.updateStatus);
// Route to search by country and city
exports.resturentRoute.get("/search/location", ResturentController_1.searchByLocation);
// Route to search by restaurant name in country/city
exports.resturentRoute.get("/search/searchByname", ResturentController_1.searchByCityOrRestaurantName);
// Route to search/filter by cuisine
exports.resturentRoute.post("/search/cuisines", ResturentController_1.searchByCuisines);
//# sourceMappingURL=ResturentRoutes.js.map