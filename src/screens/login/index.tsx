import { Box, Button, TextField, Typography } from "@mui/material"
import { Navigate, useNavigate } from "react-router-dom"
import { SubmitHandler, useForm } from "react-hook-form"
import { Loading } from "screens/loading"
import { ROUTES } from "routes"
import { addAccountToWallet, Account, accountsBucket, isCorrectPassword, getAccount } from "core"
import { useAsync } from "react-async"
import { useEffect } from "react"


type Inputs = {
    password: string
}

export function Login(){
    const {data:account, isLoading} = useAsync(getAccount)
    const navigate = useNavigate()

    const { register, handleSubmit } = useForm<Inputs>();
    const onSubmit:SubmitHandler<Inputs> = ({password}) => {
        isCorrectPassword(password)
            .then(async (ok) => {
                if(ok && account?.accounts){
                    const { accounts } = account
                    const addWallet = (account:Account) => addAccountToWallet(account, password);
                    // add all accounts to wallet
                    accounts.forEach(addWallet)
                    navigate(ROUTES.HOME)
                } else {
                    alert('비밀번호가 잘못되었습니다.')
                }
            })
    }

    return isLoading ? <Loading /> : !(account?.id) ? (
        <Navigate to={ROUTES.REGISTER} replace />
    ) :  (
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
                children="Contract Universe에 로그인하세요."
                mb={1}
            />
            <TextField 
                label="비밀번호"
                type="password"
                placeholder="비밀번호를 입력해주세요."
                sx={{mb: 3}}
                {...register("password")}
            />

            <Button 
                variant="contained"
                type="submit"
                children="로그인"
            />
        </Box>
    )
}