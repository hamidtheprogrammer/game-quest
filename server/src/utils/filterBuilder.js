"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterBuilder = void 0;
var filterBuilder = function (filter) {
    var filters = {};
    if (filter.genre) {
        var genreOpts = filter.genre.split("_");
        filters.genre = { $all: genreOpts };
    }
    if (filter.age) {
        filters.age = { $gte: filter.age };
    }
    if (filter.minPrice !== undefined || filter.maxPrice !== undefined) {
        filters.price = {};
        if (filter.minPrice !== undefined) {
            filters.price.$gte = filter.minPrice;
        }
        if (filter.maxPrice !== undefined) {
            filters.price.$lte = filter.maxPrice;
        }
    }
    return filters;
};
exports.filterBuilder = filterBuilder;
