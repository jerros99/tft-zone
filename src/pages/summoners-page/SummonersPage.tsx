import React, {useContext, useEffect} from 'react';
import {TFTDataContext} from "../../App";
import {Loader} from "../../component/loader/Loader";
import {useParams} from "react-router-dom";

export function SummonersPage() {
    const params = useParams();

    useEffect(() => {
        console.log(params);
    }, []);

    return (
        <>
            Summoners
        </>
    );
}

