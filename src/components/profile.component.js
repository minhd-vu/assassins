import { UserContext } from "../contexts/user.context";
import { useContext } from "react";

export default function Profile() {
    const user = useContext(UserContext);

    return (
        <div>
            <h5>{user.username}'s Profile</h5>
        </div>
    );
}