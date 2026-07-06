import { useState } from "react";
import api from "../services/api";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/api/auth/signup", {
                email,
                password
            });

            setMessage(response.data.message);
        } catch (error) {
            setMessage(
                error.response?.data?.message || "Signup failed"
            );
        }
    };

    return (
        <div>
            <h1>Signup</h1>

            <form onSubmit={handleSignup}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <br />
                <br />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <br />
                <br />

                <button type="submit">
                    Sign Up
                </button>
            </form>

            <p>{message}</p>
        </div>
    );
}

export default Signup;