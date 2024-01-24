/**
 * Copyright (c) 2024 Foxxite | Articca
 *   All rights reserved.
 *
 * @format
 */

export const capitalize = (s: string) => {
	if (typeof s !== "string") return "";
	return s.charAt(0).toUpperCase() + s.slice(1);
};
