/**
 * Checks if we can use microIDB in this system.
 * @returns microIDB is supported in this browser?
 */
function checkSupport(): boolean {

    if (window && !window.indexedDB) {
        return false;
    }

    const agent = navigator.userAgent.toLowerCase();
    const regex = new RegExp(/.+(ipod|iphone|ipad|macintosh).+version\/.+safari.+/);
    let isSupported = true;


    // Some Safari versions with indexedDB support has important bugs: https://caniuse.com/?search=indexedDB
    if (regex.test(agent) && agent.indexOf('edgios') == -1) {
        if (getBrowserVersion(agent, 'version/', 2) < 10 || agent.indexOf('version/14.1') > -1) {
            isSupported = false;
        }
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