const CryptoJS = require('crypto-js');

// Clé de chiffrement fixe
const ENCRYPTION_SECRET = process.env.ENCRYPTION_SECRET;
const IV = CryptoJS.enc.Hex.parse(process.env.ENCRYPTION_IV);

function encryptEmail(email) {
    console.log(email)
	const encrypted = CryptoJS.AES.encrypt(email, ENCRYPTION_SECRET, {
        iv: IV,
		mode: CryptoJS.mode.CTR,
	});
	return encrypted.toString();
}

function decryptEmail(email) {
    const decrypted = CryptoJS.AES.decrypt(email, ENCRYPTION_SECRET, {
        iv: IV,
		mode: CryptoJS.mode.CTR,
	});
	return decrypted.toString(CryptoJS.enc.Utf8);
}
module.exports = {
    encryptEmail,
    decryptEmail
};