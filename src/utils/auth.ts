export const loginWithSocial = (provider: "facebook" | "google") => {
    window.location.href = `${import.meta.env.VITE_BASE_SERVER_URL}/oauth2/authorization/${provider}`
}