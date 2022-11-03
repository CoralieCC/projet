import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectConnected } from "../store/authSlice";

export const PrivateRoute = () => {
    const connected = useSelector(selectConnected)

    return(
        connected ? <Outlet/> : <Navigate to='/'/>
    )
}