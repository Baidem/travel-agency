"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var travel_item_model_1 = require("../models/travel-item.model");
var travelItemService = /** @class */ (function () {
    function travelItemService() {
        this.travelItems = travel_item_model_1.TravelItem.generateFakeData();
    }
    travelItemService.prototype.getAll = function () {
        return this.travelItems;
    };
    travelItemService.prototype.getAllById = function (id) {
        return this.travelItems.find(function (tI) { return tI.id === id; });
    };
    travelItemService.prototype.insert = function (newItem) {
        this.travelItems.push(newItem);
    };
    travelItemService.prototype.update = function (itemEdited) {
        var index = this.travelItems.findIndex(function (tI) { return tI.id === itemEdited.id; });
        if (index < 0)
            throw 'L\'id ne correspond à aucun item';
        this.travelItems[index] = itemEdited;
    };
    travelItemService.prototype.delete = function (id) {
        this.travelItems = this.travelItems.filter(function (tI) { return tI.id !== id; });
    };
    return travelItemService;
}());
// export singleton
exports.default = new travelItemService();
