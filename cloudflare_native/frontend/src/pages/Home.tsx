import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <Card className="w-[400px] shadow-lg">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold text-primary">Perfex Native</CardTitle>
                    <CardDescription>Cloudflare Edition</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <h1 className="text-4xl font-bold tracking-tight">Welcome to Perfex</h1>
                    <p className="text-muted-foreground text-lg">
                        The world's best open source ERP, now running natively on Cloudflare. Perfex, built natively for the Cloudflare edge.
                    </p>
                    <div className="flex flex-col gap-2">
                        <Button asChild className="w-full">
                            <Link to="/dashboard">Go to Dashboard</Link>
                        </Button>
                        <Button variant="outline" asChild className="w-full">
                            <Link to="/onboarding">Start Onboarding</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
