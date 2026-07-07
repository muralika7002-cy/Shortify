import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "http://localhost:5000/api/auth/login",
                formData
            );

            localStorage.setItem("token", res.data.token);

            alert("Login Successful!");

            navigate("/dashboard");
        } catch (err) {
            alert(
                err.response?.data?.message || "Login Failed"
            );
        }
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#0f172a"
            }}
        >
            <form
                onSubmit={handleLogin}
                style={{
                    width: "400px",
                    background: "#1e293b",
                    padding: "40px",
                    borderRadius: "18px"
                }}
            >
                <h1
                    style={{
                        marginBottom: "30px",
                        textAlign: "center"
                    }}
                >
                    Welcome Back 👋
                </h1>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{
                        width: "100%",
                        padding: "15px",
                        marginBottom: "20px",
                        borderRadius: "10px",
                        border: "none"
                    }}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    style={{
                        width: "100%",
                        padding: "15px",
                        marginBottom: "25px",
                        borderRadius: "10px",
                        border: "none"
                    }}
                />

                <button
                    type="submit"
                    className="primary-btn"
                    style={{
                        width: "100%"
                    }}
                >
                    Login
                </button>

                <p
                    style={{
                        marginTop: "20px",
                        textAlign: "center"
                    }}
                >
                    Don't have an account?{" "}
                    <Link
                        to="/signup"
                        style={{
                            color: "#7c3aed"
                        }}
                    >
                        Signup
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default Login;