import { IHttpClient } from "./interface";

class HttpClient implements IHttpClient {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async get<T>(url: string, headers: Record<string, string> = {}): Promise<T> {
        const response = await fetch(`${this.baseUrl}${url}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
        });
        this.handleErrors(response);
        return response.json();
    }

    async post<T>(url: string, body: any, headers: Record<string, string> = {}): Promise<T> {
        const response = await fetch(`${this.baseUrl}${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            body: JSON.stringify(body),
        });
        this.handleErrors(response);
        return response.json();
    }

    async put<T>(url: string, body: any, headers: Record<string, string> = {}): Promise<T> {
        const response = await fetch(`${this.baseUrl}${url}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            body: JSON.stringify(body),
        });
        this.handleErrors(response);
        return response.json();
    }

    async patch<T>(url: string, body: any, headers: Record<string, string> = {}): Promise<T> {
        const response = await fetch(`${this.baseUrl}${url}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            body: JSON.stringify(body),
        });
        this.handleErrors(response);
        return response.json();
    }

    async delete<T>(url: string, headers: Record<string, string> = {}): Promise<T> {
        const response = await fetch(`${this.baseUrl}${url}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
        });

        this.handleErrors(response);

        if (response.status !== 204) {
            return await response.json();
        }

        return {} as T;
    }

    private handleErrors(response: Response) {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    }
}

export default HttpClient;
