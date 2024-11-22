export interface IHttpClient {
    get<T>(url: string, headers?: Record<string, string>): Promise<T>;

    post<T>(url: string, body: any, headers?: Record<string, string>): Promise<T>;

    put<T>(url: string, body: any, headers?: Record<string, string>): Promise<T>;  // Novo método PUT

    patch<T>(url: string, body: any, headers?: Record<string, string>): Promise<T>;

    delete<T>(url: string, headers?: Record<string, string>): Promise<T>;
}
