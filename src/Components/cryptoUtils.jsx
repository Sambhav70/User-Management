// cryptoUtils.js
import CryptoJS from "crypto-js";

const SECRET_KEY = "my-secret-key"; // 👉 change this to something more secure

export const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

export const decryptData = (cipherText) => {
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (e) {
    console.error("Decryption failed", e);
    return [];
  }
};
