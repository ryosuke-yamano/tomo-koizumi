const userAgent = window.navigator.userAgent.toLowerCase();

module.exports = {
    Tablet:(userAgent.indexOf("windows") != -1 && userAgent.indexOf("touch") != -1 && userAgent.indexOf("tablet pc") == -1) 
    || userAgent.indexOf("ipad") != -1
    || (userAgent.indexOf("android") != -1 && userAgent.indexOf("mobile") == -1)
    || (userAgent.indexOf("firefox") != -1 && userAgent.indexOf("tablet") != -1)
    || userAgent.indexOf("kindle") != -1
    || userAgent.indexOf("silk") != -1
    || userAgent.indexOf("playbook") != -1,
    Mobile:(userAgent.indexOf("windows") != -1 && userAgent.indexOf("phone") != -1)
    || userAgent.indexOf("iphone") != -1
    || userAgent.indexOf("ipod") != -1
    || (userAgent.indexOf("android") != -1 && userAgent.indexOf("mobile") != -1)
    || (userAgent.indexOf("firefox") != -1 && userAgent.indexOf("mobile") != -1)
    || userAgent.indexOf("blackberry") != -1
}