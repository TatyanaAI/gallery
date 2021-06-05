import { createBrowserHistory } from "history";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import thunkMiddleware from "redux-thunk";
import { loadFromLocalStorage, saveToLocalStorage } from "./localStorage";
import axios from 'axios';
import usersReducer from "./reducers/usersReducer";


export const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
  users: usersReducer,
  router: connectRouter(history)
});
const middleware = [
  thunkMiddleware,
  routerMiddleware(history)
];
const enhancers = composeEnhancers(applyMiddleware(...middleware));
const persistedState = loadFromLocalStorage();

const store = createStore(rootReducer, persistedState, enhancers);

store.subscribe(() => {
  saveToLocalStorage({
    users: {
      user: store.getState().users.user
    }
  });
});

axios.interceptors.request.use(config => {
  try {
    config.headers["Authentication"] = store.getState().users.user.token;
  } catch (e) {
    // do nothing, no token exists
  }
  return config;
});


export default store;