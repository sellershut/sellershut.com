import axios from 'axios';
import type { GraphQLPaginatedResult, GraphQLPaginationProps } from '$lib/api/response/graphql';
import type { Category } from '$lib/types/category';
import type { SliderCategory } from '.';
import { PUBLIC_CATEGORIES_API } from '$env/static/public';

export const api = () => ({
  getParentCategories: async (
    pagination: Partial<GraphQLPaginationProps>,
    id?: string
  ): Promise<SliderCategory[]> => {
    const categories = await api().getSubCategories(pagination, id);

    const names = categories.data?.data.subCategories.edges.map((category) => {
      const { name } = category.node;
      return { id: category.node.id!, text: name! };
    });
    return names;
  },
  getSubCategories: async (
    pagination: Partial<GraphQLPaginationProps>,
    id?: string
  ): Promise<GraphQLPaginatedResult<Partial<Category>>> => {
    /* const output = {
      traceparent: null,
      tracestate: null,
    };
    propagation.inject(context.active(), output);
    const { traceparent } = output; */

    const { first, last, before, after } = pagination;

    const response: GraphQLPaginatedResult<Partial<Category>> = await axios.post(
      PUBLIC_CATEGORIES_API,
      {
        /* headers: {
        traceparent,
      }, */
        query: `query subCategories($id: String, $after: String, $before: String, $first: Int, $last: Int){
            subCategories(parentId: $id, first: $first, last: $last, before: $before, after: $after){
              edges {
                cursor
                node {
                  id,
                  name,
                  imageUrl,
                  parentId,
                  subCategories
                }
              },
              pageInfo {
                hasNextPage
                hasPreviousPage
              }
            }
          }`,
        variables: {
          id,
          after: after ?? undefined,
          before: before ?? undefined,
          first: first ?? undefined,
          last: last ?? undefined,
        },
      }
    );

    return response;
  },
  search: async (
    pagination: Partial<GraphQLPaginationProps>,
    query: string
  ): Promise<GraphQLPaginatedResult<Partial<Category>>> => {
    const { first, last, before, after } = pagination;

    const response: GraphQLPaginatedResult<Partial<Category>> = await axios.post(
      PUBLIC_CATEGORIES_API,
      {
        /* headers: {
        traceparent,
      }, */
        query: `query search($query: String, $after: String, $before: String, $first: Int, $last: Int){
            search(query: $query, first: $first, last: $last, before: $before, after: $after){
              edges {
                cursor
                node {
                  id,
                  name,
                  parentId
                }
              },
            }
          }`,
        variables: {
          query,
          after: after ?? undefined,
          before: before ?? undefined,
          first: first ?? 10,
          last: last ?? undefined,
        },
      }
    );

    return response;
  },

  searchWithParentName: async (
    pagination: Partial<GraphQLPaginationProps>,
    query: string
  ): Promise<
    GraphQLPaginatedResult<Partial<{ category: Partial<Category>; parentName?: string }>>
  > => {
    const { first, last, before, after } = pagination;

    const response: GraphQLPaginatedResult<
      Partial<{ category: Partial<Category>; parentName?: string }>
    > = await axios.post(PUBLIC_CATEGORIES_API, {
      /* headers: {
        traceparent,
      }, */
      query: `query search($query: String, $after: String, $before: String, $first: Int, $last: Int){
            searchWithParentName(query: $query, first: $first, last: $last, before: $before, after: $after){
              edges {
                cursor
                node {
                  category {
                    id,
                    name,
                    parentId,
                    subCategories
                  },
                  parentName
                }
              },
            }
          }`,
      variables: {
        query,
        after: after ?? undefined,
        before: before ?? undefined,
        first: first ?? 10,
        last: last ?? undefined,
      },
    });

    return response;
  },
});

export default api;
