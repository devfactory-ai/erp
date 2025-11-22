const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8787/api';

export async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const token = localStorage.getItem('token');
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(options?.headers as Record<string, string>),
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
}

export async function getList<T>(module: string, doctype: string): Promise<T[]> {
    return fetchAPI<T[]>(`/${module}/${doctype}`);
}

export async function createDoc(module: string, doctype: string, data: any): Promise<{ success: boolean; id: string }> {
    return fetchAPI(`/${module}/${doctype}`, {
        method: 'POST',
        body: JSON.stringify(data),
    });
}
