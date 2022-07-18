import { AbiInput } from "web3-utils";

export const nameArgs = (inputs:AbiInput[] | undefined) => {
    if(inputs === undefined) 
        return []
    return inputs.map((input, i) => {
        if(input.name)
            return input
        else
            return {
                ...input,
                name: 'args'+i
            }
    })
}