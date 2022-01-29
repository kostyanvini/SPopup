import defaultParams from './default-settings';
import templateUI from './spopupTemplates';

; (function (t) {
    if (t.SPopup) {
        return console.warn('SPopup is initialized');
    }
    if (t && typeof t === 'object' && t.SPopup === undefined) {
        class SPopup {
            defaultParams = { ...defaultParams };
            constructor(params) {
                this.params = { ...defaultParams, ...params };

                this.refs = {};
                this.refs.openPopup = this.getSelector(this.params.selector);
                this.refs.content = this.getSelector(this.params.src);
                this.refs.closePopup = this.getSelector(this.params.closePopup);
                this.refs.defaultContent = this.params.content;
                this.refs.UI = this.createUI();
                this.init();
            }
            getSelector(s) {
                if (!s) {
                    return null;
                }
                if (s instanceof HTMLElement) {
                    return s;
                }
                const sel = document.querySelectorAll(s);
                if (sel) {
                    if (sel.length === 1) {
                        return [sel[0]];
                    }
                    else {
                        return [...sel];
                    }
                }
            }
            init() {
                console.log(this.refs.content)
                if(this.refs.content) {
                    this.refs.content[0].classList.add('spopup-hide');
                }
                if (this.refs.openPopup) {
                    this.refs.openPopup.forEach(el => el.addEventListener('click', () => this.show()));
                }
                return this.refs.popup.dispatchEvent(new Event('init'));
            }
            initEvents() {
                const on = this.params.on;
                for (const key in on) {
                    if (Object.hasOwnProperty.call(on, key) && on[key]) {
                        this.refs.popup.addEventListener(key, on[key]);
                    }
                }
            }
            createUI() {
                let popup = document.createElement('div');
                popup.classList.add('spopup-container');
                popup.innerHTML = templateUI[this.params.mode];

                if (this.refs.closePopup) {
                    this.refs.closePopup.push(
                        popup.querySelector('.spopup-layer'),
                        popup.querySelector('.spopup-close-button')
                    );
                }
                else {
                    this.refs.closePopup = [
                        popup.querySelector('.spopup-layer'),
                        popup.querySelector('.spopup-close-button')
                    ];
                }

                this.refs.popup = popup;
                this.refs.closePopup.forEach(b => b.addEventListener('click', () => this.close()));
                this.refs.popup.addEventListener('onTriggerCloseSPopup', () => this.close());
                this.initEvents();

                return popup;
            }
            createTempDiv() {
                let div = document.createElement('div');
                div.classList.add('spopup-temp');
                return div;
            }
            show() {
                this.refs.temp = this.createTempDiv();
                this.refs.content[0].insertAdjacentElement('afterend', this.refs.temp);
                this.refs.content[0].classList.remove('spopup-hide');

                this.refs.UI.querySelector('.spopup-content').append(this.refs.content[0]);
                document.body.insertAdjacentElement('beforeend', this.refs.UI);
                if (this.params.animate.effect) {
                    this.refs.popup.style.animation = `${this.params.animate.time}ms spopup${this.params.animate.effect} 0s`;
                }
                this.refs.popup.dispatchEvent(new Event('afterSpopupOpen'));
                return this;
            }
            close() {
                this.refs.temp.insertAdjacentElement('afterend', this.refs.content[0]);
                this.refs.temp.remove();
                this.refs.content[0].classList.add('spopup-hide');
                this.refs.popup.remove();
                this.refs.popup.style.animation = ``;
                this.refs.popup.dispatchEvent(new Event('afterSpopupClose'));
                return this;
            }
            on(e, f) {
                if (e && f) {
                    this.refs.popup.addEventListener(e, f.bind(this));
                    return this;
                }
            }
            static close(instance) {
                if (instance) {
                    instance.close();
                }
                else {
                    document.querySelectorAll('.spopup-container').forEach(popup => {
                        return popup.dispatchEvent(new Event('onTriggerCloseSPopup'));
                    });
                }
            }
            static show(opts) {
                opts = opts || {};
                const popup = new SPopup(opts);
                if (!popup.refs.content) {
                    let content = document.createElement('div');
                    content.innerHTML = popup.refs.defaultContent;
                    popup.refs.content = [content];
                }
                return popup.show();
            }
        }

        t.SPopup = SPopup;
        return SPopup;
    }
})(window);