// Action types
const SET_DATA_STOCK = "setStockData";

// action pour changer le contenu du variable de store stock
export const setStockData = (stock) => {
    return {
        type: SET_DATA_STOCK,
        payload: stock,
    };
};
// action pour changer la variable du store istrans
export const setistrans = (stock) => {
    return {
        type: "set_transforme",
        payload: stock,
    };
};
// action pour changer la variable du store modalLoading
export const setmodalLoading = (value) => {
    return {
        type: "modal_loading",
        modalLoading: value,
    };
};
//cette variable pour faire la mise à jour lorsque on fait le transfet du stoock en poche du sang 
export const setupdate = (value) => {
        return {
            type: "update",
            update: value
        }
    }
    // Reducer
const initState = {
    stocks: [],
    update: false,
    istrans: false,
    modalLoading: false,
};
// selon le type d'action on change une variable du store
export default function reducer(state = initState, action) {
    switch (action.type) {
        case SET_DATA_STOCK:
            return {
                ...state,
                stocks: action.payload,
            };

        case "set_transforme":
            return {
                ...state,
                istrans: action.payload,
            };
        case "modal_loading":
            return {...state, modalLoading: action.modalLoading };
            break;
        case "update":
            return {...state, update: action.update };
            break;
        default:
            return state;
    }
}