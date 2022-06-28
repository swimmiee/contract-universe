import { Box, Button, TextField, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "../../routes"
import { SubmitHandler, useForm } from "react-hook-form"
import { resetPassword } from "core"

type Inputs = {
    password: string
    password2: string
}

export function Register(){
    const navigate = useNavigate()
    const { register, handleSubmit, getValues } = useForm<Inputs>();
    const onSubmit:SubmitHandler<Inputs> = ({password, password2}) => {
        if(password === password2)
            resetPassword(password)
                .then(() => navigate(ROUTES.ADD_ACCOUNT))
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
                children="Contract Universe에 비밀번호를 등록하세요."
                mb={3}
            />

            <TextField 
                label="비밀번호"
                type="password"
                placeholder="지갑에 사용될 비밀번호를 입력해주세요."
                {...register("password")}
            />

            <TextField 
                label="비밀번호 확인"
                type="password"
                placeholder="한 번 더 입력해주세요."
                sx={{mt: 3, mb: 3}}
                {...register("password2", {
                    validate: {
                        matchesPreviousPassword: (value) => {
                            const { password } = getValues()
                            return password === value || "비밀번호가 일치하지 않습니다."
                        }
                    }
                })}
            />

            <Button 
                variant="contained"
                type="submit"
                children="시작하기"
            />
        </Box>
    )
}