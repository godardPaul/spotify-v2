import axios from 'axios';

const token = 'BQD_-hoaVYf0ewOSwiuafYvki9WPbwy4p-CLbt0aoyLBWqkyhoRDelmPHM5jKLRmf_-ZlY2fVS2ZS3loWCEwBQtEYXPVZuRuGJSx0-9367ThhOpZMIHIPrtHdRYxMGKQNs3F8Dk';
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