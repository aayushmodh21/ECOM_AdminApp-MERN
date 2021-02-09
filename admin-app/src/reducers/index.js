import authReducer from './auth.reducers';
import userReducers from './user.reducers';
import productReducer from './product.reducer';
import categoryReducer from './category.reducer';
import orderReducer from './order.reducer';
import { combineReducers } from 'redux';
import pageReducers from './page.reducers';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducers,
    product: productReducer,
    category: categoryReducer,
    page: pageReducers,
    order: orderReducer
})

export default rootReducer;