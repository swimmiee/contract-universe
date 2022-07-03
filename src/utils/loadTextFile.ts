import { ChangeEvent, useCallback } from "react";

export const useLoadTextFile = (
    onLoad: (content: string) => void
) => {

    const onChangeFile = useCallback((event:ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();

        reader.onload = function() {
            try {
                const text = reader.result as string
                onLoad(text)
            } catch(e){
                console.log(e)
                alert("올바르지 않은 파일입니다.")
            }
        };

        try {
            reader.readAsText(event.target?.files![0]);
        } catch(e){
            console.log('File select canceled');
        }
    },[])

    return onChangeFile
}