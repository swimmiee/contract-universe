import { Typography, Box, Button, SelectChangeEvent, FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import { abstractsBucket } from "core"
import { ChangeEvent, useMemo } from "react"
import { useAsync } from "react-async"

interface SelectAbstractProps {
    abiText: string | null
    setAbiText: (abitext:string | null) => void
    abstractId: string | null
    setAbstractId: (absId:string | null) => void
}

interface AbstractSelectItem {
    id:string
    name: string
}

export const SelectAbstract = ({
    abiText,  
    abstractId, 
    setAbiText,
    setAbstractId
}:SelectAbstractProps) => {

    // abi json 파일을 업로드하는 경우
    const onChangeFile = (event:ChangeEvent<HTMLInputElement>) => {
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
                setAbstractId(null)
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
    }

    const getAbstracts = async ():Promise<AbstractSelectItem[]> => {
        const _abstracts = await abstractsBucket.get()
        return Object
            .entries(_abstracts)
            .map(([id, {name}]) => ({
            id, name
        }))

    }
    // 기존 등록되어있는 abi를 선택하는 경우
    const {data: abstracts, isLoading} = useAsync(getAbstracts)
    
    // 기존 abi 선택 불가한 경우(로딩중 or 기존 컨트랙트가 없는 경우)
    const [disabled, message] = useMemo(() => {
        if(isLoading)
            return [true, "Loading..."]
        else if( abstracts?.length === 0 )
            return [true, "등록된 컨트랙트가 없습니다."]
        else
            return [false, "기존 컨트랙트 선택"]
    },[isLoading, abstracts?.length])


    const handleChange = (event: SelectChangeEvent) => {
        setAbstractId(event.target.value as string);
        setAbiText("")
    };



    return (
        <Box sx={{my:2}}>
            <Typography variant="body2">
                컨트랙트 선택
            </Typography>

            <Box display="flex" sx={{mt: 2}} alignItems="center">
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

                <Box display="flex" flex={1} justifyContent="center">
                    <Typography 
                        variant="caption"
                        children="or"
                    />
                </Box>

                <Box display="flex" flexDirection="column" flex={6}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="select-abstract-label">
                            {message}
                        </InputLabel>
                        <Select
                            disabled={disabled}
                            labelId="select-abstract-label"
                            id="select-abstract"
                            value={abstractId || undefined}
                            onChange={handleChange}
                        >
                            {abstracts?.map(a => (
                                <MenuItem 
                                    value={a.id}
                                    key={a.id}
                                    children={a.name}
                                />
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </Box>
        </Box>
    )
}