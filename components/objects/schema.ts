import { z } from 'zod';

export const userSchema = z.object({
    firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
    lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    email: z.string().email("Email invalide"),
    phoneNumber: z.string().min(10, "Numéro trop court"),
    password: z.string().min(4, "Mot de passe trop court")
});

export type UserFormData = z.infer<typeof userSchema>;