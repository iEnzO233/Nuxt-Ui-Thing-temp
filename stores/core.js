import { useCookie } from "#app";
import { ref } from "vue";
import { defineStore } from "pinia";

export const useCoreStore = defineStore("core", () => {
    const TOKEN_KEY = "auth_token";
    const requestLoading = ref(false);
    // Token Management
    const getToken = () => {
        return useCookie(TOKEN_KEY, { path: "/", sameSite: "strict" }).value; // Ensure the token is scoped properly
    };

    const saveToken = (token) => {
        useCookie(TOKEN_KEY, {
            path: "/", // Make cookie available across the app
            sameSite: "strict", // Protect against CSRF
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        }).value = token; // Save token to cookie
        console.log("Token saved:", token);
    };

    const destroyToken = () => {
        useCookie(TOKEN_KEY, { path: "/" }).value = null; // Clear token by setting it to null
    };

    return {
        requestLoading,
        getToken,
        saveToken,
        destroyToken,
    };
});
