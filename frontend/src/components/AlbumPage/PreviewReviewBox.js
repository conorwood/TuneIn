import './PreviewReviewBox.css'

export function PreviewReviewBox({ review, rating, favTracks, onEditReview }) {
    return (
        <div className="flex w-5/6 bg-gray-400 rounded-xl p-3 m-5 justify-between mx-auto">
            <button onClick={onEditReview} className='self-start transition ease-in-out duration-300 transform hover:text-blue-600 hover:scale-110'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" dataSlot="icon" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
            </button>
            <div className="flex flex-col w-2/5 ml-3">
                <h2 className="text-2xl mb-1 self-start">Review: </h2>
                <p className='w-full h-36 self-start resize-none'>{review}</p>
            </div>
            <div className="flex-1">
                <h2 className='text-2xl'>Rating: </h2>
                <span className="rating">{rating} / 5 &#9733;</span>
            </div>
            <div className="w-1/3 text-2xl">
                <h2>Favorite Tracks: </h2>
                {favTracks.length > 0 ? (
                    <ul>
                        {favTracks.map((track, idx) => (
                            <li key={idx}>{track}</li>
                        ))}
                    </ul>
                ) : (
                    <p> No favorite tracks selected yet. </p>
                )}
            </div>
        </div>
    );
}