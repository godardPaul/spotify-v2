export const getLikesFromStorage = () => {
    return JSON.parse(localStorage.getItem("likes"));
};

export const setLikesInStorage = (newLike) => {
    localStorage.setItem("likes", JSON.stringify(newLike));
};

export const isLiked = (category) => {
    const currentLikes = localStorage.getItem('likes');
    let objectLikes = JSON.parse(currentLikes);
    return (objectLikes || []).filter(like => like.id === category.id).length > 0;
}