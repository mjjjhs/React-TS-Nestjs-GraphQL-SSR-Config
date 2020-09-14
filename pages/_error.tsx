import React from 'react';
import {NextPage} from "next";
import getConfig from "next/config";
import {errorStyle} from "../client/styles/errorStyles";
// import {Button} from "@lqt/lqt-ui";
import {Colors} from "../client/enums/styleVariables";

const { publicRuntimeConfig } = getConfig();

const Error: NextPage = () => {
    return (
        <div className={"errorContainer"}>
            <img
                src={`${publicRuntimeConfig.IMAGE_URL}/error.png`}
                alt="404 error"
                width={"116px"}
                height={"99px"}
            />
            <h2 className={"title"}>요청하신 페이지를 찾을 수 없습니다.</h2>
            <p className="description">
                존재하지 않는 주소를 입력하셨거나<br/>
                요청하신 페이지의 주소가 변경, 삭제되어<br/>
                찾을 수 없습니다.
            </p>
            {/*{(*/}
            {/*    <Button*/}
            {/*        text={"메인페이지로 이동"}*/}
            {/*        color={Colors.white}*/}
            {/*        fontWeight={700}*/}
            {/*        padding={"16px 22px"}*/}
            {/*        background={Colors.primary}*/}
            {/*        width={"159px"}*/}
            {/*        height={"50px"}*/}
            {/*        href={"/"}*/}
            {/*    />*/}
            {/*)}*/}
            <style jsx>{errorStyle}</style>
        </div>
    )
};

export default Error;
