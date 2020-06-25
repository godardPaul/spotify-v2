import axios from 'axios';

const token = 'BQD29BgUJAwiNVmr9SymcG8tq_lRCokkFJmv5mNzLzrykttMWPztIbt64BNVWdpKFZGoqDyPUmbnrXd4gKJzeZPQaR962Tsbcgvwjw0brbNApqNIr_KcEO9Gr-lTiWLsNw5Utm2c6B-ujk6sVA';
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