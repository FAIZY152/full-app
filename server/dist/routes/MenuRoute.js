"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const IsAuthenticated_1 = __importDefault(require("../middlewares/IsAuthenticated"));
const multer_1 = __importDefault(require("../middlewares/multer"));
const MenuController_1 = require("../controller/MenuController");
const menuRoute = express_1.default.Router();
menuRoute.get("/", (req, res) => {
    res.send("Menu Route is working");
});
menuRoute
    .route("/create-menu")
    .post(IsAuthenticated_1.default, multer_1.default.single("image"), MenuController_1.addMenu);
menuRoute
    .route("/edit-menu/:id")
    .put(IsAuthenticated_1.default, multer_1.default.single("image"), MenuController_1.editMenu);
menuRoute
    .route("/delete-menu/:restaurantId/:menuId")
    .delete(IsAuthenticated_1.default, MenuController_1.deleteMenu);
menuRoute.route("/get-menus").get(IsAuthenticated_1.default, MenuController_1.getMenus);
exports.default = menuRoute;
//# sourceMappingURL=MenuRoute.js.map