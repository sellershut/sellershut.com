export type GraphQLPaginatedResult<T> = {
  data: Result<T>;
};

export type Result<T> = {
  data: Data<T>;
  extensions?: {
    traceId: string;
  };
};

export type Data<T> = {
  [key: string]: Edges<T>;
};

export type Edges<T> = {
  edges: Edge<T>[];
  pageInfo: PageInfo;
};

export type Edge<T> = {
  cursor: string;
  node: T;
};

export type PageInfo = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type GraphQLPaginationProps = {
  after: string;
  before: string;
  first: number;
  last: number;
};
