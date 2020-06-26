import axios from 'axios';

const token = 'BQBfNibXxMbzDXz8ObEn7IP-bpPqAjp9H79FLcmua_BhRgO3htSe8m7ibp1UkABktYuKwCzXKXW22uwITjf4oJxz9nKWJ_ZXXX1MxCZMHK_Dc1pn8rhfXU_5aNwg49fE06PfHtw';
export const getCategories = async() => {
    try {
        const response = await axios.get(
            '	https://api.spotify.com/v1/browse/categories', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    limit: 50,
                    country: 'FR',
                    locale: 'fr_FR'
                }
            }
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
}