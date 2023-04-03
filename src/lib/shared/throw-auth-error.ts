import type { APIError } from '$lib/types/api-error';

export const throwAuthError = (apiCall: string, response: { data: { errors: APIError[] } }) => {
  const { errors } = response.data;
  if (errors) {
    throw new Error(apiCall, { cause: errors[0].message });
  }
};
export default throwAuthError;
