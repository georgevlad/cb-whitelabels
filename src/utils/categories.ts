import { CategoryItem } from "@/types/config";

export const getCardSize = (child: CategoryItem): string => {
	if (!child.children || child.children.length <= 1) return "small";
	if (child.children.length > 4) return "long";
	return "";
};
