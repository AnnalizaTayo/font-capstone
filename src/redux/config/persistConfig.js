import storage from 'redux-persist/lib/storage'; // Defaults to localStorage
import { createTransform } from 'redux-persist';

// Define the encryption/decryption functions
const encryptDecryptTransform = createTransform(
  // Convert state to a string (encryption)
  (inboundState, key) => {
    return JSON.stringify(inboundState);
  },
  // Parse the string back to state (decryption)
  (outboundState, key) => {
    return JSON.parse(outboundState);
  }
);

const persistConfig = {
  key: 'auth', // The key to use for storing the data in localStorage
  storage, // The storage method (e.g., localStorage or sessionStorage)
  transforms: [encryptDecryptTransform], // Use encryption for sensitive data
};

export default persistConfig;
