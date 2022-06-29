import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { addImpl } from "core";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "routes";
import { SelectChain } from "./SelectChain";
import { SelectContract } from "./SelectContract";

type Inputs = {
    name: string
    address: string
    contractId: string
    chainId: number
}

type CreateImplParams = {
    projectId: string
    contractId: string
}

export function CreateImplement(){
    const navigate = useNavigate()
    const { projectId, contractId } = useParams<CreateImplParams>()

    const { register, handleSubmit, setValue } = useForm<Inputs>({
        defaultValues: {
            contractId
        }
    });

    const onSubmit = async ({name, address, contractId, chainId}:Inputs) => {
        await addImpl(name, address, contractId, chainId)
        navigate(ROUTES.HOME);
    }

    const setDefaultChain = (chainId: number) => setValue("chainId", chainId)

    return !(projectId && contractId) ? (
            <Navigate to={ROUTES.HOME} replace /> 
        ) : (
        <Box
            component="form"
            display="flex"
            flexDirection="column"
            onSubmit={handleSubmit(onSubmit)}
            sx={{p: 3}}
        >
            <Typography 
                variant="h5"
                children="컨트랙트 추가"
            />

            <Typography 
                variant="body2"
                children="컨트랙트 이름을 입력해주세요."
                sx={{my:2}}
            />

            <TextField 
                label="이름"
                placeholder="컨트랙트 이름"
                {...register("name")}
            />

            <Typography 
                variant="body2"
                children="컨트랙트 주소를 입력해주세요."
                sx={{my:2}}
            />

            <TextField 
                label="주소"
                placeholder="0x..."
                {...register(
                    "address", 
                    { minLength:42, maxLength: 42}
                )}
            />

            <Typography 
                variant="body2"
                children="컨트랙트 ABI를 선택해주세요."
                sx={{my:2}}
            />
            <SelectContract 
                projectId={projectId}
                initContractId={contractId}
                {...register("contractId")}
            />
            

            <Typography 
                variant="body2"
                children="대상 체인을 선택해주세요."
                sx={{my:2}}
            />
            <SelectChain
                setDefaultChain={setDefaultChain}
                {...register("chainId")}
            />

            <Button 
                type="submit" 
                variant="outlined" 
                sx={{mt: 2}}
            >
                컨트랙트 추가
            </Button>
        </Box>
    )
}