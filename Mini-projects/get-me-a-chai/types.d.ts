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
    razorpayId?: string;
    razorpaySecret?: string;
    createdAt?: Date;
    updatedAt?: Date;
}