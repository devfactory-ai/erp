import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    ShoppingCart,
    Package,
    Users,
    Settings,
    Briefcase,
    Truck,
    CreditCard
} from "lucide-react";

const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: Users, label: "Selling", href: "/selling" },
    { icon: ShoppingCart, label: "Buying", href: "/buying" },
    { icon: Package, label: "Stock", href: "/stock" },
    { icon: CreditCard, label: "Accounts", href: "/accounts" },
    { icon: Briefcase, label: "Projects", href: "/projects" },
    { icon: Truck, label: "Support", href: "/support" },
    { icon: Settings, label: "Setup", href: "/setup" },
];

export function Sidebar() {
    const location = useLocation();

    return (
        <div className="h-screen w-64 bg-card border-r flex flex-col">
            <div className="p-6 border-b">
                <h1 className="text-2xl font-bold">Perfex</h1>
                <p className="text-xs text-muted-foreground">Cloudflare Native</p>
            </div>
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {sidebarItems.map((item) => {
                    const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + "/");
                    return (
                        <Link
                            key={item.href}
                            to={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            )}
                        >
                            <item.icon className="w-5 h-5" />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>
            <div className="p-4 border-t">
                <div className="flex items-center gap-3 px-4 py-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        U
                    </div>
                    <div>
                        <p className="text-sm font-medium">User</p>
                        <p className="text-xs text-muted-foreground">user@example.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
