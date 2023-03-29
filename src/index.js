import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import registerServiceWorker from "./registerServiceWorker";
// import PlayersStore from './stores/app.store';
import Store from "./stores";

//
// const localStorageKey = 'rugby-field';
//
// const initialState = localStorage.getItem(localStorageKey)
// 	? JSON.parse(localStorage.getItem(localStorageKey))
// 	: {players: []};
//
// let store;
// let snapshotListener;
//
// // Todo: change localstorage to Dexie.js
// // Todo: make migrate to firebase
// function createRugbyFieldStore(snapshot) {
// 	// clean up snapshot listener
// 	if (snapshotListener) snapshotListener();
// 	// kill old store to prevent accidental use and run clean up hooks
// 	if (store) destroy(store);
//
// 	// create new one
// 	store = PlayersStore.create(snapshot);
//
// 	// connect devtools
// 	makeInspectable(store);
// 	// connect local storage
// 	snapshotListener = onSnapshot(store, snapshot => localStorage.setItem(localStorageKey, JSON.stringify(snapshot)));
// 	return store
// }

// function renderApp(App, store) {
// 	render(<App store={store}/>, document.getElementById("app"));
// 	registerServiceWorker();
// }

// // Initial render
// renderApp(App, Store);

// // Connect HMR
// if (module.hot) {
// 	// module.hot.accept(["./stores/app.store"], () => {
// 	// 	// Store definition changed, recreate a new one from old state
// 	// 	renderApp(App, createRugbyFieldStore(getSnapshot(store)))
// 	// });

// 	module.hot.accept(["./App"], () => {
// 		// Componenent definition changed, re-render app
// 		renderApp(App, Store)
// 	})
// }

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App store={Store}/>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
