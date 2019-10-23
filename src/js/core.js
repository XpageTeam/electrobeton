"use strict";
exports.__esModule = true;
var App = /** @class */ (function () {
    function App() {
    }
    App.getElements = function (selector) {
        var elements = document.querySelectorAll(selector);
        return elements.length ? elements : [];
        // return this.elementsGetter(sele ctor)
    };
    /**
    * Метод получения одного объекта по селектору
    * @param selector: string
    * @return HTMLElement
    */
    App.getElement = function (selector) {
        var element = document.querySelector(selector);
        return element;
    };
    App.elementsGetter = function (selector) {
        return App.transformNodeListToArray(document.querySelectorAll(selector));
    };
    App.transformNodeListToArray = function (list) {
        try {
            return Array.prototype.slice.call(list);
        }
        catch (e) {
            throw Error(e);
            return [];
        }
    };
    App.wrap = function (selector, wrapper) {
        var localWrapper;
        if (typeof wrapper == "string")
            localWrapper = document.createElement(wrapper);
        else if (wrapper instanceof HTMLElement)
            localWrapper = wrapper;
        // console.log(selector, [localWrapper])
        App.each(selector, function (el, i) {
            localWrapper.innerHTML = el.outerHTML;
            el.parentNode.replaceChild(localWrapper, el);
        });
    };
    App.each = function (elements, callback) {
        if (!callback) {
            console.error("Callback does not exists in yours 'each'");
            return;
        }
        if (typeof elements == "string")
            elements = App.transformNodeListToArray(App.getElements(elements));
        var i = 0;
        for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
            var el = elements_1[_i];
            callback(el, i);
            i++;
        }
    };
    return App;
}());
exports["default"] = App;
