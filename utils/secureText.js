module.exports = function secureText (data) {
    let securedText = data.replace(/>/g, '%gt;');
    securedText = securedText.replace(/</g, '%lt;');
    return securedText
}