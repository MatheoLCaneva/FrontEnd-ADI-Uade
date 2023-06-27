import { configureStore, createSlice } from '@reduxjs/toolkit';

// Crea un slice que contiene el estado y las acciones relacionadas con el usuario
const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
  },
});

const ownerSlice = createSlice({
  name: 'owner',
  initialState: {
    screen: "OWNER_HOME",
  },
  reducers: {
    setCinema: (state, action) => {
      return {
        ...state,
        cinema: action.payload,
      };
    },
    setRoom: (state, action) => {
      return {
        ...state,
        room: action.payload,
      };
    },
    setFunction: (state, action) => {
      return {
        ...state,
        function: action.payload,
      };
    },
    setScreen: (state, action) => {
      return {
        ...state,
        screen: action.payload,
      };
    },
  },
});

// Crea el store de Redux Toolkit
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    owner: ownerSlice.reducer,
  },
});

// Exporta el slice y las acciones
export const { setUser } = userSlice.actions;

export const { setCinema, setRoom, setFunction, setScreen } = ownerSlice.actions;

export default store;
