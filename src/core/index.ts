import {DefaultOptions} from "../types";
import EventManager from "./EventManager";
import {html} from '../templates/index';
import Logger from "./Logger";

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
    private _activeModal;
    public static Instances: SPopup[] = [];
    public options;
    public trigger;
    public closeTrigger;
    public originalOptions;
    public storage;

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
        this._activeModal = modal;
    }

    public close() {
        this._activeModal?.close();
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