import { defineStore } from "pinia";
import ApiService from "~/utils/ApiService";
import { useCoreStore } from "~/stores/core";

export const useAuthStore = defineStore("auth", () => {
    const coreStore = useCoreStore();

    // State
    const token = ref(null);
    const authenticated = ref(false);
    const loading = ref(false);
    const phoneNumber = ref("");
    const otpCode = ref("");
    const otpSent = ref(false);
    const timer = ref(0);
    let timerInterval = null;
    const password = ref("");
    const passwordConfirmation = ref("");
    const forgetPasswordStep = ref(1);
    const profile = ref({
        firstname: "",
        lastname: "",
        email: "",
        mobile: "",
        phone: "",
        national_code: "",
        address: "",
        postal_code: "",
    });

    // Utility Functions
    const startTimer = () => {
        timer.value = 120;
        timerInterval = setInterval(() => {
            if (timer.value > 0) timer.value--;
            else clearInterval(timerInterval);
        }, 1000);
    };

    const resetOtpState = () => {
        otpSent.value = false;
        otpCode.value = "";
        timer.value = 0;
        if (timerInterval) clearInterval(timerInterval);
    };

    const resetFormState = () => {
        phoneNumber.value = "";
        otpCode.value = "";
        password.value = "";
        passwordConfirmation.value = "";
        otpSent.value = false;
        forgetPasswordStep.value = 1;
        timer.value = 0;
        if (timerInterval) clearInterval(timerInterval);
    };

    // Auth Functions
    const sendOtp = async () => {
        try {
            const { data } = await ApiService.post("/login-register", { mobile: phoneNumber.value });
            otpSent.value = true;
            startTimer();
        } catch (error) {
            console.error("Failed to send OTP:", error);
        }
    };

    const handleLogin = async () => {
        try {
            const { data } = await ApiService.post("/otp", { mobile: phoneNumber.value, code: otpCode.value });
            coreStore.saveToken(data.token); // Save token to cookie
            setAuthData(data.user, data.token);
            navigateTo("/");
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const loginWithPassword = async () => {
        try {
            const { data } = await ApiService.post("/login", { mobile: phoneNumber.value, password: password.value });
            coreStore.saveToken(data.token); // Save token to cookie
            setAuthData(data.user, data.token);
            navigateTo("/");
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const sendForgotPasswordOtp = async () => {
        try {
            const { data } = await ApiService.post("/password/forgot", { mobile: phoneNumber.value });
            otpSent.value = true;
            forgetPasswordStep.value = 2;
            startTimer();
        } catch (error) {
            console.error("Failed to send OTP for password reset:", error);
        }
    };

    const resetPassword = async () => {
        try {
            await ApiService.post("/password/reset", {
                mobile: phoneNumber.value,
                token: otpCode.value,
                password: password.value,
                password_confirmation: passwordConfirmation.value,
            });
            resetFormState();
        } catch (error) {
            console.error("Password reset failed:", error);
        }
    };

    const logout = () => {
        coreStore.destroyToken(); // Clear token from cookie
        token.value = null;
        authenticated.value = false;
        profile.value = null;
        navigateTo("/auth/login");
    };

    const checkAuth = async () => {
        try {
            const { data } = await ApiService.get("/check-token");
            authenticated.value = true;
            token.value = coreStore.getToken();
            profile.value = data.user || {};
        } catch (error) {
            logout();
        }
    };

    // Helper to process login data
    const setAuthData = (user, authToken) => {
        token.value = authToken;
        authenticated.value = true;
        profile.value = user;
        console.log("User authenticated:", user);
    };

    return {
        // State
        authenticated,
        token,
        loading,
        phoneNumber,
        otpCode,
        otpSent,
        timer,
        password,
        passwordConfirmation,
        forgetPasswordStep,
        profile,

        // Actions
        sendOtp,
        handleLogin,
        loginWithPassword,
        sendForgotPasswordOtp,
        resetPassword,
        logout,
        checkAuth,
        resetOtpState,
        resetFormState,
    };
});
