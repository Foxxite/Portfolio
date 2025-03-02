/**
 * Copyright (c) 2025 Foxxite | Articca
 *   All rights reserved.
 *
 * @format
 */

function GradientText({ children }: { children: string }) {
	return (
		<span className="bg-radial from-[#FF7F2A] from-40% to-primary bg-clip-text text-transparent">{children}</span>
	);
}

export default GradientText;
