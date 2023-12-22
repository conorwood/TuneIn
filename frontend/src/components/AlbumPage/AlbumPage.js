import { LoginHeader } from "../LoginPage/LoginHeader"
import { useParams } from "react-router-dom";
import { ReviewBox } from './ReviewBox';
import { PreviewReviewBox } from './PreviewReviewBox';
import { useState, useEffect } from "react";
import axios from 'axios';
//import album_cover from './speak_now.png'
import './AlbumPage.css'
import { isEditable } from "@testing-library/user-event/dist/utils";
import { UserAuth } from "../../context/AuthContext";
import NavBar from "../NavBar/NavBar";



function AlbumInfo(props) {
    const params = useParams();
    const [tracks, setTracks] = useState([]);
    const [albumName, setAlbumName] = useState('');
    const [coverArtUrl, setCoverArtUrl] = useState('');
    const [artistName, setArtistName] = useState('');
    const [review, setReview] = useState('');
    const [albumId, setAlbumId] = useState('');
    const [favTracks, setFavTracks] = useState([]);
    const [reviewBoxExpanded, setReviewBoxExpanded] = useState(false);
    const [hasReview, setHasReview] = useState(false);
    const [canEdit, setCanEdit] = useState(false);
    const [rating, setRating] = useState(0);


    useEffect(() => {
        axios.get('http://localhost:8080/review/findReview1?albumId='+params.id)
        .then((response) => {
            if (response.status === 200) {
                console.log("Review added");
                setReview(response.data.reviewText)
                setFavTracks(response.data.favoriteSongs)
                setHasReview(true);
                setRating(response.data.rating)
            }
            else if (response.status === 404) {
                console.log("No review added yet");
            }
        })
        .catch((error) => {
            console.error(error);
        });
    }, [params.name]);

    useEffect(() => {
        console.log(params.id);
        axios.get('http://localhost:8080/albums/getAlbum?id='+params.id)
            .then((response) => {
                //window.alert(response.data);
                setTracks(response.data.tracks);
                setAlbumName(response.data.name);
                setCoverArtUrl(response.data.coverArtUrl);
                setArtistName(response.data.artist);
                setAlbumId(response.data.id);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [params.name]);

    const handleReviewChange = (event) => {
        setReview(event.target.value);
    } 

    const handleCancelReview = () => {
        setCanEdit(false);
    }

    const handleSaveReview = () => {
        if (!review) {
            return;
        }

        console.log(props.user.accessToken);

        const reviewData = { 
            reviewText: review,
            albumName: albumName,
            albumId: albumId,
            coverArtUrl: coverArtUrl,
            favoriteSongs: favTracks,
            rating: rating
        };

        const headers = {
            'Authorization': `Bearer ${props.user.accessToken}`,
        };

        axios.post('http://localhost:8080/review/submitReview', reviewData, { headers: headers })
            .then((response) => {
                setHasReview(true);
                setCanEdit(false);
                console.log('Review saved!');
            })
            .catch((error) => {
                console.error('Error saving: ', error);
            })
    };

    const handleTrackClick = (track) => {
        if (canEdit && !favTracks.includes(track)) {
            setFavTracks([...favTracks, track]);
        }

        console.log(favTracks);
    }


    const handleToggleReviewBox = () => {
        setReviewBoxExpanded(!reviewBoxExpanded);
    }

    const handleNewReviewClick = () => {
        setHasReview(true);
        setCanEdit(true);
    }

    const handleEditReview = () => {
        setCanEdit(true);
    }

    const handleDeleteFavoriteTrack = (trackToDelete) => {
        setFavTracks((prevTracks) => prevTracks.filter((track) => track !== trackToDelete));
    }

    return (
        <div className="albumWrapper" >
            <div className="flex items-start my-3 border-b-2 border-neutral-500" >
                <div className="text-white w-1/2 p-3 border-neutral-500">
                    <h2 className="text-5xl" id="album-name">{albumName}</h2>
                    <h2 className="text-2xl text-neutral-300 m-2" id="artist-name">{artistName}</h2>
                    <img className="mx-auto rounded-lg max-h-96" id="cover-art" alt='Cover Art' src={coverArtUrl} ></img>
                </div>
                <div id="this" className="text-white flex items-center flex-col justify-center w-2/5 p-5 mx-auto bg-black rounded-lg my-5">
                    <h2 className="text-4xl font-bold m-5 text-start">Tracks:</h2>
                    <ol className="grid grid-cols-2 list-decimal list-inside">
                        {tracks.map((track, idx) => (
                            <li key={idx} className="bg-neutral-900 flex items-center justify-start text-left text-xl transition ease-in-out duration-300 transform hover:bg-neutral-700 p-1 rounded-lg border-neutral-500 border-2">
                                {track} 
                                {canEdit && (
                                    <button className="ml-4 bg-transparent text-white cursor-pointer transition ease-in-out duration-300 transform hover:text-blue-700 hover:scale-150" onClick={() => handleTrackClick(track)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" dataSlot="icon" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>

                                    </button>
                                )}
                            </li>
                        ))}
                    </ol>
                </div>
               
            </div>
            <div className="reviewSection">
                {hasReview && !canEdit ? (
                        <div className="preview">
                            < PreviewReviewBox 
                                review={review}
                                rating={rating}
                                favTracks={favTracks}
                                onEditReview={handleEditReview}
                            />
                        </div>
                    ) : canEdit ? (
                        <ReviewBox
                            review={review}
                            onReviewChange={handleReviewChange}
                            onSaveReview={handleSaveReview}
                            favTracks={favTracks}
                            handleDeleteFavoriteTrack={handleDeleteFavoriteTrack}
                            rating={rating}
                            setRating={setRating}
                            onCancelReview={handleCancelReview}
                        />
                    ) : (
                        <div>
                            <button className="text-4xl font-bold p-4 rounded-2xl bg-gray-500 text-white m-5 w-5/12 h-24 cursor-pointer transition duration-300 ease-in-out transform hover:bg-blue-600 hover:scale-105"
                             onClick={handleNewReviewClick}>+ Add Review</button>
                        </div>
                    )}
            </div>
        </div>
    )
}


function AlbumPage() {
    const { user } = UserAuth();
    return (
        <div className="bg-zinc-800">
            <NavBar />
            <AlbumInfo user={user}/>
        </div>
    )
}

export default AlbumPage;