import { useEffect, useState } from "react"
import axios from "axios"
import { LoginHeader } from "../LoginPage/LoginHeader";
import './ReviewsPage.css'

export default function ReviewsPage() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/getReviews')
            .then((response) => {
                setReviews(response.data);
            })
            .catch((error) => {
                console.error(error);
            })
    }, []);

    return (
        <div className="reviewsPage">
            <LoginHeader />
            <div className="reviewsWrapper">
                <h1 id="header">Saved Reviews: </h1>
                <ol id="reviews" >
                    {reviews.map((review, idx) => (
                        <li key={idx}>
                            <h2>{review.albumName}</h2>
                            <p>{review.reviewText}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    )
}