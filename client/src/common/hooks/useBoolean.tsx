import { Dispatch, SetStateAction, useState, useCallback } from 'react';

type UseBooleanResult = {
    value: boolean;
    setValue: Dispatch<SetStateAction<boolean>>;
    setTrue: () => void;
    setFalse: () => void;
    toggle: () => void;
};

export default function useBoolean(defaultValue?: boolean): UseBooleanResult {
    const [value, setValue] = useState(!!defaultValue);

    const setTrue = useCallback(() => setValue(true), []);
    const setFalse = useCallback(() => setValue(false), []);
    const toggle = useCallback(() => setValue((prevValue) => !prevValue), []);

    return { value, setValue, setTrue, setFalse, toggle };
}
