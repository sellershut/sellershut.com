import axios from 'axios';
import type { GraphQLPaginatedResult, GraphQLPaginationProps } from '$lib/api/response/graphql';
import type { Listing } from '$lib/types/listing';
import { PUBLIC_LISTINGS_API } from '$env/static/public';

export const api = () => ({
  getListings: async (
    pagination: Partial<GraphQLPaginationProps>,
  ): Promise<GraphQLPaginatedResult<Partial<Listing>>> => {
    /* const output = {
      traceparent: null,
      tracestate: null,
    };
    propagation.inject(context.active(), output);
    const { traceparent } = output; */

    const { first, last, before, after } = pagination;

    const response: GraphQLPaginatedResult<Partial<Listing>> = await axios.post(
      PUBLIC_LISTINGS_API,
      {
        /* headers: {
        traceparent,
      }, */
        query: `query listings($after: String, $before: String, $first: Int, $last: Int){
            listings(first: $first, last: $last, before: $before, after: $after){
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
  ): Promise<GraphQLPaginatedResult<Partial<Listing>>> => {
    const { first, last, before, after } = pagination;

    const response: GraphQLPaginatedResult<Partial<Listing>> = await axios.post(
      PUBLIC_LISTINGS_API,
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

});

export default api;
