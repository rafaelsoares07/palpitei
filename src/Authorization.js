import { Navigate } from "react-router-dom"

export default function ProtectRouter({permissions, children, permissionRequired, path}) {

    const permissionsUser = permissions

    const havePermission = permissionRequired.some((el)=>permissionsUser.includes(el))

    return havePermission? children:<Navigate to={path} replace/>

}