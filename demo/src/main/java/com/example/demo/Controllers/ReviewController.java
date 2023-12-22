package com.example.demo.Controllers;

import com.example.demo.Models.Review;
import com.example.demo.Repositories.ReviewRepository;
import com.example.demo.Services.FirebaseAuthenticationService;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/review")
@CrossOrigin
public class ReviewController {

    private final ReviewRepository reviewRepository;

    @Autowired
    private FirebaseAuthenticationService firebaseAuthenticationService;


    @PostMapping("submitReview")
    public ResponseEntity<String> submitReview(@RequestBody Review review, @RequestHeader("Authorization") String token) {
        String firebaseIdToken = token.replace("Bearer ", "");
        FirebaseToken decodedToken = null;
        try {
            decodedToken = firebaseAuthenticationService.verifyFirebaseToken(firebaseIdToken);
        } catch (Exception e) {
            System.out.println(e);
        }

        // Now you can use the 'firebaseIdToken' for authentication or other purposes.
        // Example: Verify the token using Firebase Authentication SDK

        // Access user information from the decoded token
        String uid = decodedToken.getUid();
        String userEmail = decodedToken.getEmail();

        Optional<Review> existingReview = reviewRepository.findByAlbumNameAndUserEmail(review.getAlbumName(), userEmail);

        if (existingReview.isPresent()) {
            // Update existing review
            Review updatedReview = existingReview.get();
            updatedReview.setReviewText(review.getReviewText());
            updatedReview.setFavoriteSongs(review.getFavoriteSongs());
            updatedReview.setRating(review.getRating());
            reviewRepository.save(updatedReview);
        } else {
            // Save a new review
            review.setUserEmail(userEmail);
            reviewRepository.save(review);
        }

        return ResponseEntity.ok("Review submitted");

//        Optional<Review> testReview = reviewRepository.findByAlbumName(review.getAlbumName());
//
//        if (testReview.isPresent()) {
//            Review reviewUpdate = testReview.get();
//            reviewUpdate.setReviewText(review.getReviewText());
//            reviewUpdate.setFavoriteSongs(review.getFavoriteSongs());
//            reviewUpdate.setRating(review.getRating());
//            reviewRepository.save(reviewUpdate);
//            //return ResponseEntity.ok("Review Updated!");
//        }
//
//        else if (testReview.isEmpty()) {
//            //System.out.println(review.getReviewText() + " " + review.getAlbumName());
//            reviewRepository.save(review);
//            //return ResponseEntity.ok("Review submitted");
//        }
//        return ResponseEntity.ok("Review submitted");
    }

    @Autowired
    public ReviewController(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    @GetMapping("getReviews")
    public List<Review> getReviews() {
        return reviewRepository.findAll();
    }

    @GetMapping("findReview")
    public Boolean findReview(@RequestParam("albumName") String albumName) {
        boolean exists = reviewRepository.existsByAlbumName(albumName);

        return exists;
    }


    @GetMapping("findReview1")
    public ResponseEntity<?> findReview1(@RequestParam("albumId") String albumId) {
        Optional<Review> review = reviewRepository.findByAlbumId(albumId);

        if (review.isPresent()) {
            return ResponseEntity.ok(review.get());
        }

        else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("deleteReview")
    public ResponseEntity<String> deleteReview(@RequestParam("albumId") String albumId) {
        Optional<Review> review = reviewRepository.findByAlbumId(albumId);

        if (review.isPresent()) {
            reviewRepository.delete(review.get());
            return ResponseEntity.ok("Review Deleted");
        }

        else {
            return ResponseEntity.notFound().build();
        }
    }
}
