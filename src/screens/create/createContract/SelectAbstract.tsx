import { Typography, Box, Button, FormControl, Select, MenuItem } from "@mui/material"
import { abstractsBucket } from "core"
import { ChangeEvent, useCallback } from "react"
import { Async } from "react-async"
import { UseFormRegisterReturn } from "react-hook-form"

interface SelectAbstractProps extends UseFormRegisterReturn {
    abiText: string | null
    setAbiText: (abitext:string | null) => void
    resetAbstractId: () => void  // abi.json 파일 업로드 시 선택 항목 삭제
}

interface AbstractSelectItem {
    id:string
    name: string
}

export const SelectAbstract = ({
    abiText,  
    setAbiText,
    resetAbstractId,
    ...formRegisterProps
}:SelectAbstractProps) => {

    // abi json 파일을 업로드하는 경우
    const onChangeFile = useCallback((event:ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();

        reader.onload = function() {
            try {
                const text = reader.result as string
                if(!text)
                    throw Error()

                const parsed = JSON.parse(text)
                // 최소한의 체크만! (배열인지만 확인)
                if(!Array.isArray(parsed))
                    throw Error()

                setAbiText(text)
                resetAbstractId()
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

    const getAbstracts = useCallback(
        async ():Promise<AbstractSelectItem[]> => {
            const _abstracts = await abstractsBucket.get()
            return Object
                .entries(_abstracts)
                .map(([id, {name}]) => ({
                id, name
            }))
        }
    ,[])


    return (
        <Box sx={{my:2}}>
            <Typography variant="body2">
                컨트랙트 선택
            </Typography>

            <Box display="flex" sx={{mt: 2}} alignItems="center">
                <Box display="flex" flexDirection="column" flex={6}>
                    <FormControl fullWidth size="small">
                        <Async promiseFn={getAbstracts}>
                            {({data: abstracts, isLoading}) => {
                                if(isLoading) return (
                                    <Select disabled label="로딩 중입니다." />
                                )
                                else if(!abstracts?.length) return (
                                    <Select disabled label="등록된 ABI가 없습니다." />
                                )
                                else if(abstracts.length > 0) return (
                                    <Select {...formRegisterProps}>
                                        {abstracts?.map(a => (
                                            <MenuItem 
                                                value={a.id}
                                                key={a.id}
                                                children={a.name}
                                            />
                                        ))}
                                    </Select>
                                )
                            }}
                        </Async>
                    </FormControl>
                </Box>


                <Box display="flex" flex={1} justifyContent="center">
                    <Typography 
                        variant="caption"
                        children="or"
                    />
                </Box>
                

                <Box display="flex" flexDirection="column" flex={3}>
                    <Button
                        variant="outlined"
                        component="label"
                    >
                        ABI json 파일 업로드
                        <input
                            accept="json"
                            type="file"
                            hidden
                            onChange={onChangeFile}
                        />
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}