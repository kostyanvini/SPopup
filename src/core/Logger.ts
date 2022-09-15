export default class Logger {
    public static error(...e) {
        console.error('[SPopup error]: ' + e);
    }

    public static warn(...e) {
        console.warn('[SPopup warn]: ' + e);
    }
}