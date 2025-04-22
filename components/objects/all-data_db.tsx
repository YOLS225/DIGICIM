import {Transaction, User} from "@/components/objects/interfaces";


export const user:User = {
    email: "digilab@mydigilab.io",
    firstName: "digilab",
    lastName: "Digilab",
    password: "digilab",
    phoneNumber: "0700757873",
    pinCode: "1234",
    balance: 15000000,
};

let users: User[] = [
    {
        id: '1',
        email: "digilab@mydigilab.io",
        firstName: "digilab",
        lastName: "Digilab",
        password: "digilab",
        phoneNumber: "0700757873",
        pinCode: "1234",
        balance: 15000000,
    }
];


let transactions: Transaction[] = [
    {
        id: '1',
        amount: 5000,
        transactionType: 'recharge',
        date: new Date().toISOString(),
        status: "FAILED",
    }
];