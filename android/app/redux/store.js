import { configureStore, createSlice } from '@reduxjs/toolkit';
import NavigatorConstant from "../navigation/NavigatorConstant";

// Crea un slice que contiene el estado y las acciones relacionadas con el usuario
const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser: (state, action) => {
      if(action.payload.idToken)
        return action.payload;
      else {
        return {
          ...action.payload,
          user: {
            email: action.payload.email,
            familyName: action.payload.lastName,
            givenName: action.payload.name,
            name: `${action.payload.name} ${action.payload.lastName}`,
            photo: '',
          }
        }
      }
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
    setCinemaAddress: (state, action) => {
      return {
        ...state,
        cinemaAddress: action.payload,
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

const initialState = {
  screen: NavigatorConstant.USER.HOME,
  movie: null,
  functions: [],
  functionToReserve: null,
  functionReserved: null,
};

const clientSlice = createSlice({
  name: 'client',
  initialState,
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
        functionToReserve: action.payload
      }
    },
    setFunctionReserved: (state, action) => {
      return {
        ...state,
        functionReserved: action.payload
      }
    },
    setLocation: (state, action) => {
      return {
        ...state,
        location: action.payload
      }
    },
    setReserve: (state, action) => {
      return {
        ...state,
        reserve: action.payload
      }
    },
    setFilters: (state, action) => {
      return {
        ...state,
        filters: action.payload
      }
    },
    resetClientState: () => initialState
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

export const { setCinema, setRoom, setFunction, setScreen, setCinemaAddress } = ownerSlice.actions;

export const { resetClientState, setMovie, setScreenUser, setFunctionsByMovie, setFunctionToReserve, setFunctionReserved, setLocation, setReserve, setFilters } = clientSlice.actions;

export default store;
