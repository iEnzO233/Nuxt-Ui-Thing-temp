export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const baseURL = config.public.backBaseUrl;

    // Read the request body
    const postParams = await readBody(event);

    if (!postParams || !postParams.endPoint || !postParams.options) {
        throw createError({
            statusCode: 400,
            statusMessage: "Invalid request parameters",
        });
    }

    const url = baseURL + postParams.endPoint;

    // Forward headers, ensuring the Authorization header and other headers are included
    const headers = {
        ...postParams.options.headers, // Include any headers sent from the client
    };

    if (!headers.Authorization) {
        // Add Authorization token if not explicitly set
        const authToken = getHeader(event, "authorization");
        if (authToken) {
            headers.Authorization = authToken;
        }
    }

    // Configure fetch options
    const fetchOptions = {
        ...postParams.options, // Include all options sent by the client
        headers, // Override headers with merged headers
        method: postParams.options.method || "GET", // Use method from client, default to GET
    };

    try {
        // Send the request to the backend
        const response = await $fetch.raw(url, fetchOptions);

        // Forward status code and response data
        event.res.statusCode = response.status; // Set response status
        return response._data; // Return the response body
    } catch (error) {
        // Handle errors
        event.res.statusCode = error?.response?.status || 500;
        return error.data || { message: "An unexpected error occurred." };
    }
});
