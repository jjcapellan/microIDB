// IndexedDB support info from: https://caniuse.com/?search=indexedDB

/**
 * Checks if we can use microIDB in this system.
 * @returns microIDB is supported in this browser?
 */
function checkSupport(): boolean {

    if (!indexedDB) {
        return false;
    }

    const agent = navigator.userAgent.toLowerCase();
    let isSupported = false;

    switch (true) {
        case agent.indexOf('edge') > -1: // Edge
            isSupported = false;
            break;

        case agent.indexOf('edg/') > -1: // Edge 79+ (uses chromium)
            isSupported = true;
            break;

        // @ts-ignore
        case agent.indexOf('opr') > -1 && !!window.opr: // Opera
            isSupported = true;
            if (getBrowserVersion(agent, 'opr/', 2) < 15) {
                isSupported = false;
            }
            break;

        // @ts-ignore
        case agent.indexOf('chrome') > -1 && !!window.chrome: // Chrome
            isSupported = true;
            if (getBrowserVersion(agent, 'chrome/', 2) < 48) {
                isSupported = false;
            }
            break;

        case agent.indexOf('trident') > -1: // IE
            isSupported = false;
            break;

        case agent.indexOf('firefox') > -1: // Firefox
            isSupported = true;
            if (getBrowserVersion(agent, 'firefox/', 2) < 16) {
                isSupported = false;
            }
            break;

        case agent.indexOf('safari') > -1 && agent.indexOf('mobile') > -1: // Safari IOS
            isSupported = true;
            if (getBrowserVersion(agent, 'version/', 2) < 15) {
                isSupported = false;
            }
            break;

        case agent.indexOf('safari') > -1 && (agent.indexOf('mobile') == -1): // Safari MacOS
            isSupported = true;
            if (getBrowserVersion(agent, 'version/', 2) < 15) {
                isSupported = false;
            }
            break;

        default:
            break;
    }

    return isSupported;
}

function getBrowserVersion(agent: string, mark: string, length: number): number {
    agent = agent.toLowerCase();
    let posX = agent.indexOf(mark) + mark.length;
    if (posX < mark.length) {
        return 0;
    }
    return parseInt(agent.substring(posX, posX + length));
}

/*function getOS(agent: string): string {
    agent = agent.toLowerCase();
    let osName = '';

    switch (true) {
        case agent.indexOf('windows') > -1:
            osName = 'Windows';
            break;
        case agent.indexOf('(ip') > -1:
            osName = 'IOS';
            break;
        case agent.indexOf('(mac') > -1:
            osName = 'MacOS';
            break;
        case agent.indexOf('linux') > -1:
            osName = 'Linux';
            break;
        default:
            osName = 'Other';
            break;
    }

    return osName;
}*/

export { checkSupport }