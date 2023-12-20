import { useEffect } from "react";
import { LoginHeader} from "../LoginPage/LoginHeader";
import { SearchBox } from "./SearchBox";
import './SearchPage.css'

function SearchPage(props) {
    useEffect(() => {
        if (props.data) {
            console.log(`Data: ${props.data.email}`);
        }
    })

    return (
        <div className="searchPage">
            <LoginHeader logOut={props.logOut}/>
            <SearchBox />
            {props.data ? (<h1>
                {props.data.email}
            </h1>) : <h1></h1>}
        </div>
    )
}


export default SearchPage;