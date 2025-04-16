import { createSlice } from '@reduxjs/toolkit';
import { users } from '../../data/users';

const initialState = {
  isAuthenticated: false,
  user: null,
  error: null,
  registeredUsers: [] // Store registered users
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { email, password } = action.payload;
      
      // Check hardcoded users first
      const hardcodedUser = users.find(
        user => user.email === email && user.password === password
      );

      // If not found in hardcoded users, check registered users
      const registeredUser = state.registeredUsers.find(
        user => user.email === email && user.password === password
      );

      const user = hardcodedUser || registeredUser;

      if (user) {
        state.isAuthenticated = true;
        state.user = user;
        state.error = null;
      } else {
        state.error = 'Invalid credentials';
      }
    },
    register: (state, action) => {
      const newUser = action.payload;
      
      // Check if email already exists in either hardcoded or registered users
      const emailExists = [...users, ...state.registeredUsers].some(
        user => user.email === newUser.email
      );

      if (emailExists) {
        state.error = 'Email already registered';
        return;
      }

      // Add new user to registered users
      state.registeredUsers.push({
        ...newUser,
        id: Date.now() // Simple way to generate unique ID
      });
      state.error = null;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { login, logout, register, setError } = authSlice.actions;
export default authSlice.reducer; 