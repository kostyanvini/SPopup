export type EventOptions = {
    beforeOpen?: Function,
    open?: Function,
    beforeClose?: Function,
    close?: Function,
    innit?: Function
}

export type AnimateOptions = {
    speed?: number,
    type?: string
}

export type DefaultOptions = {
    on?: EventOptions,
    animate?: AnimateOptions
    mode?: string,
    src?: null,
    openTrigger?: null | string | HTMLElement | HTMLElement[],
    close?: null | string[] | HTMLElement | HTMLElement[],
    defaultClose: string[],
    esc: boolean
}