import React, { useContext } from 'react';
import { counterContext } from '../context/context';

const Span = () => {
    const value = useContext(counterContext);

    return (
        < div >
            {value.count}
        </div >
    );

};
export default Span;