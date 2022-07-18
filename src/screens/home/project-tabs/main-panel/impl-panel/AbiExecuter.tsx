import { Accordion, AccordionDetails, AccordionSummary, Button, Divider, Typography } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AbiItem, toBN } from "web3-utils";
import { useContext, useMemo, useState } from "react";
import ImplStore from "./implContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputListItem } from "./InputListItem";
import { Box } from "@mui/system";
import { nameArgs } from "./nameArgs";
import { useRecoilValue } from "recoil";
import { accountState } from "atoms";
import { web3 } from "core";
import { TransactionReceipt } from "web3-eth";


interface AbiExecuterProps {
    abi:AbiItem
}


export const AbiExecuter = ({abi:{name, inputs, stateMutability}}:AbiExecuterProps) => {
    const user = useRecoilValue(accountState)

    const { contractInstance, chain } = useContext(ImplStore)!
    const [expand, setExpand] = useState(false);
    const open = () => setExpand(true)
    const toggle = () => setExpand(p => !p)
    const { handleSubmit, control } = useForm({});

    // input 변수명 정규화: arg0, arg1, ...
    const args = useMemo(() => nameArgs(inputs), [inputs?.length])


    const onExecute:SubmitHandler<any> = async (formInputs) => {
        const params = args.map((arg) => formInputs[arg.name])
        const value = formInputs.value || 0;
        const shouldExecute = expand || params.every(x => x !== undefined)

        open()
        if(!shouldExecute || !user) 
            return;

        const method = contractInstance.methods[name!](...params)
        if(stateMutability === "view" || stateMutability === "pure"){
            const result = await method.call()
            setResultText(JSON.stringify(result, null, 2))
        }
        else {
            const gas = await method.estimateGas({
                from: user.address,
                value
            })
            const gasPrice = await web3.eth.getGasPrice()

            const ok = window.confirm(`${
                web3.utils.fromWei(
                    toBN(gas).mul(toBN(gasPrice)), "ether"
                )
            }${chain.symbol} of Gas will be used. Proceed?`)

            if(!ok)
                return;
            
            const receipt:TransactionReceipt = await method.send({
                from: user.address,
                gas,
                gasPrice,
                value
            })
            setResultText("[Tx Hash]\n" + receipt.transactionHash)
        }   

    }

    const [resultText, setResultText] = useState("")

    return (    
        <form onSubmit={handleSubmit(onExecute, open)} style={{marginBottom: 12}}>
            <Accordion style={{width: "100%"}} expanded={expand}>
                <AccordionSummary
                    id="panel1a-header"
                    aria-controls="panel1a-content"
                    expandIcon={<ExpandMoreIcon onClick={toggle} />}
                >
                    <Box
                        display="flex" 
                        alignItems="center" 
                        flexDirection="row"
                    >
                        <Button
                            type="submit"
                            variant={stateMutability === "view" ? 
                                "contained" : "outlined"
                            }
                            children={name}
                        />
                        <Typography
                            component="code" 
                            children={stateMutability}
                            ml={2}
                        />
                    </Box>
                </AccordionSummary>

                <AccordionDetails>
                    {args.map((input, i) => (
                        <InputListItem 
                            input={input}
                            control={control}
                            key={input.name+'-'+i}
                        />
                    ))}

                    {stateMutability === "payable" && (
                        <>
                        <Divider sx={{mb: 1}} />
                        <InputListItem 
                            input={{name: 'value', type: ''}}
                            control={control}
                        />
                        </>
                    )}

                    <Box display="flex" flexDirection="column" mt={2}>
                        <Typography
                            variant="h6"
                            children="Results"
                            mb={2}
                        />
                        {resultText}
                    </Box>
                </AccordionDetails>
            </Accordion>
        </form>
    )
}