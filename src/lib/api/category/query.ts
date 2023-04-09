import axios from 'axios';
import type { CategoriesResult } from '$lib/@types/category';
import { PUBLIC_API_ENDPOINT } from '$env/static/public';

export const keyRootCategories = 'rootCategories';

export const findCategories = async (
	maxPerPage: number,
	id = 0,
	page = 1
): Promise<CategoriesResult> => {
	const response = await axios({
		url: PUBLIC_API_ENDPOINT,
		method: 'post',
		data: {
			query: `
            query {
                findCategoriesInPage(page: ${page}, maxPerPage: ${maxPerPage}, parentId: ${id}){
                    categories {
                        name
                    },
                    pages
                }
            }
            `
		}
	});

	return response.data.data.findCategoriesInPage;
};

export default findCategories;
