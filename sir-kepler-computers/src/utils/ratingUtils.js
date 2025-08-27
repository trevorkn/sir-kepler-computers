export function addReview(product, stars, text, user) {
    if (!user) throw new Error ("only logged-in buyers can leave a review.");
    return {
        ...product,
        ratings: {
            count: product.ratings.count + 1,
            totalScore: product.ratings.totalScore + stars,
        },
        reviews: [...product.reviews, {user, stars, text }],
    };
}

export function getAverageRating(product) {
    return product.ratings.count > 0
    ? (product.ratings.totalScore / product.ratings.count).toFixed(1)
    : 0;
}
