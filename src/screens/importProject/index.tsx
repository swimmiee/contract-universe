import { Box, Button, TextField, Typography } from "@mui/material";
import { useLoadTextFile } from "utils/loadTextFile";
import { useState } from "react";
import { ProjectEntity } from "core/projects/exportProject";
import { useCallback } from "react";
import { importProject, isValidProject } from "core/projects/importProject";
import { ChangeEvent } from "react";
import { Async } from "react-async";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "routes";
import { useContractState } from "atoms";
import { getProjects } from "core";


function ImportProject(){
    const navigate = useNavigate()
    const { setProject } = useContractState()
    const [imported, setImported] = useState<ProjectEntity | null>(null)
    const onLoadText = useCallback((text: string) => {
        const tobeImported = JSON.parse(text)
        if(!isValidProject(tobeImported)){
            alert("올바르지 않은 프로젝트 파일입니다.")
            return;
        }

        setImported(tobeImported as ProjectEntity)
    },[])

    const onChangeFile = useLoadTextFile(onLoadText)
    const onChangeName = useCallback((e:ChangeEvent<HTMLInputElement>) => {
        setImported(prev => {
            if(!prev)
                return prev;
            else return {
                ...prev,
                name: e.target.value
            }
        })
    },[])

    const onImport = async () => {
        if(!imported)
            return;
        await importProject(imported).then((proj) => {
            setProject(proj)
            navigate(ROUTES.HOME);
        })
    }


    return (
        <Box p={5}>
            {!imported ? (
                <>
                    <Typography 
                        variant="h6"
                        children="프로젝트 JSON 파일을 업로드하세요."
                        mb={1.5}
                    />
                    <Button
                        variant="outlined"
                        component="label"
                        fullWidth
                        sx={{mt: 2}}
                    >
                        파일 업로드
                        <input
                            accept="json"
                            type="file"
                            hidden
                            onChange={onChangeFile}
                        />
                    </Button>
                </>
            ) : (
                <Async promiseFn={getProjects}>
                    {({data: projects, isResolved}) => {
                        if(isResolved) {
                            projects = projects || []
                            const isError = projects.map(p => p.name).includes(imported?.name || "")
                            return (
                            <>
                                <Typography 
                                    variant="h6"
                                    children="프로젝트명"
                                    mb={2.5}
                                />
                                <TextField 
                                    fullWidth
                                    label="프로젝트 이름"
                                    value={imported?.name || ""}
                                    onChange={onChangeName}
                                    error={isError}
                                    required
                                    helperText={isError ? "이미 등록된 프로젝트 이름입니다." : ""}
                                />

                                <Box display="flex" mt={2.5}>
                                    <Button
                                        variant="outlined"
                                        component="label"
                                        sx={{
                                            display: "flex",
                                            flex: 1
                                        }}
                                    >
                                        다른 프로젝트 선택
                                        <input
                                            accept="json"
                                            type="file"
                                            hidden
                                            onChange={onChangeFile}
                                        />

                                    </Button>

                                    <Button
                                        variant="contained"
                                        sx={{
                                            display: "flex",
                                            flex: 2.5,
                                            ml: 2
                                        }}
                                        onClick={onImport}
                                    >
                                        확인
                                    </Button>
                                </Box>
                            </>
                        )
                    }}}
                </Async>
            )}
           
        </Box>
    )
}

export default ImportProject;