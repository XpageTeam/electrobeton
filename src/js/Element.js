"use strict";
exports.__esModule = true;
var core_1 = require("./core");
var Element = /** @class */ (function () {
    function Element(selector) {
        this._length = 0;
        if (!selector)
            this.els = [];
        else if (typeof selector == "string")
            this.els = core_1["default"].elementsGetter(selector);
        else if (selector instanceof HTMLElement)
            this.els = [selector];
        else if (selector instanceof NodeList)
            this.els = core_1["default"].transformNodeListToArray(selector);
        else if (selector instanceof Array && (selector[0] instanceof HTMLElement || !selector.length))
            this.els = selector;
        else if (selector instanceof Element)
            this.els = selector.els;
        else
            throw Error("Invalid selector: " + selector);
    }
    Object.defineProperty(Element.prototype, "els", {
        get: function () {
            return this._els;
        },
        set: function (elements) {
            this._els = elements;
            this._length = elements.length || 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Element.prototype, "length", {
        get: function () {
            return this._length;
        },
        enumerable: true,
        configurable: true
    });
    Element.prototype.addElement = function (element) {
        if (typeof element == "string")
            this.els = this.els.concat(core_1["default"].elementsGetter(element));
        else if (element instanceof Element)
            this.els = this.els.concat(element.els);
        else if (element instanceof HTMLElement)
            this.els = this.els.concat(element);
        else if (element instanceof NodeList)
            this.els = this.els.concat(core_1["default"].transformNodeListToArray(element));
        else if (element instanceof Array && (element[0] instanceof HTMLElement || !element.length))
            this.els = this.els.concat(element);
        else
            throw Error("Invalid selector: " + element);
        return this;
    };
    Element.prototype.is = function (selector) {
        var element;
        if (typeof selector == "string")
            element = core_1["default"].elementsGetter(selector);
        else if (selector instanceof HTMLElement)
            element = [selector];
        return this.els[0] == element[0];
    };
    Element.prototype.has = function (selector) {
        var searchElements;
        if (typeof selector == "string")
            searchElements = core_1["default"].elementsGetter(selector);
        else if (selector instanceof HTMLElement)
            searchElements = [selector];
        else if (selector instanceof Element)
            searchElements = selector._els;
        else if (selector instanceof NodeList)
            searchElements = core_1["default"].transformNodeListToArray(selector);
        else if (selector instanceof Array && (selector[0] instanceof HTMLElement || !selector.length))
            searchElements = selector;
        else
            throw Error("Invalid selector: " + selector);
        var isFinded = false;
        for (var _i = 0, _a = this.els; _i < _a.length; _i++) {
            var el = _a[_i];
            for (var _b = 0, searchElements_1 = searchElements; _b < searchElements_1.length; _b++) {
                var target = searchElements_1[_b];
                if (el.contains(target)) {
                    isFinded = true;
                    break;
                }
            }
            if (isFinded)
                return true;
        }
        return false;
    };
    /**
    * Назначить класс всем текущим элементам
    * @param className: string
    * @return Element
    */
    Element.prototype.addClass = function (className) {
        core_1["default"].each(this.els, function (el) {
            el.classList.add(className);
        });
        return this;
    };
    /**
    * Удалить класс у всех текущих элементов
    * @param className: string
    * @return Element
    */
    Element.prototype.removeClass = function (className) {
        core_1["default"].each(this.els, function (el) {
            el.classList.remove(className);
        });
        return this;
    };
    /**
    * Переключения класса у всех текущих элементов
    * @param className: string
    * @return Element
    */
    Element.prototype.toggleClass = function (className, callback) {
        core_1["default"].each(this.els, function (el) {
            if (el.classList.contains(className)) {
                el.classList.remove(className);
                if (callback)
                    callback(false);
            }
            else {
                el.classList.add(className);
                if (callback)
                    callback(true);
            }
        });
        return this;
    };
    Element.prototype.hasClass = function (targetClass) {
        for (var _i = 0, _a = this.els; _i < _a.length; _i++) {
            var el = _a[_i];
            if (el.classList.contains(targetClass))
                return true;
        }
        return false;
    };
    /** Метод поиска потомков элемента по селектору
    * @param selector: string - селектор искомого
    * @return Element
    * */
    Element.prototype.find = function (selector) {
        var searchingElements = new Array();
        core_1["default"].each(this.els, function (el) {
            var findedElements = el.querySelectorAll(selector);
            if (!findedElements.length)
                return;
            for (var _i = 0, _a = core_1["default"].transformNodeListToArray(findedElements); _i < _a.length; _i++) {
                var el_1 = _a[_i];
                searchingElements.push(el_1);
            }
            // searchingElements.concat(App.transformNodeListToArray(findedElements))
            // console.log(searchingElements instanceof Array, App.transformNodeListToArray(findedElements) instanceof Array)
        });
        return new Element(searchingElements);
    };
    /** Метод поиска родителей по селектору
    * @param selector: string
    * @return Element
    */
    Element.prototype.closest = function (selector) {
        var searchingElements = new Element();
        core_1["default"].each(this.els, function (el) {
            var findedElements = el.closest(selector);
            if (!findedElements)
                return;
            searchingElements.addElement(findedElements);
        });
        return searchingElements;
    };
    Element.prototype.text = function (text) {
        if (text) {
            core_1["default"].each(this.els, function (el) {
                el.innerText = text;
            });
            return this;
        }
        else if (this.length > 1) {
            var textArray_1 = [];
            core_1["default"].each(this.els, function (el) {
                textArray_1.push(el.innerText);
            });
            return textArray_1;
        }
        else
            return this.els[0].innerText;
    };
    /** Метод для получения конкретного элемента по индексу
    * @param index: number
    * @return Element*/
    Element.prototype.get = function (index) {
        if (this.els[index])
            return new Element(this.els[index]);
        else
            return new Element();
    };
    /** Функция, возвращающая HTMLElement по индексу в коллеции элементов
    * @param index: nuber
    * @return HTMLElement
    */
    Element.prototype.getHTMLElement = function (index) {
        return this.els[index];
    };
    Element.prototype.height = function (height) {
        if (!height)
            return parseInt(getComputedStyle(this.els[0]).height);
        core_1["default"].each(this.els, function (el) {
            if (isNaN(height))
                el.style.height = height;
            else
                el.style.height = height + "px";
        });
        return this;
    };
    /** Map
    * @param callback: Function
    * @return any[] */
    Element.prototype.map = function (callback) {
        return this.els.map(callback);
    };
    Element.prototype.attr = function (attrName, value) {
        if (value) {
            core_1["default"].each(this.els, function (el) {
                el.setAttribute(attrName, value);
            });
            return this;
        }
        return this.els[0].getAttribute(attrName);
    };
    /** Метод в разработке */
    Element.prototype.prev = function (selector) {
        var searchingElements = new Element();
        core_1["default"].each(this.els, function (el) {
            var findedElements = el.previousElementSibling;
            if (!findedElements)
                return;
            if (selector) {
                if (findedElements.classList.contains(selector.replace(".", "")))
                    searchingElements.addElement(findedElements);
            }
            else
                searchingElements.addElement(findedElements);
        });
        return searchingElements;
    };
    return Element;
}());
exports["default"] = Element;
