const actionsTypes = {
    WRITE_MEASUREMENTS: 'SENSOR/WRITE_MEASUREMENTS',
}

export const writeMeasurementsAction = (data) => ({
    type: actionsTypes.WRITE_MEASUREMENTS,
    payload: data
})

const initialState = {
    measurements: []
}

export const measurementsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.WRITE_MEASUREMENTS:
            return { ...state, measurements: [...state.measurements, action.payload] };
    
        default: return state;
    }
}