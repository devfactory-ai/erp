import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { createDoc } from "@/lib/api";

export default function Onboarding() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    // Step 1: Company
    const [companyName, setCompanyName] = useState("");
    const [currency, setCurrency] = useState("USD");

    // Step 2: User
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const handleCompanySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Create Company
            await createDoc("setup", "company", {
                company_name: companyName,
                default_currency: currency,
                country: "United States" // Default for PoC
            });

            // Mark step complete
            await createDoc("core", "onboarding-step", {
                step_name: "Company Setup",
                is_complete: true
            });

            setStep(2);
        } catch (err) {
            console.error(err);
            alert("Failed to setup company");
        } finally {
            setLoading(false);
        }
    };

    const handleUserSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            // In a real app, we would update the current user. 
            // Here we just mark the step as complete.
            await createDoc("core", "onboarding-step", {
                step_name: "User Setup",
                is_complete: true
            });

            setStep(3);
        } catch (err) {
            console.error(err);
            alert("Failed to setup user");
        } finally {
            setLoading(false);
        }
    };

    const handleFinish = async () => {
        navigate("/");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-muted/50">
            <Card className="w-[400px]">
                <CardHeader>
                    <CardTitle>Welcome to Perfex</CardTitle>
                    <CardDescription>Let's get your company set up.</CardDescription>
                </CardHeader>
                <CardContent>
                    {step === 1 && (
                        <form id="step1" onSubmit={handleCompanySubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="company">Company Name</Label>
                                <Input
                                    id="company"
                                    placeholder="Acme Corp"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="currency">Currency</Label>
                                <Input
                                    id="currency"
                                    placeholder="USD"
                                    value={currency}
                                    onChange={(e) => setCurrency(e.target.value)}
                                    required
                                />
                            </div>
                        </form>
                    )}

                    {step === 2 && (
                        <form id="step2" onSubmit={handleUserSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                    id="firstName"
                                    placeholder="John"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                    id="lastName"
                                    placeholder="Doe"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                            </div>
                        </form>
                    )}

                    {step === 3 && (
                        <div className="text-center space-y-4 py-4">
                            <div className="text-4xl">🎉</div>
                            <h3 className="text-lg font-medium">You're all set!</h3>
                            <p className="text-sm text-muted-foreground">
                                Your workspace is ready. Click below to start using ERPNext.
                            </p>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="flex justify-between">
                    {step < 3 ? (
                        <Button type="submit" form={`step${step}`} disabled={loading} className="w-full">
                            {loading ? "Saving..." : "Next"}
                        </Button>
                    ) : (
                        <Button onClick={handleFinish} className="w-full">
                            Go to Dashboard
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}
