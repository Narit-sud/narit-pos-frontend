import axios from "axios";
import { registerUrl, testUrl } from "../../utils/apiUrls";

import { RegisterCredentials } from "./interface";

export async function registerService(
    newUser: RegisterCredentials
): Promise<true> {
    try {
        const response = await axios.post(registerUrl, newUser, {
            withCredentials: true,
        });
        if (response.status === 201) {
            return true;
        } else {
            throw new Error("Registration failed");
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error("Error response:", error.response.data);
            } else if (error.request) {
                // The request was made but no response was received
                console.error("Error request:", error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error("Error message:", error.message);
            }
        }
    }
}

export async function testService(): Promise<void> {
    try {
        const response = await axios.get(testUrl, {
            withCredentials: true,
        });
        console.log(response.data);
    } catch (error) {
        console.error("Error:", error);
    }
}
