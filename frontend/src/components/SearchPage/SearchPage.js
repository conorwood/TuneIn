import { useEffect } from "react";
import { LoginHeader} from "../LoginPage/LoginHeader";
import { SearchBox } from "./SearchBox";
import './SearchPage.css'
import { useSupabase } from "../SupabaseContext";

function SearchPage(props) {
    const { supabaseSessionToken, setToken } = useSupabase();

    useEffect(() => {
        // Access and use supabaseSessionToken as needed
        console.log('Supabase Session Token:', supabaseSessionToken);
      }, [supabaseSessionToken]);

    // useEffect(() => {
    //     if (props.data) {
    //         console.log(`Data: ${props.data.email}`);
    //     }
    // })

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