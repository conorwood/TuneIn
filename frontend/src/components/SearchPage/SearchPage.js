import { LoginHeader} from "../LoginPage/LoginHeader";
import { SearchBox } from "./SearchBox";
import './SearchPage.css'
import { UserAuth } from "../../context/AuthContext";
import NavBar from "../NavBar/NavBar";

function SearchPage(props) {
    const { user } = UserAuth();
    return (
        <div className="searchPage">
            {/* <LoginHeader logOut={props.logOut}/> */}
            <NavBar />
            <SearchBox user={user}/>
            <h1 className="text-3xl font-bold underline"> Welcome, {user.displayName} </h1>
            {/* {props.data ? (<h1>
                {props.data.email}
            </h1>) : <h1></h1>} */}
        </div>
    )
}


export default SearchPage;