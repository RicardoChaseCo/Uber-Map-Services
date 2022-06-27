"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
exports.parseInputs = void 0;
var react_native_1 = require("react-native");
function parseInputs(inputs) {
    var classNames = [];
    var styles = {};
    inputs.forEach(function (input) {
        if (typeof input === "string") {
            classNames = __spreadArray(__spreadArray([], classNames), split(input));
        }
        else if (Array.isArray(input)) {
            classNames = __spreadArray(__spreadArray([], classNames), input.flatMap(split));
        }
        else if (typeof input === "object" && input !== null) {
            for (var _i = 0, _a = Object.entries(input); _i < _a.length; _i++) {
                var _b = _a[_i], key = _b[0], value = _b[1];
                if (typeof value === "boolean") {
                    classNames = __spreadArray(__spreadArray([], classNames), (value ? split(key) : []));
                }
                else {
                    styles[key] = value;
                }
            }
        }
    });
    return [classNames.map(accountForPlatform).filter(Boolean).filter(unique), styles];
}
exports.parseInputs = parseInputs;
function split(str) {
    return str.trim().split(/\s+/);
}
function unique(className, index, classes) {
    return classes.indexOf(className) === index;
}
function accountForPlatform(className) {
    return className.replace(/^(ios|android|windows|macos|web):(.*)/, function (_, os, className) {
        return react_native_1.Platform.OS === os ? className : "";
    });
}
