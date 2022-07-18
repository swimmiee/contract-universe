import { Box, Button, TextField, Typography } from "@mui/material";
import { useAddAccount, isCorrectPassword } from "core";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "routes";

type Inputs = {
    name:string
    pk: string
    password: string
}
export default function AddAccount(){
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm<Inputs>();
    const addAccount = useAddAccount()
    const onSubmit:SubmitHandler<Inputs> = ({name, pk, password}) => {
        isCorrectPassword(password)
            .then(ok => {
                if(!ok) {
                    throw Error("비밀번호가 올바르지 않습니다.")
                }
                return addAccount(
                    name,
                    pk,
                    password,
                    true
                )
            })
            .then(ok => {
                navigate(ROUTES.HOME)
            })
            .catch(e => {
                alert(e.message)
            })  
    }
    return (
        <Box 
            component="form" 
            display="flex"
            flex={1}
            flexDirection="column" 
            justifyContent="center" 
            sx={{p: 3}}
            onSubmit={handleSubmit(onSubmit)}
        >
            <Typography 
                variant="h6"
                children="개인지갑을 등록하세요."
                mb={2}
            />
            <Typography 
                variant="body1"
                children="계정 이름을 지어 주세요."
                mb={2}
            />
            <TextField 
                label="계정 이름"
                placeholder="계정 이름"
                sx={{mb: 2}}
                {...register("name")}
            />


            <Typography 
                variant="body1"
                children="계정의 비밀 키를 입력해 주세요."
                mb={2}
            />
            <TextField 
                label="비밀 키"
                type="password"
                placeholder="Private Key"
                sx={{mb: 2}}
                {...register("pk")}
            />


            <Typography 
                variant="body1"
                children="비밀번호를 다시 입력해 주세요."
                mb={2}
            />
            <TextField 
                label="비밀번호"
                type="password"
                placeholder="비밀번호"
                sx={{mb: 4}}
                {...register("password")}
            />

            <Button 
                variant="contained"
                type="submit"
                children="계정 등록"
            />

        </Box>
    )
}