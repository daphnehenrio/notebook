// ? Import NPM
import * as short from 'short-uuid';

// ? Constants declaration
const translator = short(); // Defaults to flickrBase58

// ? Export
/**
 * @description Generate a shortened v4 UUID
 * @returns Returns a short uuid
 */
export const generateUUID = () => translator.generate();