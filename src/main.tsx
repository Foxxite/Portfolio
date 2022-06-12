/**
 *
 *   Copyright (c) 2022 Foxxite | Articca
 *   All rights reserved.
 *
 * @format
 */

import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header/Header";

import "./scss/index.scss";

const Repos = lazy(() => import("./components/Repos/Repos"));
const Skyline = lazy(() => import("./components/Skyline/Skyline"));
const Testimonials = lazy(() => import("./components/Testimonials/Testimonials"));

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Header />

		<Skyline />
		<Repos />

		<Testimonials />
	</React.StrictMode>
);
