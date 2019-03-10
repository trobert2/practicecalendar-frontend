import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './services/serviceWorker';

//import './index.css';
import Routes from './components/routes';

ReactDOM.render(<Routes />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
