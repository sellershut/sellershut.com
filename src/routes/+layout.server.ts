import categoriesClient from "$lib/api/grpc/categories-client.server";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async () => {
	const parentCategories = new Promise((resolve, reject) => {
		categoriesClient.subCategories(
			{ pagination: { first: 100 } },
			(error, response) => {
				if (error || response.status || !response.connection) {
					console.error(error);
					reject(error);
				} else {
					console.log(response);
					resolve(response);
				}
			},
		);
	});

	return {
		parentCategories,
	};
};
