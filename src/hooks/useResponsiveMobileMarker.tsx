import { useEffect, useRef, useState } from "react";

export function useResponsiveMarker<T extends HTMLElement>(): [
	React.RefObject<T | null>,
	boolean
] {
	const ref = useRef<T>(null);
	const [isMobile, setIsMobile] = useState(false);

	const checkMarker = () => {
		if (!ref.current) return false;
		const marker = window
			.getComputedStyle(ref.current, "::after")
			.getPropertyValue("content")
			.replace(/"/g, "");

		setIsMobile(marker === "mobile");
	};

	useEffect(() => {
		checkMarker();

		const resizeObserver = new ResizeObserver(() => {
			checkMarker();
		});

		if (ref.current) {
			resizeObserver.observe(ref.current);
		}

		window.addEventListener("resize", checkMarker);

		return () => {
			resizeObserver.disconnect();
			window.removeEventListener("resize", checkMarker);
		};
	}, []);

	return [ref, isMobile];
}
