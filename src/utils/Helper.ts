

export namespace Helper {
    export function getAttr(el: HTMLElement, attr: string): void {
        el.getAttribute(attr);
        return;
    }

    export function setAttr(el: HTMLElement, attr: string, value: string): void {
        el.setAttribute(attr, value);
        return;
    }
}