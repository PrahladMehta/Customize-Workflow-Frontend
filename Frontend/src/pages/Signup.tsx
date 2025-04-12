import React, { useState, useEffect } from "react";
import { CalendarIcon, User, Mail, Phone, ChevronRight, ChevronLeft, UserCheck, Lock, Users, Check, X} from "lucide-react";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


import "react-datepicker/dist/react-datepicker.css";

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",

    otp: "",
    password: "",
    confirmPassword: "",
    dob: undefined as Date | undefined,
    gender: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [passwordChecks, setPasswordChecks] = useState({
    hasMinLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecialChar: false
  });

  useEffect(() => {
     console.log(formData);
  },[formData.dob]);

  useEffect(() => {
    if (formData.password) {
      setPasswordChecks({
        hasMinLength: formData.password.length >= 8,
        hasUppercase: /[A-Z]/.test(formData.password),
        hasLowercase: /[a-z]/.test(formData.password),
        hasNumber: /[0-9]/.test(formData.password),
        hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password)
      });
    } else {
      setPasswordChecks({
        hasMinLength: false,
        hasUppercase: false,
        hasLowercase: false,
        hasNumber: false,
        hasSpecialChar: false
      });
    }
  }, [formData.password]);

  const getPasswordStrength = () => {
    const { hasMinLength, hasUppercase, hasLowercase, hasNumber, hasSpecialChar } = passwordChecks;
    const checks = [hasMinLength, hasUppercase, hasLowercase, hasNumber, hasSpecialChar];
    const passedChecks = checks.filter(Boolean).length;

    if (passedChecks === 0) return { strength: 0, color: "" };
    if (passedChecks === 1) return { strength: 20, color: "bg-red-500" };
    if (passedChecks === 2) return { strength: 40, color: "bg-orange-500" };
    if (passedChecks === 3) return { strength: 60, color: "bg-yellow-500" };
    if (passedChecks === 4) return { strength: 80, color: "bg-blue-500" };
    return { strength: 100, color: "bg-green-500" };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleOtpChange = (value: string) => {
    if (/^\d*$/.test(value)) {
      setFormData((prev) => ({ ...prev, otp: value }));
      
      if (errors.otp) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.otp;
          return newErrors;
        });
      }
    }
  };

  const handleDateChange = (date: Date | null) => {
    console.log("DATE",date);
    setFormData((prev) => ({ ...prev, dob: date || undefined }));
    
    if (errors.dob) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.dob;
        return newErrors;
      });
    }
  };

  const handleGenderChange = (value: string) => {
    setFormData((prev) => ({ ...prev, gender: value }));
    
    if (errors.gender) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.gender;
        return newErrors;
      });
    }
  };

  const handleNextStep = () => {
    let newErrors: Record<string, string> = {};
    let isValid = true;

    if (step === 1) {
      if (!formData.firstName.trim()) {
        newErrors.firstName = "First name is required.";
        isValid = false;
      }
      if (!formData.lastName.trim()) {
        newErrors.lastName = "Last name is required.";
        isValid = false;
      }
      if (!formData.email.trim()) {
        newErrors.email = "Email is required.";
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Invalid email format.";
        isValid = false;
      }
    }

    if (step === 2) {
      if (!formData.otp || formData.otp.length !== 6) {
        newErrors.otp = "Enter a valid 6-digit OTP.";
        isValid = false;
      }
    }

    if (step === 3) {
      if (!formData.password) {
        newErrors.password = "Password is required.";
        isValid = false;
      } else {
        const { hasMinLength, hasUppercase, hasLowercase, hasNumber, hasSpecialChar } = passwordChecks;
        if (!hasMinLength) {
          newErrors.password = "Password must be at least 8 characters.";
          isValid = false;
        } else if (!hasUppercase) {
          newErrors.password = "Password must include at least one uppercase letter.";
          isValid = false;
        } else if (!hasLowercase) {
          newErrors.password = "Password must include at least one lowercase letter.";
          isValid = false;
        } else if (!hasNumber) {
          newErrors.password = "Password must include at least one number.";
          isValid = false;
        } else if (!hasSpecialChar) {
          newErrors.password = "Password must include at least one special character.";
          isValid = false;
        }
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password.";
        isValid = false;
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match.";
        isValid = false;
      }
    }

    if (step === 4) {
      if (!formData.dob) {
        newErrors.dob = "Date of birth is required.";
        isValid = false;
      }
      if (!formData.gender) {
        newErrors.gender = "Please select a gender.";
        isValid = false;
      }
    }

    setErrors(newErrors);
    if (!isValid) return;
    
    setDirection("forward");
    setStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setDirection("backward");
    setStep((prev) => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  const getStepAnimation = () => {
    if (direction === "forward") {
      return "animate-slide-in-right";
    } else {
      return "animate-slide-in-left";
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-950 to-black">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 -left-20 w-72 h-72 bg-gradient-to-r from-violet-600/20 to-indigo-600/20 rounded-full filter blur-3xl opacity-20 animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-l from-blue-500/20 to-cyan-400/20 rounded-full filter blur-3xl opacity-20 animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }}></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-bl from-fuchsia-500/20 to-purple-600/20 rounded-full filter blur-3xl opacity-10 animate-pulse" style={{ animationDuration: '7s', animationDelay: '2s' }}></div>
        
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNGgyLTJoLTJ6TTM1IDM2di0yMmgtMXYyMmgxeiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIvPjwvZz48L3N2Zz4=')] opacity-30"></div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8 space-y-3">
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="inline-block transform transition-all duration-300 hover:scale-105 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600">
              Customize Workflow
            </span>
          </h1>
          <p className="text-gray-400 text-sm">
            Create your personal account to get started
          </p>
        </div>

        <Card className="bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden rounded-xl">
          <CardHeader className="space-y-4 px-6 pt-6 pb-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-300">
                {step === 1 && "Personal Information"}
                {step === 2 && "Verification"}
                {step === 3 && "Security"}
                {step === 4 && "Profile Details"}
              </CardTitle>
              <div className="flex space-x-1.5">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-500",
                      step === i 
                        ? "w-10 bg-gradient-to-r from-cyan-400 to-blue-500" 
                        : step > i 
                          ? "w-8 bg-blue-500/60" 
                          : "w-8 bg-gray-800"
                    )}
                  ></div>
                ))}
              </div>
            </div>
            <CardDescription className="text-sm text-gray-400">
              {step === 1 && "Enter your personal details to get started"}
              {step === 2 && "Enter the 6-digit code sent to your email"}
              {step === 3 && "Create a secure password for your account"}
              {step === 4 && "Complete your profile to personalize your experience"}
            </CardDescription>
          </CardHeader>

          <form onSubmit={(e) => e.preventDefault()}>
            <CardContent className={cn("space-y-4 p-6", getStepAnimation())}>
              {step === 1 && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-sm font-medium flex items-center gap-1.5 text-gray-300">
                        <User className="h-3.5 w-3.5 text-cyan-400" />
                        <span>First Name</span>
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={cn(
                          "transition-all duration-200 focus:ring-2 ring-offset-2 ring-offset-black/80 bg-gray-900/50 border-gray-700 text-white",
                          errors.firstName ? "ring-red-500/50" : "focus:ring-cyan-500/50"
                        )}
                        placeholder="John"
                      />
                      {errors.firstName && (
                        <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-sm font-medium flex items-center gap-1.5 text-gray-300">
                        <User className="h-3.5 w-3.5 text-cyan-400" />
                        <span>Last Name</span>
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={cn(
                          "transition-all duration-200 focus:ring-2 ring-offset-2 ring-offset-black/80 bg-gray-900/50 border-gray-700 text-white",
                          errors.lastName ? "ring-red-500/50" : "focus:ring-cyan-500/50"
                        )}
                        placeholder="Doe"
                      />
                      {errors.lastName && (
                        <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium flex items-center gap-1.5 text-gray-300">
                      <Mail className="h-3.5 w-3.5 text-cyan-400" />
                      <span>Email</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={cn(
                        "transition-all duration-200 focus:ring-2 ring-offset-2 ring-offset-black/80 bg-gray-900/50 border-gray-700 text-white",
                        errors.email ? "ring-red-500/50" : "focus:ring-cyan-500/50"
                      )}
                      placeholder="john.doe@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>           
                </>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-5 ring-1 ring-white/10">
                      <Mail className="h-8 w-8 text-cyan-400" />
                    </div>
                    <h3 className="text-lg font-medium mb-2 text-white">Verification Code</h3>
                    <p className="text-gray-400 text-sm mb-6 max-w-xs">
                      We've sent a 6-digit verification code to your email {formData.email}
                    </p>

                    <div className="w-full max-w-xs">
                      <InputOTP 
                        maxLength={6} 
                        value={formData.otp} 
                        onChange={handleOtpChange}
                        containerClassName="group"
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} className="transition-all duration-200 bg-gray-900/50 border-gray-700 text-white focus:border-cyan-500" />
                          <InputOTPSlot index={1} className="transition-all duration-200 bg-gray-900/50 border-gray-700 text-white focus:border-cyan-500" />
                          <InputOTPSlot index={2} className="transition-all duration-200 bg-gray-900/50 border-gray-700 text-white focus:border-cyan-500" />
                        </InputOTPGroup>
                        <InputOTPSeparator className="text-gray-600" />
                        <InputOTPGroup>
                          <InputOTPSlot index={3} className="transition-all duration-200 bg-gray-900/50 border-gray-700 text-white focus:border-cyan-500" />
                          <InputOTPSlot index={4} className="transition-all duration-200 bg-gray-900/50 border-gray-700 text-white focus:border-cyan-500" />
                          <InputOTPSlot index={5} className="transition-all duration-200 bg-gray-900/50 border-gray-700 text-white focus:border-cyan-500" />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>

                    {errors.otp && (
                      <p className="text-red-400 text-xs mt-3">{errors.otp}</p>
                    )}
                    
                    <p className="text-sm mt-6">
                      <button type="button" className="text-cyan-500 hover:text-cyan-400 transition-colors font-medium">
                        Resend code
                      </button>
                    </p>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium flex items-center gap-1.5 text-gray-300">
                      <Lock className="h-3.5 w-3.5 text-cyan-400" />
                      <span>Password</span>
                    </Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={cn(
                        "transition-all duration-200 focus:ring-2 ring-offset-2 ring-offset-black/80 bg-gray-900/50 border-gray-700 text-white",
                        errors.password ? "ring-red-500/50" : "focus:ring-cyan-500/50"
                      )}
                      placeholder="Create a strong password"
                    />
                    {errors.password && (
                      <p className="text-red-400 text-xs mt-1">{errors.password}</p>
                    )}
                    
                    {formData.password && (
                      <div className="mt-2 space-y-1">
                        <div className="h-1.5 w-full bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${getPasswordStrength().color}`} 
                            style={{ width: `${getPasswordStrength().strength}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-400">
                          {getPasswordStrength().strength < 40 && "Weak"}
                          {getPasswordStrength().strength >= 40 && getPasswordStrength().strength < 80 && "Medium"}
                          {getPasswordStrength().strength >= 80 && "Strong"}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium flex items-center gap-1.5 text-gray-300">
                      <Lock className="h-3.5 w-3.5 text-cyan-400" />
                      <span>Confirm Password</span>
                    </Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={cn(
                        "transition-all duration-200 focus:ring-2 ring-offset-2 ring-offset-black/80 bg-gray-900/50 border-gray-700 text-white",
                        errors.confirmPassword ? "ring-red-500/50" : "focus:ring-cyan-500/50"
                      )}
                      placeholder="Confirm your password"
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>
                    )}
                  </div>
                  
                  <div className="rounded-lg bg-gray-800/30 p-4 mt-4 border border-gray-800 space-y-2">
                    <h3 className="text-sm font-medium text-gray-300 mb-2">Password Requirements:</h3>
                    <ul className="space-y-1.5">
                      <li className="flex items-center text-xs">
                        {passwordChecks.hasMinLength ? (
                          <Check className="h-3.5 w-3.5 mr-2 text-green-500" />
                        ) : (
                          <X className="h-3.5 w-3.5 mr-2 text-gray-500" />
                        )}
                        <span className={passwordChecks.hasMinLength ? "text-gray-300" : "text-gray-500"}>
                          At least 8 characters
                        </span>
                      </li>
                      <li className="flex items-center text-xs">
                        {passwordChecks.hasUppercase ? (
                          <Check className="h-3.5 w-3.5 mr-2 text-green-500" />
                        ) : (
                          <X className="h-3.5 w-3.5 mr-2 text-gray-500" />
                        )}
                        <span className={passwordChecks.hasUppercase ? "text-gray-300" : "text-gray-500"}>
                          At least one uppercase letter (A-Z)
                        </span>
                      </li>
                      <li className="flex items-center text-xs">
                        {passwordChecks.hasLowercase ? (
                          <Check className="h-3.5 w-3.5 mr-2 text-green-500" />
                        ) : (
                          <X className="h-3.5 w-3.5 mr-2 text-gray-500" />
                        )}
                        <span className={passwordChecks.hasLowercase ? "text-gray-300" : "text-gray-500"}>
                          At least one lowercase letter (a-z)
                        </span>
                      </li>
                      <li className="flex items-center text-xs">
                        {passwordChecks.hasNumber ? (
                          <Check className="h-3.5 w-3.5 mr-2 text-green-500" />
                        ) : (
                          <X className="h-3.5 w-3.5 mr-2 text-gray-500" />
                        )}
                        <span className={passwordChecks.hasNumber ? "text-gray-300" : "text-gray-500"}>
                          At least one number (0-9)
                        </span>
                      </li>
                      <li className="flex items-center text-xs">
                        {passwordChecks.hasSpecialChar ? (
                          <Check className="h-3.5 w-3.5 mr-2 text-green-500" />
                        ) : (
                          <X className="h-3.5 w-3.5 mr-2 text-gray-500" />
                        )}
                        <span className={passwordChecks.hasSpecialChar ? "text-gray-300" : "text-gray-500"}>
                          At least one special character (!@#$%^&*...)
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {step === 4 && (
                <>
                <div className="space-y-2">
                  <Label htmlFor="dob" className="text-sm font-medium flex items-center gap-1.5 text-gray-300">
                    <CalendarIcon className="h-3.5 w-3.5 text-cyan-400" />
                    <span>Date of Birth</span>
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal relative pl-3 pr-10 py-2.5",
                          "bg-gray-900/50 border-gray-700 hover:bg-gray-800/50 hover:border-gray-600",
                          "focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black/80",
                          "transition-all duration-200",
                          !formData.dob && "text-gray-500",
                          errors.dob && "ring-2 ring-red-500"
                        )}
                      >
                        <CalendarIcon className="mr-2.5 h-4 w-4 text-cyan-400/80" />
                        {formData.dob ?<span className="text-gray-300">{format(formData.dob, "MMMM d, yyyy") }</span> : <span className="text-gray-500">Select date</span>}
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <CalendarIcon className="h-4 w-4 text-gray-500" />
                        </div>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent 
                      className="w-auto p-0 bg-gray-800 border border-gray-700 shadow-xl shadow-black/20" 
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={formData.dob}
                        onSelect={handleDateChange}
                        disabled={(date) =>
                          date < new Date() 
                        }
                        initialFocus
                        showOutsideDays={false}
                      
                        className={cn(
                          "p-3 pointer-events-auto bg-gray-800 text-gray-100",
                          "rounded-md border-gray-700"
                        )}
                        classNames={{
                          day_selected: "bg-cyan-600 text-white hover:bg-cyan-600 hover:text-white focus:bg-cyan-600 focus:text-white",
                          day_today: "bg-gray-700 text-cyan-400",
                          day: cn(
                            "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-gray-700 focus:bg-gray-700",
                            "text-gray-300 hover:text-cyan-400 focus:text-cyan-400"
                          ),
                          caption: "flex justify-center pt-1 relative items-center text-gray-300",
                          caption_label: "text-sm font-medium text-gray-200",
                          nav_button: cn(
                            "h-7 w-7 bg-transparent p-0 opacity-70 hover:opacity-100",
                            "border border-gray-700 text-gray-300 hover:bg-gray-700"
                          ),
                          head_cell: "text-gray-500 rounded-md w-9 font-normal text-[0.8rem]",
                          cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-gray-700",
                          table: "w-full border-collapse space-y-1",
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.dob && (
                    <p className="text-red-400 text-xs mt-1">{errors.dob}</p>
                  )}
                </div>
                
                <div className="space-y-2 mt-4">
                  <Label className="text-sm font-medium flex items-center gap-1.5 text-gray-300">
                    <Users className="h-3.5 w-3.5 text-cyan-400" />
                    <span>Gender</span>
                  </Label>
                  <RadioGroup 
                    value={formData.gender} 
                    onValueChange={handleGenderChange} 
                    className="space-y-2.5"
                  >
                    {["male", "female", "other"].map((gender) => (
                      <div 
                        key={gender}
                        className={cn(
                          "flex items-center space-x-2 rounded-md border border-gray-700 p-3.5 transition-all duration-200",
                          "bg-gray-900/50 hover:bg-gray-800/50 hover:border-gray-600",
                          formData.gender === gender 
                            ? "bg-gradient-to-r from-cyan-900/40 to-blue-900/40 border-cyan-700/70 shadow-inner shadow-cyan-900/10" 
                            : "",
                          errors.gender ? "ring-2 ring-red-500" : ""
                        )}
                      >
                        <RadioGroupItem 
                          value={gender} 
                          id={gender} 
                          className="border-gray-600 text-cyan-500" 
                        />
                        <Label 
                          htmlFor={gender} 
                          className="flex-1 cursor-pointer font-normal text-white capitalize"
                        >
                          {gender}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                  {errors.gender && (
                    <p className="text-red-400 text-xs mt-1">{errors.gender}</p>
                  )}
                </div>
              </>
              )}
            </CardContent>

            <CardFooter className="flex flex-col space-y-4 px-6 pb-6 pt-2">
              {step === 1 && (
                <div className="w-full space-y-4">
                  <Button 
                    type="button" 
                    onClick={handleNextStep} 
                    className="w-full group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all duration-200"
                    size="lg"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-1">
                      Continue
                      <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </Button>
                  
                  <div className="text-center text-sm text-gray-400">
                    Already have an account?{" "}
                    <Link to="/" className="text-cyan-500 hover:text-cyan-400 transition-colors font-medium">
                      Sign in
                    </Link>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="grid grid-cols-2 gap-3 w-full">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handlePrevStep} 
                    className="group border-gray-700 bg-gray-900/30 text-white hover:bg-gray-800 hover:text-white"
                    size="lg"
                  >
                    <ChevronLeft className="mr-1 h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
                    <span>Back</span>
                  </Button>
                  <Button 
                    type="button" 
                    onClick={handleNextStep} 
                    className="group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all duration-200"
                    size="lg"
                  >
                    <span>Verify</span>
                    <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                </div>
              )}

              {step === 3 && (
                <div className="grid grid-cols-2 gap-3 w-full">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handlePrevStep} 
                    className="group border-gray-700 bg-gray-900/30 text-white hover:bg-gray-800 hover:text-white"
                    size="lg"
                  >
                    <ChevronLeft className="mr-1 h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
                    <span>Back</span>
                  </Button>
                  <Button 
                    type="button" 
                    onClick={handleNextStep} 
                    className="group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all duration-200"
                    size="lg"
                  >
                    <span>Continue</span>
                    <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                </div>
              )}

              {step === 4 && (
                <div className="grid grid-cols-2 gap-3 w-full">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handlePrevStep} 
                    className="group border-gray-700 bg-gray-900/30 text-white hover:bg-gray-800 hover:text-white"
                    size="lg"
                  >
                    <ChevronLeft className="mr-1 h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
                    <span>Back</span>
                  </Button>
                  <Button 
                    type="button" 
                    onClick={handleSubmit} 
                    className="group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all duration-200"
                    size="lg"
                  >
                    <span className="flex items-center justify-center gap-1">
                      Create Account
                      <UserCheck className="h-4 w-4 ml-1" />
                    </span>
                  </Button>
                </div>
              )}
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}