import { MemoryRouter, Route, Routes } from "react-router-dom"
import AddAccount from "screens/create/createAccount"
import { CreateProject } from "screens/create/createProject"
import Home from "screens/home"
import { Header } from "routes/header"
import { Login } from "screens/login"
import { Register } from "screens/register"
import { ROUTES } from "./route-names"
import { CreateImplement } from "screens/create/createImplement"
import { CreateContract } from "screens/create/createContract"
import ImportProject from "screens/importProject"


const HEADER_HEIGHT = "78px"

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
                <Route 
                    path={ROUTES.IMPORT_PROJECT}
                    element={<ImportProject />}
                />
            </Routes>
        </MemoryRouter>
    )    
}