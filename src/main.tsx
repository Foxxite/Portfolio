/**
 *
 *   Copyright (c) 2022 Foxxite | Articca
 *   All rights reserved.
 *
 * @format
 */

import "./scss/index.scss";

import React, { lazy } from "react";
import ReactDOM from "react-dom/client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Header from "./components/Header/Header";
import Showcases from "./components/Showcases/Showcases";

const queryClient = new QueryClient();

const Repos = lazy(() => import("./components/Repos/Repos"));
const Skyline = lazy(() => import("./components/Skyline/Skyline"));
const Testimonials = lazy(() => import("./components/Testimonials/Testimonials"));

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			<Header />

			<div className="about-skyline">
				<About />

				<Skyline />
			</div>

			<Repos />

			<Showcases />
			<Testimonials />

			<Contact />
		</QueryClientProvider>
	</React.StrictMode>
);
