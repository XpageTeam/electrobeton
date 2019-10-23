"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var core_1 = require("./core");
var Element_1 = require("./Element");
var EventListener = /** @class */ (function (_super) {
    __extends(EventListener, _super);
    function EventListener() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
    * Метод для подписки на событие
    * @param event: string - название js события
    * @param callback: function
    * @param options: object
    * @retrun EventListener
    */
    EventListener.prototype.add = function (event, callback, options) {
        core_1["default"].each(this.els, function (el, i) {
            document.body.addEventListener(event, function (e) {
                var target = e.target;
                if (el.contains(target)
                    || el == target)
                    callback(el, e, i);
            }, options);
        });
        return this;
    };
    /**
    * Метод для вызова события
    * @param event: string - название js события
    * @retrun EventListener
    */
    EventListener.prototype.trigger = function (event) {
        core_1["default"].each(this.els, function (el) {
            var evt = document.createEvent("HTMLEvents");
            evt.initEvent(event, false, true);
            el.dispatchEvent(evt);
        });
        return this;
    };
    return EventListener;
}(Element_1["default"]));
exports["default"] = EventListener;
