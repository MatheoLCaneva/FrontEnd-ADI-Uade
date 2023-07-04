import { configureStore, createSlice } from '@reduxjs/toolkit';
import NavigatorConstant from "../navigation/NavigatorConstant";

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
    screen: NavigatorConstant.OWNER.OWNER_HOME,
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

const clientSlice = createSlice({
  name: 'client',
  initialState: {
    screen: NavigatorConstant.USER.HOME,
  },
  reducers: {
    setMovie: (state, action) => {
      return {
        ...state,
        movie: action.payload,
      };
    },
    setScreenUser: (state, action) => {
      return {
        ...state,
        screen: action.payload,
      };
    },
    setFunctionsByMovie: (state, action) => {
      return {
        ...state,
        functions: action.payload
      }
    },
    setFunctionToReserve: (state, action) => {
      return {
        ...state,
        functions: action.payload
      }
    }
  },
})

// Crea el store de Redux Toolkit
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    owner: ownerSlice.reducer,
    client: clientSlice.reducer,
  },
});

// Exporta el slice y las acciones
export const { setUser } = userSlice.actions;

export const { setCinema, setRoom, setFunction, setScreen } = ownerSlice.actions;

export const { setMovie, setScreenUser, setFunctionsByMovie, setFunctionToReserve } = clientSlice.actions;

export default store;
