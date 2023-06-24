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

// Crea el store de Redux Toolkit
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

// Exporta el slice y las acciones
export const { setUser } = userSlice.actions;

export default store;
