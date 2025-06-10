// src/types/config.ts

export interface SiteConfig {
	branding: Branding;
	header: HeaderConfig;
	homepage: HomepageConfig;
	categories: CategoriesConfig;
	iframes: IframeConfig;
	footer: FooterConfig;
}

export interface Branding {
	logo: string;
	companyName: string;
	primaryColor: string;
	secondaryColor: string;
	accentColor: string;
}

export interface HeaderConfig {
	navigation: NavigationItem[];
	ctaButton: {
		text: string;
		href: string;
	};
}

export interface NavigationItem {
	label: string;
	href: string;
	highlight?: boolean;
}

export interface HomepageConfig {
	banner: BannerConfig;
	infoSection: InfoSectionConfig;
	coloredSection: ColoredSectionConfig;
	fillSection: FillSectionConfig;
	testimonials: TestimonialSectionConfig;
	resources: ResourcesSectionConfig;
}

export interface BannerConfig {
	title: string;
	description: string;
	backgroundImage: string;
	cards: BannerCard[];
}

export interface BannerCard {
	type: "dsl" | "credit" | "sim" | "fixed";
	label: string;
	href: string;
}

export interface InfoSectionConfig {
	title: string;
	description: string;
	image: string;
	features: FeatureItem[];
}

export interface FeatureItem {
	icon: string;
	title: string;
}

export interface ColoredSectionConfig {
	title: string;
	description: string;
	backgroundColor: string;
	items: ColoredSectionItem[];
}

export interface ColoredSectionItem {
	title: string;
	description: string;
	image: string;
}

export interface FillSectionConfig {
	items: FillSectionItem[];
}

export interface FillSectionItem {
	title: string;
	description: string;
	image: string;
	buttonText: string;
}

export interface TestimonialSectionConfig {
	title: string;
	testimonials: Testimonial[];
}

export interface Testimonial {
	name: string;
	location: string;
	avatar: string;
	quote: string;
	bgColor: "yellow" | "purple" | "teal";
	span?: boolean;
}

export interface ResourcesSectionConfig {
	title: string;
	resources: Resource[];
	ctaText: string;
	helpSection: {
		title: string;
		description: string;
		buttonText: string;
	};
}

export interface Resource {
	title: string;
	date: string;
	duration: string;
	description: string;
	image: string;
	href: string;
}

export interface CategoriesConfig {
	[key: string]: CategoryConfig;
}

export interface CategoryConfig {
	title: string;
	cards: CategoryCard[];
}

export interface CategoryCard {
	title: string;
	features: string[];
	theme: string;
	size?: "small" | "long";
}

export interface IframesConfig {
	[key: string]: IframeConfig;
}

export interface IframeConfig {
	src: string;
	width?: string;
	height?: string;
	scrolling?: string;
}

export interface FooterConfig {
	links: FooterLink[];
	newsletter: {
		title: string;
		placeholder: string;
	};
	social: SocialLink[];
	copyright: string;
	legal: FooterLink[];
}

export interface FooterLink {
	label: string;
	href: string;
}

export interface SocialLink {
	platform: string;
	href: string;
	icon: string;
}
