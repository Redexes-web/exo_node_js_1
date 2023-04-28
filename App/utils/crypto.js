const CryptoJS = require('crypto-js');
const process = require('process');
// Clé de chiffrement fixe
const ENCRYPTION_SECRET = process.env.ENCRYPTION_SECRET;
const IV = CryptoJS.enc.Hex.parse(process.env.ENCRYPTION_IV);
if (!ENCRYPTION_SECRET) {
	throw new Error('Encryption secret is not defined.');
}

if (!IV) {
	throw new Error('Encryption IV is not defined.');
}
function encryptEmail(email) {
    console.log(email)
	const encrypted = CryptoJS.AES.encrypt(email, ENCRYPTION_SECRET, {
        iv: IV,
		mode: CryptoJS.mode.CTR,
        padding: CryptoJS.pad.Pkcs7,
	});
	return encrypted.toString();
}

function decryptEmail(email) {
    const decrypted = CryptoJS.AES.decrypt(email, ENCRYPTION_SECRET, {
        iv: IV,
		mode: CryptoJS.mode.CTR,
        padding: CryptoJS.pad.Pkcs7,
	});
	return decrypted.toString(CryptoJS.enc.Utf8);
}
module.exports = {
    encryptEmail,
    decryptEmail
};