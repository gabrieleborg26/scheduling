import Link from "next/link";
import { useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import Head from "next/head";

const Login: NextPage = () => {
    const router = useRouter();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<any>(null);

    const handleLogin = async (e: any) => {
        e.preventDefault();
        try {
            await login(email, password)
                .then(() => {
                    router.push("/dashboard");
                })
                .catch((e: any) => {
                    console.log("LOGIN IN ERROR", e);
                    setError(e);
                });
        } catch (err) {
            setError(err);
            console.log(err);
        }
    };

    return (
        <div className="h-screen">
            <Head>
                <title>Login</title>
            </Head>
            <div className="flex h-screen">
                <div className="bg-gray-100  w-full flex justify-center items-center ">
                    <form onSubmit={handleLogin} className="w-5/12 text-center">
                        <p className="text-xl md:text-3xl font-bold mb-1 ml-1">
                            Welcome Back...
                        </p>
                        <p className="font-500 mb-5 ml-1">
                            Enter your username and password
                        </p>

                        <div className="w-full">
                            <input
                                type="email"
                                value={email}
                                onChange={(event: any) => setEmail(event.target.value)}
                                name="email"
                                id="loginEmail"
                                placeholder="Email"
                                className="rounded-xl p-3 mb-4 w-full"
                            />
                        </div>
                        <div className="w-full">
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={(event: any) => setPassword(event.target.value)}
                                id="loginPassword"
                                placeholder="Password"
                                className="rounded-xl p-3 w-full"
                            />
                        </div>
                        <div>
                            <button className="bg-blue-600 w-full text-white px-9 py-2 rounded-lg my-10 shadow-[0_15px_20px_rgba(0,0,255,0.25)]">
                                Login
                            </button>
                            {error && (
                                <div
                                    color="danger"
                                    className="alert alert-error shadow-lg text-white"
                                >
                                    {error}
                                </div>
                            )}
                        </div>
                        <div className="form-control mt-5">
                            <div>
                                <Link href="/sign_up">Forgot Password?</Link>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="w-full">

                </div>
            </div>
        </div>
    );
};

export default Login;