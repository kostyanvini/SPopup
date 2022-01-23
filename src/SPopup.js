import defaultParams from './default-settings';

; (function (t) {
    if (t.SPopup) {
        return console.warn('SPopup is initialized');
    }
    if (t && typeof t === 'object' && t.SPopup === undefined) {
        return t.SPopup = class SPopup {

            defaultParams = { ...defaultParams };

            constructor(params) {
                this.params = { ...defaultParams, ...params };

                this.refs = {};
                this.refs.openPopup = this.getSelector(this.params.selector);
                this.refs.content = this.getSelector(this.params.src);
                this.refs.closePopup = this.getSelector(this.params.closePopup);

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
                if (this.params.popupWrapper) {
                    this.createUI();
                }
                else {
                    this.refs.popup = this.refs.content[0];
                }

                if (this.refs.openPopup) {
                    this.refs.openPopup.forEach(el => el.addEventListener('click', () => this.show()));
                }

                if (this.closePopup) {
                    this.closePopup.forEach(el => el.addEventListener('click', () => this.close()));
                }

                this.initEvents();
                return this.popup ? this.popup.dispatchEvent(new Event('init')) : new Error('SPopup is not initialized');
            }

            initEvents() {
                const on = this.params.on;
                for (const key in on) {
                    if (Object.hasOwnProperty.call(on, key) && on[key]) {
                        this.popup.addEventListener(key, on[key]);
                    }
                }
            }

            createUI() {
                let container = `
                    <div class="spopup">
                        <div class="spopup-content">
                        </div>
                        <button class="spopup-close-button">
                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20" viewBox="0 0 50 50">
                            <g fill="currentColor">
                                <path d="M27.948,20.878L40.291,8.536c1.953-1.953,1.953-5.119,0-7.071c-1.951-1.952-5.119-1.952-7.07,0L20.878,13.809L8.535,1.465
                                c-1.951-1.952-5.119-1.952-7.07,0c-1.953,1.953-1.953,5.119,0,7.071l12.342,12.342L1.465,33.22c-1.953,1.953-1.953,5.119,0,7.071
                                C2.44,41.268,3.721,41.755,5,41.755c1.278,0,2.56-0.487,3.535-1.464l12.343-12.342l12.343,12.343
                                c0.976,0.977,2.256,1.464,3.535,1.464s2.56-0.487,3.535-1.464c1.953-1.953,1.953-5.119,0-7.071L27.948,20.878z"/>
                            </g>
                        </svg>
                        </button>
                    </div>
                    <div class="spopup-layer"></div>
                `;
                let popup = document.createElement('div');
                popup.classList.add('spopup-container');
                popup.innerHTML = container;
                popup.querySelector('.spopup-content').append(this.refs.content[0]);

                document.body.insertAdjacentElement('beforeend', popup);

                this.refs.popup = popup;

                if (this.refs.closePopup) {
                    this.refs.closePopup.push(
                        this.refs.popup.querySelector('.spopup-layer'),
                        this.refs.popup.querySelector('.spopup-close-button')
                    );
                }
                else {
                    this.refs.closePopup = [
                        this.refs.popup.querySelector('.spopup-layer'),
                        this.refs.popup.querySelector('.spopup-close-button')
                    ];
                }

                this.refs.closePopup.forEach(b => b.addEventListener('click', () => this.close()));
            }

            show() {
                this.refs.popup.style.visibility = 'visible';
                this.refs.popup.style.opacity = '1';

                if (this.params.animate.effect) {
                    this.refs.popup.style.animation = `${this.params.animate.time}ms spopup${this.params.animate.effect} ease`;
                }

                this.refs.popup.dispatchEvent(new Event('afterSpopupOpen'));
                return this;
            }
            close() {
                this.refs.popup.style.visibility = 'hidden';
                this.refs.popup.style.opacity = '0';
                this.refs.popup.style.animation = ``;
                this.refs.popup.dispatchEvent(new Event('afterSpopupClose'));
                return this;
            }
            on(e, f) {
                if (e && f) {
                    this.popup.addEventListener(e, f);
                    return this;
                }
            }

            static close(instance) {
                if (instance) {
                    instance.close();
                }
                else {
                    document.querySelectorAll('.spopup-container').forEach(popup => {
                        popup.style.visibility = 'hidden';
                        popup.style.opacity = '0';
                        this.popup.style.animation = ``;
                    });
                }
            }
        }
    }
})(window);