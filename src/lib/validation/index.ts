import { z } from "zod"

export const SignupValidationSchema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
    username: z.string().min(2, { message: 'Username must be at least 2 characters long' }),
    email: z.string().email({ message: 'Please enter a valid email address' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
})

export const ProfileValidationSchema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
    username: z.string().min(2, { message: 'Username must be at least 2 characters long' }),
    email: z.string().email({ message: 'Please enter a valid email address' }),
    bio: z.string()
        .max(2200)
        .min(5, { message: 'Caption must be at least 5 characters long' }),
    file: z.custom<File[]>(),
})


export const SiginValidationSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email address' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
})

export const PostValidationSchema = z.object({
    caption: z.string()
        .max(2200)
        .min(5, { message: 'Caption must be at least 5 characters long' }),
    tags: z.string(),
    file: z.custom<File[]>(),
    location: z.string()
        .max(100)
        .min(2, { message: 'Location must be at least 2 characters long' }),
})

