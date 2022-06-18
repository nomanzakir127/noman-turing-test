/* eslint-disable jsx-a11y/anchor-is-valid */

import { useEffect } from "react";
import { login } from "../../services/AuthenticationService";
import Calls from "./calls/Call";
import Header from "./header/Header";

const MINUTE_MS = 600000;

function Dashboard() {

    //To run after 10 minutes to refresh token
    useEffect(() => {
        const interval = setInterval(() => {
            login("/auth/refresh-token", {username:"noman", password:"123"}).then((res)=>{
                console.log(res)
            }).catch(err=>{
                console.warn(err)
            })
        }, MINUTE_MS);

        return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [])

    return (
        <div>
            <Header/>
            <Calls/>
        </div>
        
    );
}

export default Dashboard;
