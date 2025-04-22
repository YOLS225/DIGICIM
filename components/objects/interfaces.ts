export interface User{
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    phoneNumber?: string;
    pinCode?: string;
    balance?: number;
    createdAt?: string;
}
export type TransactionType = 'recharge' | 'paiement';
export interface Transaction{
    id?: string;
    amount?: number;
    date?: string;
    transactionType?: TransactionType,
    status?: string;
}

export interface OTP {
    phoneNumber: string;
    code: string;
    expiresAt: number; // Timestamp
}

export interface RegisterForm {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    password: string;
}