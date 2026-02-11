export interface paymentType {
    donor: string;
    to_user: string;
    order_id: string;
    amount: number;
    message?: string;
    createdAt?: Date;
    updatedAt?: Date;
    done: boolean;
}

export interface userType {
    name: string;
    email: string;
    username: string;
    image?: string;
    coverImage?: string;
    cashfreeClientId?: string;
    cashfreeClientSecret?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface OrderRequest {
    order_id: string;
    order_amount: number;
    order_currency: string;
    customer_details: {
        customer_id: string;
        customer_name: string;
        customer_email: string;
        customer_phone: string;
    };
    order_meta: {
        return_url: string;
    };
    order_note: string;
}
