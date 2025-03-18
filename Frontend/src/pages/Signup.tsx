import React, { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import DatePicker from "react-datepicker";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

import "react-datepicker/dist/react-datepicker.css";

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    otp: "",
    dob: undefined,
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOtpChange = (value) => {
    setFormData((prev) => ({ ...prev, otp: value }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, dob: date || undefined }));
  };

  const handleGenderChange = (value) => {
    setFormData((prev) => ({ ...prev, gender: value }));
  };

  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>
            {step === 1 && "Enter your personal information to get started"}
            {step === 2 && "Enter the verification code sent to your phone"}
            {step === 3 && "Complete your profile information"}
          </CardDescription>
        </CardHeader>
        <form onSubmit={step === 3 ? handleSubmit : (e) => e.preventDefault()}>
          <CardContent className="space-y-4">
            {step === 1 && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
                </div>
              </>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="text-center">
                  <p className="mb-4">We've sent a verification code to your phone number</p>
                  <div className="flex justify-center">
                   
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <div className="relative">
                    <DatePicker
                      selected={formData.dob}
                      onChange={handleDateChange}
                      dateFormat="PPP"
                      showYearDropdown
                      scrollableYearDropdown
                      yearDropdownItemNumber={100}
                      placeholderText="Select your date of birth"
                      className="w-full border rounded px-3 py-2 text-gray-700"
                    />
                    <CalendarIcon className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Gender</Label>
                  <RadioGroup value={formData.gender} onValueChange={handleGenderChange}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female">Female</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other">Other</Label>
                    </div>
                  </RadioGroup>
                </div>
              </>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            {step === 1 && (
              <Button type="button" onClick={handleNextStep} className="w-full">
                Next
              </Button>
            )}
            {step === 2 && (
              <div className="flex w-full space-x-2">
                <Button type="button" variant="outline" onClick={handlePrevStep} className="flex-1">
                  Back
                </Button>
                <Button type="button" onClick={handleNextStep} className="flex-1">
                  Verify
                </Button>
              </div>
            )}
            {step === 3 && (
              <div className="flex w-full space-x-2">
                <Button type="button" variant="outline" onClick={handlePrevStep} className="flex-1">
                  Back
                </Button>
                <Button type="submit" className="flex-1">
                  Create Account
                </Button>
              </div>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
