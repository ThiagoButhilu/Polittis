// Enums
export enum ProductType {
    SIMPLE = "SIMPLE",
    CUSTOM = "CUSTOM",
  }
  
  export enum RequestStatus {
    pending = "pending",
    paid = "paid",
    canceled = "canceled",
    processing = "processing",
    delivered = "delivered",
  }
  
  // Interfaces (baseadas no schema Prisma)
  export interface User {
    id: number;
    name: string;
    phone: string;
    email: string;
    password: string;
  
    addresses?: Address[];
    requests?: Request[];
  }
  
  export interface Address {
    id: number;
    street: string;
    number: string;
    comp?: string;
    cep: string;
    state: string;
    city: string;
    district: string;
  
    user_id: number;
    user?: User;
  }
  
  export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity?: number;
    image_url: string;
    category: string;
    created_at: Date;
    type: ProductType;
  
    requests?: Request[];
    components?: ProductComponent[];
  }
  
  export interface ProductComponent {
    id: number;
    name: string;       // Ex: "Recheio de chocolate", "12 cupcakes"
    quantity?: number;
    product_id: number;
  
    product?: Product;
  }
  
  export interface Request {
    id: number;
    quantity: number;
    observation?: string;
    price: number;
    status: RequestStatus;
    created_at: Date;
    updated_at: Date;
    delivery_date: Date;
    delivery_time?: string;
  
    user_id: number;
    product_id: number;
  
    user?: User;
    product?: Product;
    payments?: Payment[];
  }
  
  export interface Payment {
    id: number;
    provider: string;     // "stripe", "mercadopago"
    provider_id: string;  // ID da transação no provedor
    amount: number;
    status: string;       // "approved", "failed", etc.
    created_at: Date;
  
    request_id: number;
    request?: Request;
  }
  