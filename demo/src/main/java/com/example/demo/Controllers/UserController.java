package com.example.demo.Controllers;

import com.example.demo.Models.User;
import com.example.demo.Repositories.UserRepository;
import com.example.demo.Services.FirebaseAuthenticationService;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {
    private final UserRepository userRepository;

    @Autowired
    private FirebaseAuthenticationService firebaseAuthenticationService;


    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("upsertUser")
    public ResponseEntity<Boolean> upsertUser(@RequestHeader("Authorization") String token) {
        Boolean userUpsert = true;
        String firebaseIdToken = token.replace("Bearer ", "");
        System.out.println(firebaseIdToken);
        FirebaseToken decodedToken = null;
        try {
            decodedToken = firebaseAuthenticationService.verifyFirebaseToken(firebaseIdToken);
            User user = new User(decodedToken.getName(), decodedToken.getEmail(), decodedToken.isEmailVerified(),
                decodedToken.getPicture(), decodedToken.getTenantId(), decodedToken.getUid());

            User existingUser = userRepository.findByEmail(user.getEmail());
            userRepository.save(user);
        } catch (Exception e) {
            System.out.println(e);
            userUpsert = false;
        }



        return ResponseEntity.ok(userUpsert);
    }
}
