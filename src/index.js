import { render } from "react-dom";
import {createRoot}from "react-dom";        // <--- new ````````````````````````````````````````
import 'bootstrap/dist/css/bootstrap.css'
import App from './Frontend/components/App';
import * as serviceWorker from './serviceWorker';

const rootElement = document.getElementById("root");
render( <App />, rootElement);

// require('dotenv').config();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();