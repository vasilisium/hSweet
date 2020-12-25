export const modes = {
  dark: 'dark',
  light: 'light'
}

export const initState = {
  mode: modes.dark
}

export const actionsTypes = {
  TOGGLE: 'THEME/TOGGLE',
  SET_DARK: 'THEME/SET_DARK',
  SET_LIGHT: 'THEME/SET_LIGHT'
}

export const toggle_Action = () => ({
  type: actionsTypes.TOGGLE,
});

export const setDark_Action = () => ({
  type: actionsTypes.SET_DARK,
});

export const setLight_Action = () => ({
  type: actionsTypes.SET_LIGHT,
});

export const theme_Reducer = (state = initState, action) => {
  switch (action.type) {
    case actionsTypes.TOGGLE: 
      if(state.mode === modes.dark) return {
        ...state,
        mode: modes.light
      }
      else return {
        ...state,
        mode: modes.dark
      }

    case actionsTypes.SET_LIGHT: return {
      ...state,
      mode: modes.light
    }

    case actionsTypes.SET_DARK: return {
      ...state,
      mode: modes.dark
    }

    default: return state;
  }
}