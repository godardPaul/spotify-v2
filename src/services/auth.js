import axios from 'axios';

const token = 'BQAfLOudpPqvWEFFJzHiuW3B_x9D85AM8c7XLqeT4Es9VeI6BxFSPyX5y_RKtqOeTRNSZStBPLC8_PtGEKUYxrx53NPjt4TUTqk7Bi1kTAFyptOyQs7dpahLkL-pYK-ztHvr8Q0';
export const getCategories = async() => {
    try {
        const response = await axios.get(
            '	https://api.spotify.com/v1/browse/categories', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
}