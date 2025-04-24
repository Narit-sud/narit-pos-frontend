import type { RegisterCredentials } from "./interface";

interface RegisterValidation {
    valid: boolean;
    message?: string;
}
export function validateRegister(
    credentials: RegisterCredentials
): RegisterValidation {
    // check name
    if (!credentials.name) {
        return { valid: false, message: "Name is required" };
    } else if (credentials.name.length < 3) {
        return {
            valid: false,
            message: "Name must be at least 3 characters long",
        };
    } else if (credentials.name.length > 20) {
        return {
            valid: false,
            message: "Name must be at most 20 characters long",
        };
    }
    // check surname
    if (!credentials.surname) {
        return { valid: false, message: "Surname is required" };
    } else if (credentials.surname.length < 3) {
        return {
            valid: false,
            message: "Surname must be at least 3 characters long",
        };
    } else if (credentials.surname.length > 20) {
        return {
            valid: false,
            message: "Surname must be at most 20 characters long",
        };
    }
    // check email
    if (!credentials.email) {
        return { valid: false, message: "Email is required" };
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(credentials.email)) {
        return { valid: false, message: "Invalid email format" };
    }

    // check phone number
    if (!credentials.phoneNumber) {
        return { valid: false, message: "Phone number is required" };
    }
    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(credentials.phoneNumber)) {
        return { valid: false, message: "Phone number must be 10 digits" };
    }

    // check username
    if (!credentials.username) {
        return { valid: false, message: "Username is required" };
    } else if (credentials.username.length < 3) {
        return {
            valid: false,
            message: "Username must be at least 3 characters long",
        };
    } else if (credentials.username.length > 16) {
        return {
            valid: false,
            message: "Username must be at most 16 characters long",
        };
    }

    // check password
    if (!credentials.password) {
        return { valid: false, message: "Password is required" };
    }
    if (credentials.password.length < 8) {
        return {
            valid: false,
            message: "Password must be at least 8 characters long",
        };
    }
    // Password must have:
    // - At least one lowercase letter
    // - At least one uppercase letter
    // - At least one digit
    // - At least one special character
    const passwordPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.]).+$/;
    if (!passwordPattern.test(credentials.password)) {
        return {
            valid: false,
            message:
                "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
        };
    }

    // check password confirmation
    if (credentials.password !== credentials.confirmPassword) {
        return { valid: false, message: "Passwords do not match" };
    }

    return { valid: true };
}
