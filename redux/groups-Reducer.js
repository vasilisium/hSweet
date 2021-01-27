import { fetchData } from 'functions/apiCallFunctions';

export const initState = {
  groupsList: [],
  loading: false,
  error: '',
  initiated: false,
  selectedId: 0,
}

const actionsTypes = {
  REQUEST_GROUPS_LIST: 'GROUPS/REQUEST_LIST',
  SET_GROUPS_LIST: 'GROUPS/SET_LIST',
  SET_ERROR: 'GROUPS/SET_ERROR',
  SET_IS_INITIATED: 'GROUPS/SET_IS_INITIATED',
  SELECT_GROUP: 'GROUPS/SELECT_GROUP',
}

export const requestGroupsList_Action = () => ({
  type: actionsTypes.REQUEST_GROUPS_LIST
})
export const setGroupsList_Action = (groupsList) => ({
  type: actionsTypes.SET_GROUPS_LIST,
  payload: groupsList
})
export const setError_Action = (errorText) => ({
  type: actionsTypes.SET_ERROR,
  payload: errorText
})
export const setIsInitiated_Action = (isInitiated) => ({
  type: actionsTypes.SET_IS_INITIATED,
  payload: isInitiated
})
export const selectGroup_Action = (id) => ({
  type: actionsTypes.SELECT_GROUP,
  payload: id
})

const urlPart = 'groups';

export const fetchGroupsList = () => {
  return (dispatch) => {
    dispatch(requestGroupsList_Action());

    fetchData(urlPart).then(result => {
      if (result.isError) {
        dispatch(setError_Action(result.error))
      }
      else {
        dispatch(setGroupsList_Action(result))
        dispatch(setIsInitiated_Action(true))
      }
    })
  }
}

export const groups_Reducer = (state = initState, action) => {
  switch (action.type) {
    case actionsTypes.REQUEST_GROUPS_LIST: return {
      ...state,
      loading: true
    }

    case actionsTypes.SET_ERROR: return {
      ...state,
      error: action.payload,
      loading: false
    }

    case actionsTypes.SET_GROUPS_LIST: return {
      ...state,
      groupsList: action.payload,
      loading: false,
      error: ''
    }

    case actionsTypes.SET_IS_INITIATED: return {
      ...state,
      initiated: action.payload
    }

    case actionsTypes.SELECT_GROUP: return {
      ...state,
      selectedId: action.payload
    }

    default: return state;
  }
}