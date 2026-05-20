export type ApiSuccess<T> = {
  success: true;
  data: T;
};

export type PaginatedApiSuccess<T> = {
  success: true;
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};
