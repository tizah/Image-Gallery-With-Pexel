import { createStore, applyMiddleware, combineReducers} from "redux";
import thunk from "redux-thunk";

import photoReducer from "./reducers/photoReducer";


const rootReducer = combineReducers({
    photos: photoReducer
});


const store = createStore(
    rootReducer,
applyMiddleware(thunk)
);

export type RootState = ReturnType<typeof rootReducer>;
export default store;