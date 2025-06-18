import { useLayoutEffect } from "react";

export const useDisableBodyScroll = (hide = true) => {
	useLayoutEffect(() => {
		if (hide) {
			document.body.style.overflow = "hidden";
		}

		return () => {
			document.body.style.overflow = "";
		};
	}, [hide]);
};
