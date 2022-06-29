import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AbiItem } from "web3-utils";
import { useContext, useState } from "react";
import ImplStore from "./implContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputListItem } from "./InputListItem";
import { Box } from "@mui/system";


interface AbiExecuterProps {
    abi:AbiItem
}
export const AbiExecuter = ({abi:{name, inputs, stateMutability}}:AbiExecuterProps) => {
    const { contractInstance } = useContext(ImplStore)!
    const [expand, setExpand] = useState(false);
    const open = () => setExpand(true)
    const toggle = () => setExpand(p => !p)
    const { handleSubmit, control } = useForm({});

    const onExecute:SubmitHandler<any> = async (formInputs) => {
        open()
        const params = (inputs || []).map(input => {
            return formInputs[input.name]
        })

        if(stateMutability === "view" || stateMutability === "pure"){
            const result = await contractInstance.methods[name!](...params).call()
            setResultText(JSON.stringify(result, null, 2))
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
                    <Button
                        type="submit"
                        variant={stateMutability === "view" ? 
                            "contained"
                            : 
                            "outlined"
                        }
                    >
                        {name}
                    </Button>
                </AccordionSummary>

                <AccordionDetails>
                    {inputs?.map((input, i) => (
                        <InputListItem 
                            input={input}
                            control={control}
                            key={input.name+'-'+i}
                        />
                    )) || (
                        <Typography
                            align="center"
                            variant="body1"
                            children="No Input."
                        />
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