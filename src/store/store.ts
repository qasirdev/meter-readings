import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import accountReducer from '../features/accountSlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

  const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  };
  const reducer = combineReducers({
    account: accountReducer,
  });

  const persistedReducer = persistReducer(persistConfig, reducer);

  export const store = configureStore({
    reducer: persistedReducer,
  });

  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;
  export const useAppDispatch = () => useDispatch<AppDispatch>();
  export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;