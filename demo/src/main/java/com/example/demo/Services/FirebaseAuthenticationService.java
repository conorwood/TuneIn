package com.example.demo.Services;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;


import org.springframework.stereotype.Service;

@Service
public class FirebaseAuthenticationService {

    public FirebaseToken verifyFirebaseToken(String idToken) throws FirebaseAuthException {
        return FirebaseAuth.getInstance().verifyIdToken(idToken);
    }
}

