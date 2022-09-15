(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.SPopup = factory());
})(this, (function () { 'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function html(content) {
        return "\n        <div class=\"spopup\">\n            <div class=\"spopup__container\">\n                <div class=\"spopup__content\">\n                    ".concat(content, "\n                </div>\n            </div>\n            <div class=\"spopup__layer\"></div>\n            <div class=\"spopup__close\"></div>\n        </div> \n    ");
    }

    var EventManager = /** @class */ (function () {
        function EventManager(modal) {
            this.events = {};
            this.modal = modal;
        }
        EventManager.prototype.dispatch = function (evName) {
            var _this = this;
            if (!evName) {
                console.warn('[EventManager]: Error event name is required parameter');
            }
            if (this.events[evName]) {
                this.events[evName].forEach(function (cb) { return cb.call(_this.modal, _this.modal); });
            }
            return this;
        };
        EventManager.prototype.on = function (evName, cb) {
            if (!cb && typeof cb !== "function") {
                console.warn('[EventManager]: Error callback is required parameter');
                return;
            }
            if (this.events.hasOwnProperty(evName)) {
                this.events[evName].push(cb);
            }
            else {
                this.events[evName] = [cb];
            }
            return this;
        };
        EventManager.prototype.off = function (evName) {
            if (this.events[evName]) {
                delete this.events[evName];
            }
            return this;
        };
        return EventManager;
    }());
    var Logger = /** @class */ (function () {
        function Logger() {
        }
        Logger.error = function () {
            var e = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                e[_i] = arguments[_i];
            }
            console.error('[SPopup error]: ' + e);
        };
        Logger.warn = function () {
            var e = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                e[_i] = arguments[_i];
            }
            console.warn('[SPopup warn]: ' + e);
        };
        return Logger;
    }());
    var defaultOptions = {
        on: {},
        animate: {
            speed: 0,
            type: 'none'
        },
        mode: 'html',
        src: null,
        defaultClose: ['.spopup__close', '.spopup__layer'],
        close: [],
        esc: true
    };
    var SPopup = /** @class */ (function () {
        function SPopup(options) {
            this.originalOptions = options;
            this.options = __assign(__assign({}, defaultOptions), options);
            this._EventManager = new EventManager(this);
            this._init();
        }
        SPopup.prototype._getSelector = function (selector) {
            if (!selector) {
                return null;
            }
            if (selector instanceof HTMLElement) {
                return selector;
            }
            var sel = document.querySelectorAll(selector);
            if (sel.length) {
                return sel;
            }
        };
        SPopup.prototype._init = function () {
            var _this = this;
            this.trigger = this._getSelector(this.options.src);
            if (!this.trigger) {
                Logger.error('option.src is required');
                return;
            }
            this.closeTrigger = this._getSelector(this.options.close.length ?
                this.options.defaultClose.concat(this.options.close) :
                this.options.defaultClose);
            this.trigger.forEach(function (item) {
                item.addEventListener('click', function () {
                    _this.open();
                });
            });
            switch (this.options.mode) {
                case 'html':
                    this._renderHTML();
                    break;
            }
        };
        SPopup.prototype._initEvents = function () {
            var em = this._EventManager;
            for (var onKey in this.options.on) {
                if (typeof onKey === 'function') {
                    em.on('onKey', this.options.on[onKey]);
                }
            }
        };
        SPopup.prototype._renderHTML = function () {
        };
        SPopup.prototype.open = function () {
            var modal = document.createElement('div');
            var content = this._getSelector(this.options.src)[0];
            content.style.display = 'none';
            modal.innerHTML = html(content.innerHTML);
            document.body.append(modal);
        };
        SPopup.prototype.close = function () {
        };
        SPopup.open = function (options) {
            var popup = new SPopup(options);
            popup.open();
            return popup;
        };
        SPopup.close = function (instance) {
            if (instance instanceof SPopup) {
                instance.close();
                return;
            }
            else {
                SPopup.Instances.forEach(function (inst) {
                    inst.close();
                });
                return;
            }
        };
        SPopup.Instances = [];
        return SPopup;
    }());

    return SPopup;

}));
