import axios from 'axios';

const token = 'BQAoJlWHBWKN8SBzM9E8sq8KePg1uNdPjbHg8Jgqtqlnsm5KAacHXOhHwzO5qVG3cWfWnFUC72gRSho7NcInnYRiIdg5GlAYQGarXjY7TWN8tRL6BQCU4VbD2ByqADuL2ZbOcEU';
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