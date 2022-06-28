import { useNavigate } from "react-router-dom";
import { Button, Checkbox, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { addProject } from "core";
import { useForm } from "react-hook-form";
import { ROUTES } from "routes";
import { useContractState } from "atoms";

type Inputs = {
    name: string
    description: string
    isDefault: boolean
}
export function CreateProject(){
    const navigate = useNavigate()
    const { setProject } = useContractState()

    const { register, handleSubmit } = useForm<Inputs>();
    const onSubmit = async ({name, description, isDefault}:Inputs) => {
        const newProject = await addProject(name, description || "", isDefault)
        setProject(newProject)
        navigate(ROUTES.HOME)
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
                children="프로젝트 추가"
                sx={{mb:2}}
            />

            <Typography 
                variant="body2"
                children="프로젝트명을 입력해주세요."
                sx={{mb:2}}
            />
            <TextField 
                label="프로젝트"
                placeholder="프로젝트"
                {...register("name")}
            />

            <Typography 
                variant="body2"
                children="프로젝트 설명을 입력해주세요.(optional)"
                sx={{my: 2}}
            />
            <TextField 
                label="프로젝트 설명"
                placeholder="프로젝트 설명"
                {...register("description", {required: false})}
            />

            <Box sx={{my: 2}} display="flex" alignItems="center" >
                <Checkbox
                    sx={{p: 0}}
                    {...register("isDefault")}
                />
                <Typography 
                    sx={{ml: .2}}
                    variant="body2"
                    children="기본 프로젝트로 지정"
                />
            </Box>
            
            <Button type="submit" variant="contained">
                프로젝트 만들기
            </Button>
        </Box>
    )
}