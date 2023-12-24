import { useEffect, useState } from "react";
import { UserAuth } from "../../context/AuthContext";

export default function UserProfileCard() {
    const { user } = UserAuth();
    return (
        <div className="flex">
            <div className="flex flex-col items-center m-4 p-5 bg-gray-200 rounded-xl">
                <img className="rounded-full" src={user.photoURL}></img>
                <h1 className="text-6xl m-3" > {user.displayName} </h1>
                <h1 className="text-4xl m-3"> {user.email} </h1>
            </div>
        </div>
    )
}