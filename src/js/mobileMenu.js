"use strict";
exports.__esModule = true;
var core_1 = require("./core");
var Element_1 = require("./Element");
var EventListener_1 = require("./EventListener");
var MobileMenu = /** @class */ (function () {
    function MobileMenu(settings) {
        this._state = false;
        this._error = false;
        this.menuActiveClass = "js__opened";
        this.bodyActiveClass = "js__menu-opened";
        this.body = core_1["default"].getElement("body");
        this.ignoreWarnings = false;
        this._settings = settings;
        this.ignoreWarnings = settings.ignoreWarnings;
        this.burger = core_1["default"].getElement(settings.burger);
        this.menuActiveClass = settings.menuActiveClass;
        this.bodyActiveClass = settings.bodyActiveClass;
        this.menu = core_1["default"].getElement(settings.menu);
        this.bindEvents();
    }
    Object.defineProperty(MobileMenu.prototype, "error", {
        set: function (text) {
            this._error = true;
            console.error(text + ". \u041C\u0435\u043D\u044E \u043D\u0435 \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MobileMenu.prototype, "state", {
        get: function () {
            return this._state;
        },
        set: function (newState) {
            this._state = newState;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MobileMenu.prototype, "menu", {
        get: function () {
            return this._menu;
        },
        set: function (el) {
            if (!(el instanceof HTMLElement) && !this.ignoreWarnings)
                this.error = "Меню не найдено";
            else
                this._menu = el;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MobileMenu.prototype, "burger", {
        get: function () {
            return this._burger;
        },
        set: function (el) {
            if (!(el instanceof HTMLElement) && !this.ignoreWarnings)
                this.error = "Бургер не найден";
            else
                this._burger = el;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MobileMenu.prototype, "settings", {
        get: function () {
            return this._settings;
        },
        enumerable: true,
        configurable: true
    });
    MobileMenu.prototype.openMenu = function () {
        if (!window.matchMedia(this.settings.media).matches)
            return;
        console.log(this.settings.fixBody)
        if (this.settings.fixBody) {
            this.body.style.top = -window.pageYOffset + "px";
            this.body.style.position = "fixed";
        }
        this.burger.classList.add("js__active");
        this.menu.classList.add(this.menuActiveClass);
        this.body.classList.add(this.bodyActiveClass);
        this.state = true;
        return this;
    };
    MobileMenu.prototype.closeMenu = function () {
        if (!window.matchMedia(this.settings.media).matches || !this.state)
            return;
        var top = 0;
        if (this.settings.fixBody) {
            top = Math.abs(parseInt(this.body.style.top));
            this.body.style.top = "";
            this.body.style.position = "";
        }
        this.burger.classList.remove("js__active");
        this.menu.classList.remove(this.menuActiveClass);
        this.body.classList.remove(this.bodyActiveClass);
        if (this.settings.fixBody)
            window.scrollTo(0, top);
        this.state = false;
        return this;
    };
    MobileMenu.prototype.toggleMenu = function () {
        if (!window.matchMedia(this.settings.media).matches)
            return;
        if (this.state)
            this.closeMenu();
        else
            this.openMenu();
        return this;
    };
    MobileMenu.prototype.bindEvents = function () {
        var _this = this;
        document.addEventListener("click", function (event) {
            var target = new Element_1["default"](event.target);
            if (!target.is(_this.burger)
                && !new Element_1["default"](_this.burger).has(target)
                && !target.is(_this.menu)
                && !new Element_1["default"](_this.menu).has(target))
                _this.closeMenu();
        });
        new EventListener_1["default"](this.burger).add("click", function (el) {
            _this.toggleMenu();
        });
    };
    return MobileMenu;
}());
exports["default"] = MobileMenu;
