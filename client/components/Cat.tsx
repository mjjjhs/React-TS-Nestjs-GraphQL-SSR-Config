import React, {NextFunctionComponent, useEffect} from 'react';
import {useQuery} from "@apollo/react-hooks";
import {GET_CATS} from "../apolloClient/queries/getCats";
import {errorHandlerWithAlert} from "../utils/errorHandler";
import {useRouter} from "next/router";

const Cat: NextFunctionComponent<any> = () => {
    const router = useRouter();
    const {error, data} = useQuery(GET_CATS);

    if (error) {
        errorHandlerWithAlert(error);
        router.push('/');
    }

    useEffect(() => {
        console.log('data ===', data);
    }, [data]);

    return (
        <div>
            {data?.getCats?.map((item, index) => <span key={index}>{item.name}</span>)}
        </div>
    );
};

export default Cat;