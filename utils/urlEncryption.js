// Function to encrypt a URL
export const encryptURL = (url) => {
  const key = process.env.NEXT_PUBLIC_SECRET_KEY;
  let encryptedURL = '';

  for (let i = 0; i < url.length; i++) {
    const charCode = url.charCodeAt(i);
    const encryptedCharCode = charCode ^ key.charCodeAt(i % key.length);
    encryptedURL += String.fromCharCode(encryptedCharCode);
  }

  return encodeURIComponent(encryptedURL);
};

// Function to decrypt an encrypted URL
export const decryptURL = (encryptedURL) => {
  const key = process.env.NEXT_PUBLIC_SECRET_KEY;
  const decodedURL = decodeURIComponent(encryptedURL);
  let decryptedURL = '';

  for (let i = 0; i < decodedURL.length; i++) {
    const charCode = decodedURL.charCodeAt(i);
    const decryptedCharCode = charCode ^ key.charCodeAt(i % key.length);
    decryptedURL += String.fromCharCode(decryptedCharCode);
  }

  return decryptedURL;
};
