import { Navigate } from "react-router-dom";
interface ProtectedRouteDetails {
    user: any;
    children: any;
}
const ProtectedRoute = ({user, children}: ProtectedRouteDetails) => {
    if (user === null || user === undefined) {
        return <Navigate to="/" replace />
    }
    return children;
}

export default ProtectedRoute;