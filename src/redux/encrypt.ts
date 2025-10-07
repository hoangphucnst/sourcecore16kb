import CryptoJS from 'crypto-js';
import {createTransform} from 'redux-persist';

// the key you need to unlock
const REDUCER_P_DIGI_EO_TRANSFER = 'credit-fund-new-tech';

export const encryptTransform = createTransform(
  // Encrypt state before saving
  inboundState => {
    try {
      const dataEncrypted = CryptoJS.AES.encrypt(
        JSON.stringify(inboundState),
        REDUCER_P_DIGI_EO_TRANSFER,
      ).toString();
      return dataEncrypted;
    } catch (error) {
      console.error('Encryption error:', error);
      return inboundState; // Fallback to raw state
    }
  },
  // Decrypt state after loading
  outboundState => {
    try {
      // Check if data is already encrypted
      if (!outboundState || typeof outboundState !== 'string') {
        console.warn('Outbound state is not encrypted. Returning as is.');
        return outboundState;
      }

      const bytes = CryptoJS.AES.decrypt(
        outboundState,
        REDUCER_P_DIGI_EO_TRANSFER,
      );
      const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
      if (!decryptedString) {
        console.warn('Decryption resulted in an empty string.');
        return {};
      }

      return JSON.parse(decryptedString);
    } catch (error) {
      console.error('Decryption error:', error);
      return {}; // Fallback to an empty state
    }
  },
);
