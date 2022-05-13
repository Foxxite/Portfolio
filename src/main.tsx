/**
 *
 *   Copyright (c) 2022 Foxxite | Articca
 *   All rights reserved.
 *
 * @format
 */

import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header/Header";
import Repos from "./components/Repos/Repos";

import "./scss/index.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Header />
		<Repos />
	</React.StrictMode>
);
