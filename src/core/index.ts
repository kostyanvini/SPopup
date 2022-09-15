import {DefaultOptions} from "../types";
import {html} from '../templates/index';

class EventManager {
    public events = {};
    public modal;

    constructor(modal) {
        this.modal = modal;
    }

    dispatch(evName): EventManager {
        if (!evName) {
            console.warn('[EventManager]: Error event name is required parameter');
        }
        if (this.events[evName]) {
            this.events[evName].forEach(cb => cb.call(this.modal, this.modal));
        }
        return this;
    }

    on(evName, cb): EventManager {
        if (!cb && typeof cb !== "function") {
            console.warn('[EventManager]: Error callback is required parameter');
            return;
        }
        if (this.events.hasOwnProperty(evName)) {
            this.events[evName].push(cb);
        } else {
            this.events[evName] = [cb];
        }
        return this;
    }

    off(evName): EventManager {
        if (this.events[evName]) {
            delete this.events[evName];
        }
        return this;
    }
}

class Logger {
    public static error(...e) {
        console.error('[SPopup error]: ' + e);
    }

    public static warn(...e) {
        console.warn('[SPopup warn]: ' + e);
    }
}

class Renderer {
    public static render() {

    }
}

const defaultOptions: DefaultOptions = {
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
}

export default class SPopup {
    private readonly _EventManager: EventManager;
    public static Instances: SPopup[] = [];
    public options;
    public trigger;
    public closeTrigger;
    public originalOptions;

    constructor(options: DefaultOptions) {
        this.originalOptions = options;
        this.options = {...defaultOptions, ...options};

        this._EventManager = new EventManager(this);

        this._init();
    }

    private _getSelector(selector: string | HTMLElement): null | NodeList | HTMLElement {
        if (!selector) {
            return null;
        }
        if (selector instanceof HTMLElement) {
            return selector;
        }
        const sel = document.querySelectorAll(selector);
        if (sel.length) {
            return sel;
        }
    }

    private _init() {
        this.trigger = this._getSelector(this.options.src);
        if (!this.trigger) {
            Logger.error('option.src is required');
            return;
        }

        this.closeTrigger = this._getSelector(
            this.options.close.length ?
                this.options.defaultClose.concat(this.options.close) :
                this.options.defaultClose
        );

        this.trigger.forEach(item => {
            item.addEventListener('click', () => {
                this.open();
            });
        });

        switch (this.options.mode) {
            case 'html':
                this._renderHTML();
                break;
        }
    }


    private _initEvents() {
        const em = this._EventManager;
        for (const onKey in this.options.on) {
            if (typeof onKey === 'function') {
                em.on('onKey', this.options.on[onKey]);
            }
        }
    }

    private _renderHTML() {

    }

    public open() {
        let modal = document.createElement('div');
        let content = this._getSelector(this.options.src)[0];
        content.style.display = 'none';
        modal.innerHTML = html(content.innerHTML);
        document.body.append(modal);
    }

    public close() {

    }

    public static open(options: DefaultOptions): SPopup {
        let popup: SPopup = new SPopup(options);
        popup.open();
        return popup;
    }

    public static close(instance: SPopup): void {
        if (instance instanceof SPopup) {
            instance.close();
            return;
        } else {
            SPopup.Instances.forEach(inst => {
                inst.close();
            });
            return;
        }
    }
}