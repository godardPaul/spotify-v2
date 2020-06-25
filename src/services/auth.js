import axios from 'axios';

const token = 'BQDy7Zc7BRfyaZVOO_Z1t698O-1fODpeIlzu2AfaJBmpMsJWpbCY3Fi2QmwKIuZ5Nft5kAsPHnqYnjmLkoQKU4lkFzE2ot_lPM-deLjxV3CtBNmHnmaomnMKPXNemhmJX5hPxzA';
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