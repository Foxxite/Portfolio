/** @format */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import vitePluginRequire from "vite-plugin-require";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), vitePluginRequire()],
	base: "",

	server: {
		cors: {
			origin: "*",
			methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
			allowedHeaders: ["Content-Type", "Authorization"],
		},
	},
});
