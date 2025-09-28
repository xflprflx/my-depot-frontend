import { Routes } from "@angular/router";
import { LayoutComponent } from "../components/layout/layout.component";
import { LoginComponent } from "./login/login.component";

export default [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent,
            }
        ]
    }
] as Routes;