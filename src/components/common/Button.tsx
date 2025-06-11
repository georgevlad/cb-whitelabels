"use client";

import Link from "next/link";

interface ButtonProps {
	href?: string;
	onClick?: () => void;
	variant?: "primary" | "outline";
	className?: string;
	children: React.ReactNode;
	[key: string]: any;
}

export default function Button({
	href,
	onClick,
	variant = "primary",
	className = "",
	children,
	...rest
}: ButtonProps) {
	const baseClasses = variant === "outline" ? "btn btn-more" : "btn";
	const classes = `${baseClasses} ${className}`;

	if (href) {
		return (
			<Link href={href} className={classes}>
				{children}
			</Link>
		);
	}

	return (
		<button onClick={onClick} className={classes} {...rest}>
			{children}
		</button>
	);
}
