import { excludeKeyFromObject } from 'functions/functions';

export const initState = {
    forms: {}
    
};

const actionsTypes = {
    SET_FIELD: 'FORMS_DATA/SET_FIELD',
    RESET_FORM: 'FORMS_DATA/RESET_FORM',
};

export const setField_Action = (formType, fieldName, value) => ({
    type: actionsTypes.SET_FIELD,
    payload: { formType, fieldName, value }
});
export const resetForm_Action = (formType) =>({
    type: actionsTypes.RESET_FORM,
    payload: formType
});

export const formsData_Reducer = (state = initState, action) => {
    switch (action.type) {
        case actionsTypes.SET_FIELD : 
            const { formType, fieldName, value } = action.payload;
            return {
                ...state,
                forms: {
                    ...state.forms,
                    [formType]: {
                        ...state.forms[formType],
                        [fieldName]: value
                    }
                }
            };
        
        case actionsTypes.RESET_FORM: return {
            ...state,
            forms: excludeKeyFromObject(state.forms, action.payload)
        }
    
        default: return state;
    }
}