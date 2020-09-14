import React, {useEffect} from "react";
import Counter from "../client/components/Counter";
import Button from "../client/components/Button";
import {useImmer} from 'use-immer';
import Cat from "../client/components/Cat";
import {NextPage} from "next";

const Component: NextPage = () => {
    const [person, updatePerson] = useImmer({
        name: 'cs',
        age: 30
    });

    useEffect(() => {
        console.log('person ===', person);
    }, [person]);

    const updateName = e => {
        const name = e.target.value;
        updatePerson(draft => {
            draft.name = name;
        });
    };

    return (
        <>
            <div className={'hello'}>
                Hello World!
            </div>
            <input type="text" placeholder={'personName'} value={person.name} onChange={updateName}/>
            <Counter />
            <Cat />
            <Button text={'버튼'}/>
        </>
    )
};

export default Component;