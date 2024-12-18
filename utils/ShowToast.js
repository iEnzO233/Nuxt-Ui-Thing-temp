/**
 * Show a toast notification.
 * @param {string} type - The toast type ('success', 'error', etc.).
 * @param {string} message - The message to display in the toast.
 */
export function showToast(type, message) {
    switch (type) {
        case 'success':
            useSonner.success("", {description: message});
            break;
        case 'error':
            useSonner.error("", {description: message});
            break
    }
}