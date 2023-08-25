package com.example.demo.Controllers;

import com.example.demo.Models.Review;
import com.example.demo.Repositories.ReviewRepository;
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

    @PostMapping("submitReview")
    public ResponseEntity<String> submitReview(@RequestBody Review review) {
        Optional<Review> testReview = reviewRepository.findByAlbumName(review.getAlbumName());

        if (testReview.isPresent()) {
            Review reviewUpdate = testReview.get();
            reviewUpdate.setReviewText(review.getReviewText());
            reviewUpdate.setFavoriteSongs(review.getFavoriteSongs());
            reviewRepository.save(reviewUpdate);
            //return ResponseEntity.ok("Review Updated!");
        }

        else if (testReview.isEmpty()) {
            //System.out.println(review.getReviewText() + " " + review.getAlbumName());
            reviewRepository.save(review);
            //return ResponseEntity.ok("Review submitted");
        }
        return ResponseEntity.ok("Review submitted");
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
}
