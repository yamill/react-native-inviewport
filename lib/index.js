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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var react_native_1 = require("react-native");
var defaultConstraints = {
    aboveScreen: true,
    belowScreen: true
};
var isInWindow = function (viewSize, constraints) {
    var window = react_native_1.Dimensions.get('window');
    var isVisible = viewSize.bottom != 0 &&
        (constraints.aboveScreen && viewSize.top) >= 0 &&
        (constraints.belowScreen && viewSize.bottom <= window.height) &&
        viewSize.width > 0 &&
        viewSize.width <= window.width;
    return isVisible;
};
function InViewPort(props) {
    var _a, _b;
    var disabled = props.disabled, interval = props.interval, viewProps = __rest(props, ["disabled", "interval"]);
    var constraints = react_1.useMemo(function () { var _a; return (_a = props.constraints) !== null && _a !== void 0 ? _a : defaultConstraints; }, [(_a = props.constraints) === null || _a === void 0 ? void 0 : _a.aboveScreen, (_b = props.constraints) === null || _b === void 0 ? void 0 : _b.belowScreen]);
    var _c = react_1.useState({ top: 0, bottom: 0, width: 0 }), rect = _c[0], setRect = _c[1];
    var viewRef = react_1.useRef(null);
    var wasVisible = react_1.useRef(null);
    react_1.useEffect(function () {
        if (props.disabled)
            return;
        var timer = setInterval(function () {
            if (!viewRef.current)
                return;
            viewRef.current.measure(function (x, y, width, height, pageX, pageY) {
                var _a;
                var rect = {
                    top: pageY,
                    bottom: pageY + height,
                    width: pageX + width
                };
                setRect(rect);
                var visible = isInWindow(rect, constraints);
                if (visible !== wasVisible.current) {
                    (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, visible);
                    wasVisible.current = visible;
                }
            });
        }, props.interval || 100);
        return function () {
            wasVisible.current = null;
            clearInterval(timer);
        };
    }, [props.interval, props.disabled, constraints]);
    return React.createElement(react_native_1.View, __assign({ ref: viewRef, collapsable: false }, viewProps), props.children);
}
exports.default = InViewPort;
