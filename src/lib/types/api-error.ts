export type APIError = {
  message: string;
  location: { line: number; column: number }[];
  extensions?: {
    code: string;
    exception: {
      stacktrace: string[];
    };
  };
};
