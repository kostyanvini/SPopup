export default class EventManager {
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