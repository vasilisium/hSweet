import { fetchData } from 'functions/apiCallFunction'

const actionsTypes = {
    REQUEST_SENSORS_LIST: 'SENSORS/REQUEST_LIST',
    SET_SENSORS_LIST: 'SENSORS/SET_LIST',
    ERROR_ON_REQUEST: 'SENSORS/REQUEST_ERROR',
    SET_IS_INITIATED: 'SENSORS/SET_IS_INITIATED',
}

export const requestSensorsList_Action = () =>({
    type: actionsTypes.REQUEST_SENSORS_LIST,
})
export const setSensorsList_Action = (sensorsList) =>({
    type: actionsTypes.SET_SENSORS_LIST,
    payload:sensorsList
})
export const requestError_Action = (error) => ({
    type: actionsTypes.ERROR_ON_REQUEST,
    payload: error
})
export const setIsInitiated_Action = (isInitiated) => ({
    type: actionsTypes.SET_IS_INITIATED,
    payload: isInitiated
})

const urlPart = 'sensors';

export const initState = {
    sensorsList:[],
    loading: false,
    error:'',
    initiated: false,
}

export const fetchSensorsList = (requestCallback, ...args) => {
    return (dispatch) =>{
        dispatch(requestSensorsList_Action());

        fetchData(
            urlPart, 
            (data) => {
                dispatch(setSensorsList_Action(data))
                dispatch(setIsInitiated_Action(true))
            },
            (error) => {
                dispatch(requestError_Action(error))
            },
        )
    }
}

export const sensorsList_Reduser = ( state = initState, action ) =>{
    switch (action.type) {
        case actionsTypes.REQUEST_SENSORS_LIST: return {
             ...state, 
             loading: true 
        };

        case actionsTypes.SET_SENSORS_LIST: 
        // const sl = [];
        // action.payload.forEach(s=> sl.push(s))
        console.log(Array.isArray(action.payload))
        return {
            sensorsList: action.payload,
            loading:false,
            error: ''
        }

        case actionsTypes.ERROR_ON_REQUEST: return {
            ...state,
            loading:false,
            error: action.payload
        }

        case actionsTypes.SET_IS_INITIATED: return {
            ...state,
            initiated: action.payload
        }

        default: return state;
    }
}