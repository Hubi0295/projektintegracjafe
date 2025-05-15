import Button from "./Button.jsx";
import React from "react";
import {useNavigate} from "react-router-dom";

export default function UsersSearches({username}) {
    const navigate = useNavigate();
    const filters = {
        "abc":123,
        "adsa":1232,
        "username":{username}
    }
    return (
        <>
            <li><Button text="1" action={() => navigate('/results', { state: filters })}/></li>
            <li><Button text="2" action={() => navigate('/results', { state: filters })}/></li>
            <li><Button text="3" action={() => navigate('/results', { state: filters })}/></li>
            <li><Button text="4" action={() => navigate('/results', { state: filters })}/></li>
            <li><Button text="5" action={() => navigate('/results', { state: filters })}/></li>
        </>
    )
}