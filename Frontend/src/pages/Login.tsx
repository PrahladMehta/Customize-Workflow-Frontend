import React, { useState, useEffect } from "react";
import { Mail, Lock, LogIn, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: "", password: "" });
  
  // Background animation effects
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const newError = { email: "", password: "" };
    let isValid = true;

    if (!email.trim()) {
      newError.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newError.email = "Invalid email format.";
      isValid = false;
    }

    if (!password) {
      newError.password = "Password is required.";
      isValid = false;
    }

    setError(newError);

    if (isValid) {
      // Handle login logic here
      console.log({ email, password });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-950 to-black">
      {/* Dynamic background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient blobs */}
        <div className="absolute top-0 -left-20 w-72 h-72 bg-gradient-to-r from-violet-600/20 to-indigo-600/20 rounded-full filter blur-3xl opacity-20 animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-l from-blue-500/20 to-cyan-400/20 rounded-full filter blur-3xl opacity-20 animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }}></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-bl from-fuchsia-500/20 to-purple-600/20 rounded-full filter blur-3xl opacity-10 animate-pulse" style={{ animationDuration: '7s', animationDelay: '2s' }}></div>
        
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNGgyLTJoLTJ6TTM1IDM2di0yMmgtMXYyMmgxeiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIvPjwvZz48L3N2Zz4=')] opacity-30"></div>
        
      


        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8 space-y-3 animate-fade-in">
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="inline-block transform transition-all duration-300 hover:scale-105 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600">
              Customize Workflow
            </span>
          </h1>
          <p className="text-gray-400 text-sm">
            Login to your account to continue
          </p>
        </div>

        <Card className="bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden rounded-xl">
          <CardHeader className="space-y-1 px-6 pt-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-medium text-white">
                Welcome back
                <div className="h-[1px] bg-gradient-to-r from-cyan-500/30 via-blue-400/20 to-indigo-400/10 mt-1.5"></div>
              </CardTitle>
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-cyan-500/20 to-blue-500/20 ring-1 ring-white/10">
                <User className="h-5 w-5 text-cyan-400" />
              </div>
            </div>
            <CardDescription className="text-gray-400">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 p-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium flex items-center gap-1.5 text-gray-300">
                  <Mail className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Email</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={cn(
                    "transition-all duration-200 focus:ring-2 ring-offset-2 ring-offset-black/80 bg-gray-900/50 border-gray-700 text-white",
                    error.email ? "ring-red-500/50" : "focus:ring-cyan-500/50"
                  )}
                />
                {error.email && (
                  <p className="text-red-400 text-xs mt-1">{error.email}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium flex items-center gap-1.5 text-gray-300">
                    <Lock className="h-3.5 w-3.5 text-cyan-400" />
                    <span>Password</span>
                  </Label>
                  <Link to="/forgot-password" className="text-xs text-cyan-500 hover:text-cyan-400 transition-colors font-medium">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={cn(
                    "transition-all duration-200 focus:ring-2 ring-offset-2 ring-offset-black/80 bg-gray-900/50 border-gray-700 text-white",
                    error.password ? "ring-red-500/50" : "focus:ring-cyan-500/50"
                  )}
                />
                {error.password && (
                  <p className="text-red-400 text-xs mt-1">{error.password}</p>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4 px-6 pb-6 pt-2">
              <Button 
                type="submit" 
                className="w-full group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all duration-200"
                size="lg"
              >
                <span className="relative z-10 flex items-center justify-center gap-1">
                  Login
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </span>
              </Button>
              
              <div className="text-center text-sm text-gray-400">
                Don't have an account?{" "}
                <Link to="/signup" className="text-cyan-500 hover:text-cyan-400 transition-colors font-medium">
                  Sign up
                </Link>
              </div>
              
              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-800"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-black/50 px-2 text-gray-500">Or continue with</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  type="button" 
                  className="border-gray-700 bg-gray-900/30 text-white hover:bg-gray-800 hover:text-white transition-all duration-200"
                >
                  <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                    <path d="M1 1h22v22H1z" fill="none" />
                  </svg>
                  Google
                </Button>
                <Button 
                  variant="outline" 
                  type="button" 
                  className="border-gray-700 bg-gray-900/30 text-white hover:bg-gray-800 hover:text-white transition-all duration-200"
                >
                  <svg viewBox="0 0 438.549 438.549" className="h-4 w-4 mr-2">
                    <path
                      fill="currentColor"
                      d="M409.132,114.573c-19.608-33.596-46.205-60.194-79.798-79.8C295.736,15.166,259.057,5.365,219.271,5.365
                      c-39.781,0-76.472,9.804-110.063,29.408c-33.596,19.605-60.192,46.204-79.8,79.8C9.803,148.168,0,184.854,0,224.63
                      c0,47.78,13.94,90.745,41.827,128.906c27.884,38.164,63.906,64.572,108.063,79.227c5.14,0.954,8.945,0.283,11.419-1.996
                      c2.475-2.282,3.711-5.14,3.711-8.562c0-0.571-0.049-5.708-0.144-15.417c-0.098-9.709-0.144-18.179-0.144-25.406l-6.567,1.136
                      c-4.187,0.767-9.469,1.092-15.846,1c-6.374-0.089-12.991-0.757-19.842-1.999c-6.854-1.231-13.229-4.086-19.13-8.559
                      c-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559
                      c-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-0.951-2.568-2.098-3.711-3.429c-1.142-1.331-1.997-2.663-2.568-3.997
                      c-0.572-1.335-0.098-2.43,1.427-3.289c1.525-0.859,4.281-1.276,8.28-1.276l5.708,0.853c3.807,0.763,8.516,3.042,14.133,6.851
                      c5.614,3.806,10.229,8.754,13.846,14.842c4.38,7.806,9.657,13.754,15.846,17.847c6.184,4.093,12.419,6.136,18.699,6.136
                      c6.28,0,11.704-0.476,16.274-1.423c4.565-0.952,8.848-2.383,12.847-4.285c1.713-12.758,6.377-22.559,13.988-29.41
                      c-10.848-1.14-20.601-2.857-29.264-5.14c-8.658-2.286-17.605-5.996-26.835-11.14c-9.235-5.137-16.896-11.516-22.985-19.126
                      c-6.09-7.614-11.088-17.61-14.987-29.979c-3.901-12.374-5.852-26.648-5.852-42.826c0-23.035,7.52-42.637,22.557-58.817
                      c-7.044-17.318-6.379-36.732,1.997-58.24c5.52-1.715,13.706-0.428,24.554,3.853c10.85,4.283,18.794,7.952,23.84,10.994
                      c5.046,3.041,9.089,5.618,12.135,7.708c17.705-4.947,35.976-7.421,54.818-7.421s37.117,2.474,54.823,7.421l10.849-6.849
                      c7.419-4.57,16.18-8.758,26.262-12.565c10.088-3.805,17.802-4.853,23.134-3.138c8.562,21.509,9.325,40.922,2.279,58.24
                      c15.036,16.18,22.559,35.787,22.559,58.817c0,16.178-1.958,30.497-5.853,42.966c-3.9,12.471-8.941,22.457-15.125,29.979
                      c-6.191,7.521-13.901,13.85-23.131,18.986c-9.232,5.14-18.182,8.85-26.84,11.136c-8.662,2.286-18.415,4.004-29.263,5.146
                      c9.894,8.562,14.842,22.077,14.842,40.539v60.237c0,3.422,1.19,6.279,3.572,8.562c2.379,2.279,6.136,2.95,11.276,1.995
                      c44.163-14.653,80.185-41.062,108.068-79.226c27.88-38.161,41.825-81.126,41.825-128.906
                      C438.536,184.851,428.728,148.168,409.132,114.573z"
                    />
                  </svg>
                  GitHub
                </Button>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
