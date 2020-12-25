import { useMemo } from 'react'
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

// import { measurementsReducer } from './measurementsReducer';
import * as sl from './sensorsList-Reducer';
import * as g from './groups-Reducer';
import * as fd from './formsData-Reducer';
import * as theme from './theme-Reducer';

let store;

const rootReducer = combineReducers({
  // sensor: measurementsReducer,
  sensorsList: sl.sensorsList_Reducer,
  groupsList: g.groups_Reducer,
  formsData: fd.formsData_Reducer,
  theme: theme.theme_Reducer,
});

const initialState = {
  sensorsList: sl.initState,
  groupsList: g.initState,
  formsData: fd.initState,
  theme: theme.initState,
}

const initStore = (preloadedState = initialState) => createStore(
  rootReducer,
  preloadedState,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export const useStore = (initialState) => {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}