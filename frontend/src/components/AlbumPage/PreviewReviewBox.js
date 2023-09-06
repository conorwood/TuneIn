import './PreviewReviewBox.css'

export function PreviewReviewBox({ review, rating, favTracks }) {
    return (
        <div className="previewReviewBox">
            <div className="review">
                <h2 id="review-header">Review: </h2>
                <p id="review-text">{review}</p>
            </div>
            <div className="albumRating">
                <h2>Rating: </h2>
                <span className="rating">{rating} / 5 &#9733;</span>
            </div>
            <div className="favTracks">
                <h2>Favorite Tracks: </h2>
                {favTracks.length > 0 ? (
                    <ul>
                        {favTracks.map((track, idx) => (
                            <li key={idx}>{track}</li>
                        ))}
                    </ul>
                ) : (
                    <p> No favorite tracks selected. </p>
                )}
            </div>
        </div>
    );
}