#!/usr/bin/env node
"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var fs = __importStar(require("fs"));
var x_chalk_1 = require("x-chalk");
var postcss_1 = __importDefault(require("postcss"));
var css_1 = require("css");
var tailwindcss_1 = __importDefault(require("tailwindcss"));
var css_to_react_native_1 = __importDefault(require("css-to-react-native"));
var font_family_1 = require("./font-family");
x_chalk_1.magenta("\nStarting generation of tailwind styles...");
// @ts-ignore
postcss_1["default"]([tailwindcss_1["default"]])
    .process("@tailwind components;\n@tailwind utilities;", { from: undefined })
    .then(function (_a) {
    var css = _a.css;
    var styles = toStyleObject(css);
    var path = process.cwd() + "/tw-rn-styles.json";
    var exists = fs.existsSync(path);
    fs.writeFileSync(path, JSON.stringify(styles, null, 2));
    x_chalk_1.log(x_chalk_1.c(templateObject_1 || (templateObject_1 = __makeTemplateObject(["{green Success!} {gray Styles file generated at} {cyan ", "}"], ["{green Success!} {gray Styles file generated at} {cyan ", "}"])), path));
    x_chalk_1.gray("Commit this file and use it to create a customized version of the tailwind function\n");
    !exists && x_chalk_1.log(SAMPLE_CODE);
})["catch"](function (err) {
    x_chalk_1.red("Error generating tailwind styles file\n");
    console.error(err);
});
var SAMPLE_CODE = "\n```js\nimport { create } from 'tailwind-react-native-classnames';\nimport styles from './path/to/your/tw-rn-styles.json';\n\nconst customTailwind = create(styles);\nexport default customTailwind;\n```\n";
function toStyleObject(css) {
    var _a, _b;
    var stylesheet = css_1.parse(css).stylesheet;
    if (!stylesheet) {
        x_chalk_1.red("Failed to parse CSS");
        process.exit(1);
    }
    var styles = {};
    for (var _i = 0, _c = stylesheet.rules; _i < _c.length; _i++) {
        var rule = _c[_i];
        if (rule.type === "rule" && "selectors" in rule) {
            for (var _d = 0, _e = rule.selectors || []; _d < _e.length; _d++) {
                var selector = _e[_d];
                var utility = selector.replace(/^\./, "").replace("\\", "");
                if (font_family_1.isFontFamilyRule(rule)) {
                    var fontFamily = font_family_1.fontFamilyStyle((_b = (_a = rule.declarations) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.value);
                    if (fontFamily) {
                        styles[utility] = fontFamily;
                    }
                }
                else if (isUtilitySupported(utility, rule)) {
                    try {
                        styles[utility] = getStyles(rule);
                    }
                    catch (_f) {
                        // ¯\_(ツ)_/¯
                    }
                }
            }
        }
    }
    // Additional styles that we're not able to parse correctly automatically
    styles.underline = { textDecorationLine: "underline" };
    styles["line-through"] = { textDecorationLine: "line-through" };
    styles["no-underline"] = { textDecorationLine: "none" };
    return styles;
}
function getStyles(rule) {
    var declarations = (rule.declarations || []);
    var styles = declarations
        .filter(function (_a) {
        var property = _a.property, _b = _a.value, value = _b === void 0 ? "" : _b;
        if (property === "line-height" && !value.endsWith("rem")) {
            return false;
        }
        return true;
    })
        .map(function (_a) {
        var _b = _a.property, property = _b === void 0 ? "" : _b, _c = _a.value, value = _c === void 0 ? "" : _c;
        if (value.endsWith("rem")) {
            return [property, remToPx(value)];
        }
        return [property, value];
    });
    return css_to_react_native_1["default"](styles);
}
function isUtilitySupported(utility, rule) {
    // Skip utilities with pseudo-selectors
    if (utility.includes(":")) {
        return false;
    }
    // Skip unsupported utilities
    if ([
        "clearfix",
        "antialiased",
        "subpixel-antialiased",
        "sr-only",
        "not-sr-only",
    ].includes(utility) ||
        /^(space|placeholder|from|via|to|divide)-/.test(utility) ||
        /^-?(scale|rotate|translate|skew)-/.test(utility)) {
        return false;
    }
    // Skip utilities with unsupported properties
    for (var _i = 0, _a = (rule.declarations || []); _i < _a.length; _i++) {
        var _b = _a[_i], property = _b.property, _c = _b.value, value = _c === void 0 ? "" : _c;
        if (property && unsupportedProperties.has(property)) {
            return false;
        }
        if (property === null || property === void 0 ? void 0 : property.includes("backdrop")) {
            return false;
        }
        if (property === "display" && !["flex", "none"].includes(value)) {
            return false;
        }
        if (property === "overflow" && !["visible", "hidden"].includes(value)) {
            return false;
        }
        if (property === "position" && !["absolute", "relative"].includes(value)) {
            return false;
        }
        if (property === "line-height" && !value.endsWith("rem")) {
            return false;
        }
        if (property === "border-color" && value === "inherit") {
            return false;
        }
        if (value === "auto" && (property === null || property === void 0 ? void 0 : property.match(/^margin(-(top|bottom|left|right))?$/))) {
            return true;
        }
        if (value === "auto" ||
            value.endsWith("vw") ||
            value.endsWith("vh") ||
            value === "currentColor") {
            return false;
        }
    }
    return true;
}
var unsupportedProperties = new Set([
    "box-sizing",
    "float",
    "clear",
    "object-fit",
    "object-position",
    "overflow-x",
    "overflow-y",
    "-webkit-overflow-scrolling",
    "overscroll-behavior",
    "overscroll-behavior-x",
    "overscroll-behavior-y",
    "visibility",
    "order",
    "grid-template-columns",
    "grid-column",
    "grid-column-start",
    "grid-column-end",
    "grid-template-rows",
    "grid-row",
    "grid-row-start",
    "grid-row-end",
    "grid-auto-flow",
    "grid-auto-columns",
    "grid-auto-rows",
    "gap",
    "column-gap",
    "row-gap",
    "justify-items",
    "justify-self",
    "place-content",
    "place-items",
    "place-self",
    "list-style-type",
    "list-style-position",
    "text-decoration",
    "vertical-align",
    "white-space",
    "word-break",
    "background-attachment",
    "background-clip",
    "background-position",
    "background-repeat",
    "background-size",
    "background-image",
    "border-collapse",
    "table-layout",
    "box-shadow",
    "transition-property",
    "transition-duration",
    "transition-timing-function",
    "transition-delay",
    "animation",
    "transform",
    "transform-origin",
    "appearance",
    "cursor",
    "outline",
    "resize",
    "user-select",
    "fill",
    "stroke",
    "stroke-width",
]);
function remToPx(value) {
    var parsed = Number.parseFloat(value);
    if (Number.isNaN(parsed)) {
        x_chalk_1.yellow("Warning: invalid rem->px conversion from \"" + value + "\"");
        return "0px";
    }
    return parsed * 16 + "px";
}
var templateObject_1;
