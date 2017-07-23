import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {routerMiddleware} from 'react-router-redux';
import {middleware as awaitMiddleware} from 'redux-await';
import rootReducers from './reducers';

export default function configureStore(initialState = {}, {routerHistory}) {
    var devTool = f => f;
    if(typeof window !== 'undefined'){
        devTool = window.devToolsExtension ? window.devToolsExtension() : f => f;
    }

    return createStore(
        combineReducers(rootReducers),
        initialState,
        compose(
            applyMiddleware(thunkMiddleware, awaitMiddleware, routerMiddleware(routerHistory)),
            devTool
        )
    )
}