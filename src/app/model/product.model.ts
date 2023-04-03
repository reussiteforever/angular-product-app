export interface Product {
    id: string;
    price: number;
    name: string;
    promotion: boolean;
}

export interface PageProduct {
    products: Product[];
    page: number;
    size: number;
    totalPages: number;
}