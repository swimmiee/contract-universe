import { atom, useRecoilState, useRecoilValue } from "recoil";
import { Project, Impl, Contract } from "core";
import { getMainProject } from "core/projects"
import { useEffect } from "react";

const projectState = atom<Project | null>({
    key: 'state-project',
    default: getMainProject()
})

const contractState = atom<Contract | null>({
    key: 'state-contract',
    default: null
})

const implState = atom<Impl | null>({
    key: 'state-impl',
    default: null
})

export const useContractState = () => {
    const [project, setProject] = useRecoilState(projectState)
    const [contract, setContract] = useRecoilState(contractState)
    const [impl, setImpl] = useRecoilState(implState)

    // project 변경 시 하위 impl 초기화
    useEffect(() => {
        // setImpl(null)
    },[project?.id])


    return {
        project, setProject,
        contract, setContract,
        impl, setImpl
    }
}

export const useContractValue = () => {
    const project = useRecoilValue(projectState)
    const contract = useRecoilValue(contractState)
    const impl = useRecoilValue(implState)

    return {
        project,
        contract,
        impl
    }
}