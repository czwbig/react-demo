import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import App from './conponents/Game';
import {reducer} from './reducers/reducers';

// ========================================
const store = createStore(reducer);

store.subscribe(() => {
    console.log(store.getState());
});

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);

