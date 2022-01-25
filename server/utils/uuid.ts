import * as short from 'short-uuid';

const translator = short();

export const generateUUID = () => translator.generate();