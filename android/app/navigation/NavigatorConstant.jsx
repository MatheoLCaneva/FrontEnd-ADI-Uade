/* eslint-disable prettier/prettier */
const NAVIGATOR = {
    START: 'NAVIGATOR_START',
    LOGIN: 'NAVIGATOR_LOGIN',
    DRAWER: 'NAVIGATOR_DRAWER',
    PASSWORD_RECOVERY: 'NAVIGATION_PASSWORD_RECOVERY',
};
const LOGIN_STACK = {
    MAIN: 'MAIN',
    LOGIN: 'LOGIN',
    REGISTER: 'REGISTER',
    PASSWORD_RECOVERY: 'PASSWORD_RECOVERY',
    CONFIRM_RECOVERY: 'CONFIRM_RECOVERY',
    NEW_PASSWORD: 'NEW_PW',
};

const REGISTER = {
    REGISTER: 'REGISTER',
    CONFIRM_NEW_USR_CODE: 'CONFIRM_NEW_USR_CODE',
};

const OWNER = {
    OWNER_HOME: 'OWNER_HOME',
    CREATE_CINEMA: 'CREATE_CINEMA',
    EDIT_CINEMA: 'EDIT_CINEMA',
    ROOMS_HOME: 'ROOMS_HOME',
    CREATE_ROOM: 'CREATE_ROOM',
    EDIT_ROOM: 'EDIT_ROOM',
};

export default {
    NAVIGATOR,
    LOGIN_STACK,
    REGISTER,
    OWNER,
}