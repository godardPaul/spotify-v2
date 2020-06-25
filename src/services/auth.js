import axios from 'axios';

export const getCategories = async() => {
    try {
        const response = await axios.get(
            '	https://api.spotify.com/v1/browse/categories', {
                headers: {
                    Authorization: 'Bearer BQBJzqLYIGnWsGWjCw08ktnNFIFXLsJUuDZDY_1I1MJphgw2tsu7wXF-v6bWPHiDva_An-RsroPtpjG0CzwpOMAmf7wfRX7R6MOSbUiKPz-CEDc2vi93q1o4a92nWjD-dxy1Yd8'
                },
            }
        );
        console.log(response.data);
        return response.data.access_token;
    } catch (error) {
        console.log(error);
    }
}