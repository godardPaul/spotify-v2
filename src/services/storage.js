export const getSessionStorageToken = () => {
    return localStorage.getItem("token");
};

export const setSessionStorageToken = (token) => {
    sessionStorage.setItem("token", token);
};

export const clearSessionStorage = () => {
    sessionStorage.clear();
};