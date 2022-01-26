// ? Import NPM
import * as short from 'short-uuid';

// ? Constants declaration
const translator = short(); // Defaults to flickrBase58

// ? Export
export const generateUUID = () => translator.generate(); // Generate a shortened v4 UUID