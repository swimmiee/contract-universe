import { MemoryRouter, Route, Routes } from "react-router-dom"
import AddAccount from "screens/create/createAccount"
import { CreateProject } from "screens/create/createProject"
import Home from "screens/home"
import { Header } from "routes/Header"
import { Login } from "screens/login"
import { Register } from "screens/register"
import { ROUTES } from "./route-names"
import styled from "styled-components"
import { CreateImplement } from "screens/create/createImplement"
import { CreateContract } from "screens/create/createContract"


const HEADER_HEIGHT = "78px"
const Wrapper = styled.div`
    #header {
        position: fixed;
        height: ${HEADER_HEIGHT};
        z-index: 10;
    }

    #header_padding {
        height: ${HEADER_HEIGHT};
    }
`

export function Router(){
    return (
        <MemoryRouter>
            <Header />
            <Routes>
                <Route 
                    path={ROUTES.LOGIN}
                    element={<Login />}
                />
                <Route 
                    path={ROUTES.REGISTER}
                    element={<Register />}
                />
                <Route 
                    path={ROUTES.HOME}
                    element={<Home />}
                />
                <Route 
                    path={ROUTES.ADD_ACCOUNT}
                    element={<AddAccount />}
                />
                <Route 
                    path={ROUTES.CREATE_PROJECT}
                    element={<CreateProject />}
                />
                <Route 
                    path={ROUTES.CREATE_CONTRACT}
                    element={<CreateContract />}
                />
                <Route 
                    path={ROUTES.CREATE_IMPLEMENTATION}
                    element={<CreateImplement />}
                />
            </Routes>
        </MemoryRouter>
    )    
}