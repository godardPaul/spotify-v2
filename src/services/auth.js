import axios from 'axios';

const token = 'BQB6o6ADRq_DwaQhPEpkomcyI8k2l5aFXRQCDQ5T0UGmsSdLhpQRmNMqmmOjBvQ9uVPBtD2Q0patdtZmftQtgjmrO-vMXYfM1bIRfeDQjgIQV__xZAL_jxvf9vnE5O8t9xBAiKw';
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