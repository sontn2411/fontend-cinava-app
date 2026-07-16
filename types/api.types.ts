/** Standard API error response */
export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

/** Standard API success response wrapper */
export interface ApiResponse<T> {
  data: T;
  message?: string;
}
