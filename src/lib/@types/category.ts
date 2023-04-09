export type Category = {
	id: number;
	name: string;
	parentId: number;
	imageUrl: string;
};

export type CategoriesResult = {
	categories: Category[];
	pages: number;
};
