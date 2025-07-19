// app/auth/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useLogin, LoginProvider } from "@/app/context/login";

const AuthContent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [justLoggedIn, setJustLoggedIn] = useState(false);
  const router = useRouter();
    const { login, logout, isLoggedIn } = useLogin();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');
        setSuccess('');
        try {
            let payload;
            if (isLogin) {
                payload = { email, password };
            } else {
                payload = { fullName, username, email, password };
            }
            const response = await fetch('/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Authentication failed');
            }
            if (isLogin) {
                login({ fullName: data.user?.fullName || '', email: data.user?.email || email });
                setJustLoggedIn(true);
                setTimeout(() => router.push('/'), 1000); // Redirect after a short delay
    } else {
                setSuccess('You are successfully registered. Now login.');
                setIsLogin(true);
                setFullName('');
                setUsername('');
                setEmail('');
                setPassword('');
            }
        } catch (error) {
            setError((error as Error).message || 'Authentication failed. Please check your credentials.');
        }
    };

    if (isLoggedIn && !justLoggedIn) {
        // Show a message and logout button if already logged in
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-fuchsia-100 via-yellow-100 to-cyan-100">
                <div className="p-8 w-full max-w-md text-center bg-white rounded-xl shadow-lg">
                    <h1 className="mb-4 text-2xl font-bold">You are already logged in!</h1>
                    <Button onClick={logout} className="w-full text-white bg-red-500 hover:bg-red-600">Logout</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex overflow-hidden relative justify-center items-center min-h-screen bg-gradient-to-br from-fuchsia-100 via-yellow-100 to-cyan-100 animated-bg">
            {/* Animated Paint Splashes */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {Array.from({ length: 10 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full animate-paint-splash"
                        style={{
                            width: `${Math.random() * 50 + 20}px`,
                            height: `${Math.random() * 50 + 20}px`,
                            background: [
                                "rgba(255, 20, 147, 0.3)",
                                "rgba(255, 140, 0, 0.3)",
                                "rgba(255, 255, 0, 0.3)",
                                "rgba(0, 255, 127, 0.3)",
                                "rgba(0, 191, 255, 0.3)",
                            ][Math.floor(Math.random() * 5)],
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                        }}
                    />
                ))}
            </div>
            <div className="relative z-10 p-8 w-full max-w-md rounded-2xl border border-fuchsia-100 shadow-2xl backdrop-blur-lg bg-white/90 animate-fade-in-up">
                <div className="flex flex-col items-center mb-6">
                    <span className="px-4 py-1 mb-2 text-xs font-semibold text-white bg-gradient-to-r from-fuchsia-500 via-yellow-400 to-cyan-500 rounded-full shadow-md animate-pulse-slow">
                        {isLogin ? 'Welcome Back!' : 'Join the Art Community'}
                    </span>
                    <h1 className="text-3xl font-bold tracking-tight text-center brush-stroke animate-text-shimmer">
                        {isLogin ? 'Login to Your Account' : 'Create an Account'}
                    </h1>
                </div>
                {/* Toggle Tabs */}
                <div className="flex overflow-hidden mb-6 rounded-lg border border-fuchsia-200 bg-fuchsia-50/60">
                    <button
                        className={`flex-1 py-2 text-sm font-medium transition-colors ${isLogin ? 'text-white bg-fuchsia-500 shadow' : 'text-fuchsia-600 hover:bg-fuchsia-100'} duration-200`}
                        onClick={() => setIsLogin(true)}
                        type="button"
                    >
                        Login
                    </button>
                    <button
                        className={`flex-1 py-2 text-sm font-medium transition-colors ${!isLogin ? 'text-white bg-fuchsia-500 shadow' : 'text-fuchsia-600 hover:bg-fuchsia-100'} duration-200`}
                        onClick={() => setIsLogin(false)}
                        type="button"
                    >
                        Sign Up
                    </button>
                </div>
                {success && <p className="mb-4 text-sm text-center text-green-600 animate-fade-in-down">{success}</p>}
                {error && <p className="mb-4 text-sm text-center text-red-500 animate-fade-in-down">{error}</p>}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 animate-fade-in-up animate-delay-200">
                    {!isLogin && (
                        <>
                            <Input
                                type="text"
                                placeholder="Full Name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                                className="border-fuchsia-200 bg-white/80 focus-visible:ring-fuchsia-400 placeholder:text-fuchsia-300"
                            />
                            <Input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="border-fuchsia-200 bg-white/80 focus-visible:ring-fuchsia-400 placeholder:text-fuchsia-300"
                            />
                        </>
                    )}
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border-fuchsia-200 bg-white/80 focus-visible:ring-fuchsia-400 placeholder:text-fuchsia-300"
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="border-fuchsia-200 bg-white/80 focus-visible:ring-fuchsia-400 placeholder:text-fuchsia-300"
                    />
                    <Button type="submit" className="gap-2 w-full bg-fuchsia-600 shadow-lg transition-all duration-300 hover:bg-fuchsia-700 hover:shadow-xl group shine animate-paint-drip">
                        {isLogin ? 'Login' : 'Sign Up'}
                    </Button>
                </form>
                <div className="mt-6 text-center">
                    <button
                        className="text-sm text-blue-500 hover:underline focus:outline-none"
                        onClick={() => setIsLogin(!isLogin)}
                        type="button"
                    >
                        {isLogin ? 'New here? Create an account' : 'Already have an account? Login'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const Auth = () => (
  <LoginProvider>
    <AuthContent />
  </LoginProvider>
);

export default Auth;
