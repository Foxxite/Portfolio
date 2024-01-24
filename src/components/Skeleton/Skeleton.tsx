/**
 * Copyright (c) 2024 Foxxite | Articca
 *   All rights reserved.
 *
 * @format
 */

import styles from "./Skeleton.module.scss";

function Skeleton(props: { width?: string; height?: string; className?: string }) {
	const { width, height, className } = props;

	return (
		<div
			className={`${styles.skeleton} ${className}`}
			style={{
				width: width,
				height: height,
			}}></div>
	);
}

export default Skeleton;
