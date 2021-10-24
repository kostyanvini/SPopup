class SPopup {
    /**
     * @param {Object} settings 
     * @param {Node | NodeList | String} [settings.selector=null] Ссылка на DOM элемент, при клике будет открываться попап окно
     * @param {Node | String} [settings.src=''] Контент попап окна
     * @param {Number} [settings.timeout=0] Количество миллисекунд через которое будет всплывать попап окно
     * @param {Object} [settings.on={afterPopupOpen: null, afterPopupClose: null, init: null}] Объект с коллбэк функциями
     * @param {Function} [settings.on.afterPopupOpen=null] Функция срабатывает после всплытия попап окна
     * @param {Function} [settings.on.afterPopupClose=null] Функция срабатывает после закрытия попап окна
     * @param {Function} [settings.on.init=null] Функция срабатывает после инициализации попап окна
     * @param {Node| NodeList | String} [settings.closePopup=[]] Ссылка на DOM элемент, при клике будет закрываться попап окно
     * @param {Boolean} [settings.popupWrapper=true] Если false, то для контента не будет генерироваться обертка
     * @param {Object} [settings.animate={time: 0, effect: 'none'}] Объект принимает объект с настройками для анимации попап окна
     * @param {Number} [settings.animate.time=0] Количество миллисекунд за которое срабатывает анимация
     * @param {String} [settings.animate.effect='none'] Эффект анимации, доступные значение: none, opacity, scale, top, left, right, bottom
     * @returns {SPopup} Создается новый экзмепляр класс со всеми настройками
     */
    constructor(settings) {
        const defaultSettings = {
            selector: null,
            src: null,
            timeout: 0,
            closePopup: [],
            popupWrapper: true,
            animate: {
                time: 0,
                effect: 'none'
            },
            on: {
                afterPopupOpen: null,
                afterPopupClose: null,
                init: null,
            },
        }

        this.selector = this.getSelector(settings.selector) || null;
        this.settings = { ...defaultSettings, ...settings };
        this.content = this.getSelector(settings.src) || null;
        this.opened = false;
        this.init();
    }
    getSelector(s, ctx = document) {
        if (!s) {
            return;
        }
        if (s instanceof Node || s instanceof NodeList) {
            return s;
        }
        const sel = ctx.querySelectorAll(s);
        if (sel && sel !== null && sel !== undefined) {
            if (sel.length === 1) {
                return sel[0]
            }
            else {
                return sel;
            }
        }
    }
    init() {
        if (this.selector) {
            if (this.selector.length) {
                this.selector.forEach(el => {
                    el.addEventListener('click', () => {
                        this.show();
                    });
                })
            }
            else {
                this.selector.addEventListener('click', () => {
                    this.show();
                })
            }
        }

        if (this.settings.closePopup.length > 0) {
            this.settings.closePopup = this.getSelector(this.settings.closePopup, this.content);
            if (this.settings.closePopup.length) {
                this.settings.closePopup.forEach(el => el.addEventListener('click', () => this.close()))
            }
            else {
                this.settings.closePopup.addEventListener('click', () => this.close());
            }
        }

        if (this.content) {
            this.content.remove();
            if (this.settings.popupWrapper) {
                this.content = this.createUI();
                this.content.style.animation = `popup${this.settings.animate.effect} ${this.settings.animate.time}ms ease`;
            }
            else {
                this.content.style.animation = `popup${this.settings.animate.effect} ${this.settings.animate.time}ms ease`;
            }
        }

        this.initEvents();
        return this.content ? this.content.dispatchEvent(new Event('init')): false;
    }
    initEvents() {
        const on = this.settings.on;
        for (const key in on) {
            if (Object.hasOwnProperty.call(on, key) && on[key] !== null) {
                this.content.addEventListener(key, on[key]);
            }
        }
    }
    createUI() {
        let popup = document.createElement('div');
        popup.id = 'popup';
        popup.classList.add('popup');
        let wrapper = document.createElement('div');
        wrapper.classList.add('popup-wrapper');
        wrapper.insertAdjacentElement('afterbegin', this.content);
        wrapper.insertAdjacentHTML('afterbegin', '<button class="popup-close">X</button>');
        popup.insertAdjacentHTML('afterbegin', '<div class="popup-bg"></div>');
        popup.insertAdjacentElement('afterbegin', wrapper);

        [this.getSelector('.popup-close', popup), this.getSelector('.popup-bg', popup)]
            .forEach(el => {
                el.addEventListener('click', () => this.close());
            });
        return popup;
    }

    /**
     * @param {Number} [timeout=0] Количество миллисекунд через которое откроется попап окно
     * @returns {SPopup} Экземпляр класса
     */
    show(timeout) {
        if (this.content && this.content !== 'undefined' && this.opened === false) {
            setTimeout(() => {
                document.body.insertAdjacentElement('afterbegin', this.content);
                this.content.style.visibility = 'visible';
                this.opened = true;
                this.content.dispatchEvent(new Event('afterPopupOpen'));
            }, timeout || this.settings.timeout);
        }
        return this;
    }
    /**
     * @returns {SPopup} экземпляр класса
     */
    close() {
        if (this.opened === true) {
            this.content.remove();
            this.opened = false;
            this.content.dispatchEvent(new Event('afterPopupClose'));
        }
        return this;
    }
    /**
     * @param {String} e Название события
     * @param {Function} f Функция коллбэк
     * @returns {SPopup} Экземпляр класса
     */
    on(e, f) {
        if (e && f) {
            this.content.addEventListener(e, f);
            return this;
        }
    }
}