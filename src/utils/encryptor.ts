import CryptoJS from 'crypto-js';

const SECRET_KEY = 'JngUH6)T<x69^-R|$7nWPxi"4:(L6J@8tZN8vPbiop;(Z>Fk*c<]R&<}?sc3;cc';
const FILE_HEADER = 'RugbyFieldApp';

export function encrypt(data: string) {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
}

export function decrypt(encrypted: string) {
  const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}

export function encryptAndSign(json: string) {
  const ciphertext = CryptoJS.AES.encrypt(json, SECRET_KEY).toString();
  const hmac = CryptoJS.HmacSHA256(ciphertext, SECRET_KEY).toString(); // firma HMAC

  // return JSON.stringify({ data: ciphertext, hmac });
  return `${FILE_HEADER}|${hmac}|${ciphertext}`;
}

export function verifyAndDecrypt(fileContent: string) {
  try {
    // const { data, hmac } = JSON.parse(fileContent);
    const [header, hmac, encrypted] = fileContent.split('|');

    if (header !== FILE_HEADER) {
      throw new Error('Unsupported or invalid file format.');
    }

    if (!hmac || !encrypted) throw new Error('Invalid format');

    const expectedHmac = CryptoJS.HmacSHA256(encrypted, SECRET_KEY).toString();

    if (hmac !== expectedHmac) {
      console.warn('HMAC signature mismatch. File may have been tampered with.');
      return null;
    }

    const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);

    return decrypted;
  } catch (error) {
    console.error('Failed to verify or decrypt:', error);
    return null;
  }
}
