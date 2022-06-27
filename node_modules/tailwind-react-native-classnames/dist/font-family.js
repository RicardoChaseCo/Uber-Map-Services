"use strict";
exports.__esModule = true;
exports.fontFamilyStyle = exports.isFontFamilyRule = void 0;
function isFontFamilyRule(rule) {
    var _a, _b, _c;
    if (((_b = (_a = rule.selectors) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.startsWith(".font-")) !== true) {
        return false;
    }
    var firstDecl = (_c = rule.declarations) === null || _c === void 0 ? void 0 : _c[0];
    if (!firstDecl || firstDecl.type !== "declaration") {
        return false;
    }
    // @ts-ignore
    return firstDecl.property === "font-family";
}
exports.isFontFamilyRule = isFontFamilyRule;
function fontFamilyStyle(declarationValue) {
    var _a;
    if (typeof declarationValue !== "string") {
        return null;
    }
    var families = declarationValue;
    var family;
    if (families[0] === "\"") {
        family = families.replace(/^"/, "").replace(/",.*/, "");
    }
    else {
        family = (_a = families.split(",").map(function (s) { return s.trim(); })[0]) !== null && _a !== void 0 ? _a : "";
    }
    return family ? { fontFamily: family } : null;
}
exports.fontFamilyStyle = fontFamilyStyle;
