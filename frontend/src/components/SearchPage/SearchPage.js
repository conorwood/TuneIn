import { LoginHeader} from "../LoginPage/LoginHeader";
import { SearchBox } from "./SearchBox";
import './SearchPage.css'
import { UserAuth } from "../../context/AuthContext";

function SearchPage(props) {
    const { user } = UserAuth();
    return (
        <div className="searchPage">
            <LoginHeader logOut={props.logOut}/>
            <SearchBox user={user}/>
            <h1> Welcome, {user.displayName} </h1>
            {/* {props.data ? (<h1>
                {props.data.email}
            </h1>) : <h1></h1>} */}
        </div>
    )
}


export default SearchPage;