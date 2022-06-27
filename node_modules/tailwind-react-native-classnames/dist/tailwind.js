"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var helpers_1 = require("./helpers");
function create(styles) {
    var getStyle = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        var style = {};
        var _a = helpers_1.parseInputs(inputs), classNames = _a[0], userRnStyle = _a[1];
        var letterSpacingClass = null;
        classNames.forEach(function (className) {
            if (isSupportedFontVariant(className)) {
                addFontVariant(className, style);
            }
            else if (isBoxShadowClass(className)) {
                addBoxShadow(className, style);
            }
            else if (isLetterSpacingClass(className)) {
                letterSpacingClass = className;
            }
            else if (styles[className]) {
                style = __assign(__assign({}, style), styles[className]);
            }
            else if (shouldWarn()) {
                console.warn("`" + className + "` is not a valid Tailwind class name");
            }
        });
        if (letterSpacingClass) {
            addLetterSpacing(letterSpacingClass, style, styles);
        }
        return __assign(__assign({}, replaceVariables(style)), userRnStyle);
    };
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    var tailwind = function (strings) {
        var values = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            values[_i - 1] = arguments[_i];
        }
        var str = "";
        strings.forEach(function (string, i) {
            str += string + (values[i] || "");
        });
        return getStyle(str);
    };
    tailwind.style = getStyle;
    tailwind.color = function (color) {
        var prefixed = color
            .split(/\s+/)
            .map(function (util) { return "bg-" + util; })
            .join(" ");
        var style = getStyle(prefixed);
        return typeof style.backgroundColor === "string" ? style.backgroundColor : undefined;
    };
    return tailwind;
}
exports["default"] = create;
function replaceVariables(styles) {
    var merged = {};
    for (var _i = 0, _a = Object.entries(styles); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        if (typeof value === "string" && value.includes("var(--")) {
            merged[key] = value.replace(/var\(([a-z-]+)\)/, function (_, varName) { return styles[varName]; });
        }
        else if (!key.startsWith("--")) {
            merged[key] = value;
        }
    }
    return merged;
}
function isLetterSpacingClass(className) {
    return !!className.match(/^tracking-(tighter|tight|normal|wide|wider|widest)$/);
}
function isSupportedFontVariant(className) {
    return !!className.match(/^(oldstyle|lining|tabular|proportional)-nums$/);
}
function addLetterSpacing(letterSpacingClass, style, styles) {
    var _a;
    if ("fontSize" in style === false) {
        warn("`tracking-<x>` classes require font-size to be set");
        return;
    }
    var fontSize = style.fontSize;
    if (typeof fontSize !== "number" || Number.isNaN(fontSize)) {
        // should never happen
        return;
    }
    var letterSpacingValue = (_a = styles[letterSpacingClass]) === null || _a === void 0 ? void 0 : _a.letterSpacing;
    if (typeof letterSpacingValue !== "string") {
        // should never happen
        return;
    }
    var emVal = Number.parseFloat(letterSpacingValue);
    var pxVal = emVal * fontSize;
    style.letterSpacing = Math.round((pxVal + Number.EPSILON) * 100) / 100;
}
function warn(msg) {
    if (!shouldWarn()) {
        return;
    }
    console.warn(msg);
}
function shouldWarn() {
    var _a;
    return ((_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.JEST_WORKER_ID) === undefined;
}
function addFontVariant(variant, style) {
    if (Array.isArray(style.fontVariant)) {
        style.fontVariant.push(variant);
    }
    else {
        style.fontVariant = [variant];
    }
}
function isBoxShadowClass(className) {
    return className in boxShadowMap;
}
function addBoxShadow(className, style) {
    if (isBoxShadowClass(className)) {
        var shadow = boxShadowMap[className];
        style.shadowOffset = { width: 1, height: 1 };
        style.shadowColor = "#000";
        style.shadowOpacity = shadow.opacity;
        style.shadowRadius = shadow.radius;
        style.elevation = shadow.elevation;
        if (className === "shadow-none") {
            style.shadowOffset = { width: 0, height: 0 };
        }
    }
}
var boxShadowMap = {
    'shadow-sm': {
        radius: 1,
        opacity: 0.025,
        elevation: 1
    },
    shadow: {
        radius: 1,
        opacity: 0.075,
        elevation: 2
    },
    'shadow-md': {
        radius: 3,
        opacity: 0.125,
        elevation: 3
    },
    'shadow-lg': {
        radius: 8,
        opacity: 0.15,
        elevation: 8
    },
    'shadow-xl': {
        radius: 20,
        opacity: 0.19,
        elevation: 12
    },
    'shadow-2xl': {
        radius: 30,
        opacity: 0.25,
        elevation: 16
    },
    'shadow-none': {
        radius: 0,
        opacity: 0.0,
        elevation: 0
    }
};
