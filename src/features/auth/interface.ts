export interface RegisterCredentials {
    id: string;
    name: string;
    surname: string;
    email: string;
    phoneNumber: string;
    username: string;
    password: string;
    confirmPassword?: string; // Optional field for confirm password
}

export interface LoginCredentials {
    username: string;
    password: string;
}

export function createNewRegisterCredentials(): RegisterCredentials {
    return {
        id: "",
        name: "",
        surname: "",
        email: "",
        phoneNumber: "",
        username: "",
        password: "",
    };
}
