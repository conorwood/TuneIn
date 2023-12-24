import { useState, useEffect } from "react";
import { UserAuth } from "../../context/AuthContext";
import NavBar from "../NavBar/NavBar";
import UserProfileCard from "./UserProfileCard";



export default function ProfilePage(props) {
    return (
        <div>
            <NavBar />
            <UserProfileCard/>
        </div>
    )
}