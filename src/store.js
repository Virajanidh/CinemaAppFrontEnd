import { createStore, applyMiddleware ,compose} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import rootReducer from './Reducers';


const middleware = [thunk];
const initialState = {};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, initialState,
  composeWithDevTools(
    applyMiddleware(thunk),
  
  )
)

export default store;