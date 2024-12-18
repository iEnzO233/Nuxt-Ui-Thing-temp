import {showToast} from "~/utils/ShowToast.js";

class ApiService {
    /**
     * @description Set the default headers for all requests.
     * Includes Authorization header if a token exists in the core store.
     */
    static setHeader() {
        const coreStore = useCoreStore();
        const token = coreStore.getToken();
        return {
            Accept: "application/json",
            Authorization: token ? `Bearer ${token}` : undefined,
        };
    }

    /**
     * @description Handle success responses with toast notifications.
     * @param {Object} response - The response object from the server.
     */
    static handleSuccess(response) {
        const { meta } = response;
        const ignoredMessages = ["Done!", "Done"];

        if (meta?.status === true && meta.message && !ignoredMessages.includes(meta.message)) {
            showToast('success', meta.message);
        }
    }

    /**
     * @description Handle error responses with toast notifications.
     * @param {Object} error - The error object from the server.
     */
    static handleError(error) {
        const meta = error?.data?.meta;

        if (meta) {
            // Show specific field errors if available
            if (meta.errors && Object.keys(meta.errors).length > 0) {
                Object.values(meta.errors).flat().forEach(err => {
                    showToast("error", err);
                });
            }
            // Show the main error message if present
            else if (meta.message) {
                showToast("error", meta.message);
            }
        } else {
            // Fallback for unexpected errors
            showToast("error", error?.message || "An unexpected error occurred.");
        }
    }

    /**
     * @description Perform a fetch request using `useFetch`.
     * @param {string} endpoint - The API endpoint to call.
     * @param {Object} options - Options for the request, including method, headers, and body.
     * @param retries
     * @returns {Promise} A promise resolving to the response or rejecting with an error.
     */
    static async request(endpoint, options = {}, retries = 3) {
        const coreStore = useCoreStore();
        coreStore.requestLoading = true; // Indicate loading state
        const baseURL = "/api/handleRequest";

        try {
            const response = await $fetch(baseURL, {
                method: "POST", // Proxy request always uses POST to /api/handleRequest
                headers: { ...ApiService.setHeader(), ...options.headers },
                body: {
                    endPoint: endpoint,
                    options: {
                        ...options,
                        method: options.method || "GET", // Default to GET if no method specified
                    },
                },
            });

            ApiService.handleSuccess(response);
            return response;
        } catch (err) {
            if (retries > 0) {
                return ApiService.request(endpoint, options, retries - 1);
            }
            ApiService.handleError(err);
            throw err;
        } finally {
            coreStore.requestLoading = false; // Reset loading state
        }
    }


    /**
     * @description Send a GET request.
     * @param {string} endpoint - The API endpoint to call.
     * @param {Object} params - Query parameters for the request.
     * @returns {Promise} A promise resolving to the response or rejecting with an error.
     */
    static get(endpoint, params = {}) {
        return ApiService.request(endpoint, { method: "GET", params });
    }

    /**
     * @description Send a POST request.
     * @param {string} endpoint - The API endpoint to call.
     * @param {Object} data - The body of the request.
     * @returns {Promise} A promise resolving to the response or rejecting with an error.
     */
    static post(endpoint, data = {}) {
        return ApiService.request(endpoint, { method: "POST", body: data });
    }

    /**
     * @description Send a PUT request.
     * @param {string} endpoint - The API endpoint to call.
     * @param {Object} data - The body of the request.
     * @returns {Promise} A promise resolving to the response or rejecting with an error.
     */
    static put(endpoint, data = {}) {
        return ApiService.request(endpoint, { method: "PUT", body: data });
    }

    /**
     * @description Send a DELETE request.
     * @param {string} endpoint - The API endpoint to call.
     * @returns {Promise} A promise resolving to the response or rejecting with an error.
     */
    static delete(endpoint) {
        return ApiService.request(endpoint, { method: "DELETE" });
    }
}

export default ApiService;
