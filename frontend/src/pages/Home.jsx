import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { FaBolt, FaLock, FaChartLine, FaArrowRight } from "react-icons/fa";
import heroImg from "../assets/images/hero.png";

function Home() {
    return (
        <>
            <Navbar />

            {/* HERO */}
            <section className="hero">
                <div className="container hero-content">

                    <div className="hero-left">

                        <h1 className="title">
                            Shorten.
                            <br />
                            <span className="gradient-text">Share.</span>
                            <br />
                            Track.
                        </h1>

                        <p className="subtitle">
                            Create powerful short links with real-time analytics.
                            Manage every URL from one beautiful dashboard.
                        </p>

                        <div className="hero-buttons">
                            <Link to="/signup" className="primary-btn">
                                Get Started
                            </Link>

                            <Link to="/login" className="secondary-btn">
                                Login
                            </Link>
                        </div>

                    </div>

                    <div className="hero-right">
                        <img src={heroImg} alt="Shortify Hero" />
                    </div>

                </div>
            </section>

            {/* FEATURES */}

            <section id="features">

                <div className="container">

                    <div className="center">

                        <h2 className="title">
                            Everything You Need
                        </h2>

                        <p className="subtitle">
                            Powerful tools to manage your links like a professional.
                        </p>

                    </div>

                    <div className="cards">

                        <div className="card">

                            <FaBolt size={40} color="#7c3aed" />

                            <h3>Lightning Fast</h3>

                            <p>
                                Generate short URLs instantly with our optimized backend.
                            </p>

                        </div>

                        <div className="card">

                            <FaLock size={40} color="#7c3aed" />

                            <h3>Secure</h3>

                            <p>
                                Protected accounts with JWT authentication and encrypted passwords.
                            </p>

                        </div>

                        <div className="card">

                            <FaChartLine size={40} color="#7c3aed" />

                            <h3>Analytics</h3>

                            <p>
                                Track clicks and monitor the performance of every link.
                            </p>

                        </div>

                    </div>

                </div>

            </section>

            {/* STATS */}

            <section>

                <div className="container">

                    <div className="stats">

                        <div className="stat">
                            <h2>10K+</h2>
                            <p>Links Created</p>
                        </div>

                        <div className="stat">
                            <h2>1M+</h2>
                            <p>Clicks Tracked</p>
                        </div>

                        <div className="stat">
                            <h2>99.9%</h2>
                            <p>Uptime</p>
                        </div>

                    </div>

                </div>

            </section>

            {/* CTA */}

            <section id="how">

                <div className="container center">

                    <h2 className="title">
                        Ready to simplify your links?
                    </h2>

                    <p className="subtitle">
                        Join thousands of users using Shortify every day.
                    </p>

                    <div
                        style={{
                            marginTop: "40px"
                        }}
                    >

                        <Link to="/signup" className="primary-btn">

                            Create Free Account

                            <FaArrowRight
                                style={{
                                    marginLeft: "10px"
                                }}
                            />

                        </Link>

                    </div>

                </div>

            </section>

            <footer>

                © 2026 Shortify • Built with ❤️ using React & Express

            </footer>

        </>
    );
}

export default Home;