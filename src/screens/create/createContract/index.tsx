import { useState } from "react";
import { addAbstract, addContract } from "core";
import { Box, Button, TextField, Typography } from "@mui/material";
import { SelectProject } from "./SelectProject";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "routes";
import { SelectAbstract } from "./SelectAbstract";

type Inputs = {
    name: string
}

export function CreateContract(){
    const navigate = useNavigate()

    const [projectId, setProjectId] = useState<string>()
    const [abstractId, setAbstractId] = useState<string | null>(null)
    const [abiText, setAbiText] = useState<string | null>(null)

    const { register, handleSubmit } = useForm<Inputs>();
    const onSubmit = async ({name}:Inputs) => {
        // 예외 상황 처리
        if(!projectId){
            alert("프로젝트를 선택해주세요.")
            return;
        } else if( !(abiText || abstractId) ){
            // abi.json 파일을 업로드하지 않았거나 기존 abi를 선택하지 않은 경우
            alert("abi json 파일을 업로드해주세요.")
            return;
        }

        let _abstractId;
        // abi 선택하지 않은 경우
        if(!abstractId){
            _abstractId = await addAbstract(name, JSON.parse(abiText!));
        }
        else {
            _abstractId = abstractId;
        }

        // 컨트랙트 등록
        try {
            await addContract(projectId, name, _abstractId)
            navigate(ROUTES.HOME)
        } catch (e:any) {
            alert(e.message || "다시 시도해 주세요.")
        }
    }

    
    return (
        <Box
            component="form"
            display="flex"
            flexDirection="column"
            onSubmit={handleSubmit(onSubmit)}
            sx={{p: 3}}
        >
            <Typography 
                variant="h5"
                children="컨트랙트 ABI 등록하기"
            />

            <Typography
                variant="body2"
                children="컨트랙트를 추가할 프로젝트를 선택해주세요."
                sx={{my:2}}
            />
            <SelectProject 
                projectId={projectId}
                setProjectId={setProjectId}
            />

            <Typography 
                variant="body2"
                children="컨트랙트명을 입력해주세요."
                sx={{my:2}}
            />
            <TextField 
                label="컨트랙트"
                placeholder="컨트랙트"
                {...register("name")}
            />

            <SelectAbstract 
                abiText={abiText}
                setAbiText={setAbiText}
                abstractId={abstractId}
                setAbstractId={setAbstractId}
            />
            
            <Button type="submit" variant="contained" >
                컨트랙트 추가
            </Button>
        </Box>
    )
}