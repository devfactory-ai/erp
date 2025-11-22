import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext";
import {
    LayoutDashboard,
    ShoppingCart,
    Package,
    Users,
    Settings,
    Briefcase,
    Truck,
    CreditCard,
    ChevronDown,
    ChevronRight,
    Globe,
    Factory,
    Building2,
    Wrench,
    ClipboardCheck,
    ArrowRightLeft,
    LogOut
} from "lucide-react";

type SidebarItem = {
    icon: any;
    label: string;
    href: string;
    roles?: string[]; // Allowed roles
    children?: { label: string; href: string; roles?: string[] }[];
};

export function Sidebar() {
    const location = useLocation();
    const { t, i18n } = useTranslation();
    const { user, logout } = useAuth();
    const [openMenus, setOpenMenus] = useState<string[]>([]);

    const toggleMenu = (label: string) => {
        setOpenMenus((prev) =>
            prev.includes(label)
                ? prev.filter((item) => item !== label)
                : [...prev, label]
        );
    };

    const changeLanguage = () => {
        const newLang = i18n.language === 'en' ? 'fr' : 'en';
        i18n.changeLanguage(newLang);
    };

    // Define roles
    const SUPER_ADMIN = 'Super Admin';
    const ADMIN = 'Administrator';
    const SALES_USER = 'Sales User';
    const PURCHASE_USER = 'Purchase User';
    const STOCK_USER = 'Stock User';

    const sidebarItems: SidebarItem[] = [
        { icon: LayoutDashboard, label: "common.dashboard", href: "/app/dashboard" },
        {
            icon: Users,
            label: "common.selling",
            href: "/app/selling",
            roles: [SUPER_ADMIN, ADMIN, SALES_USER],
            children: [
                { label: "modules.customer", href: "/app/selling/customer" },
                { label: "modules.quotation", href: "/app/selling/quotation" },
                { label: "modules.sales_order", href: "/app/selling/sales_order" },
            ]
        },
        {
            icon: ShoppingCart,
            label: "common.buying",
            href: "/app/buying",
            roles: [SUPER_ADMIN, ADMIN, PURCHASE_USER],
            children: [
                { label: "modules.supplier", href: "/app/buying/supplier" },
                { label: "modules.purchase_order", href: "/app/buying/purchase-order" },
                { label: "modules.purchase_receipt", href: "/app/buying/purchase-receipt" },
            ]
        },
        {
            icon: Package,
            label: "common.stock",
            href: "/app/stock",
            roles: [SUPER_ADMIN, ADMIN, STOCK_USER],
            children: [
                { label: "modules.item", href: "/app/stock/item" },
                { label: "modules.delivery_note", href: "/app/stock/delivery-note" },
                { label: "modules.stock_entry", href: "/app/stock/stock-entry" },
                { label: "modules.material_request", href: "/app/stock/material-request" },
            ]
        },
        {
            icon: CreditCard,
            label: "common.accounts",
            href: "/app/accounts",
            roles: [SUPER_ADMIN, ADMIN],
            children: [
                { label: "modules.sales_invoice", href: "/app/accounts/sales-invoice" },
                { label: "modules.purchase_invoice", href: "/app/accounts/purchase-invoice" },
                { label: "modules.journal_entry", href: "/app/accounts/journal-entry" },
                { label: "modules.payment_entry", href: "/app/accounts/payment-entry" },
            ]
        },
        {
            icon: Briefcase,
            label: "common.projects",
            href: "/app/projects",
            roles: [SUPER_ADMIN, ADMIN],
            children: [
                { label: "modules.project", href: "/app/projects/project" },
            ]
        },
        {
            icon: Truck,
            label: "common.crm",
            href: "/app/crm",
            roles: [SUPER_ADMIN, ADMIN, SALES_USER],
            children: [
                { label: "modules.lead", href: "/app/crm/lead" },
            ]
        },
        {
            icon: Factory,
            label: "common.manufacturing",
            href: "/app/manufacturing",
            roles: [SUPER_ADMIN, ADMIN],
            children: [
                { label: "modules.work_order", href: "/app/manufacturing/work-order" },
                { label: "modules.job_card", href: "/app/manufacturing/job-card" },
            ]
        },
        {
            icon: Building2,
            label: "common.assets",
            href: "/app/assets",
            roles: [SUPER_ADMIN, ADMIN],
            children: [
                { label: "modules.asset", href: "/app/assets/asset" },
                { label: "modules.asset_category", href: "/app/assets/asset-category" },
                { label: "modules.asset_movement", href: "/app/assets/asset-movement" },
            ]
        },
        {
            icon: Wrench,
            label: "common.maintenance",
            href: "/app/maintenance",
            roles: [SUPER_ADMIN, ADMIN],
            children: [
                { label: "modules.maintenance_schedule", href: "/app/maintenance/maintenance-schedule" },
            ]
        },
        {
            icon: ClipboardCheck,
            label: "common.quality_management",
            href: "/app/quality-management",
            roles: [SUPER_ADMIN, ADMIN],
            children: [
                { label: "modules.quality_goal", href: "/app/quality-management/quality-goal" },
                { label: "modules.quality_inspection", href: "/app/quality-management/quality-inspection" },
            ]
        },
        {
            icon: ArrowRightLeft,
            label: "common.subcontracting",
            href: "/app/subcontracting",
            roles: [SUPER_ADMIN, ADMIN],
            children: [
                { label: "modules.subcontracting_order", href: "/app/subcontracting/subcontracting-order" },
                { label: "modules.subcontracting_receipt", href: "/app/subcontracting/subcontracting-receipt" },
            ]
        },
        {
            icon: Truck,
            label: "common.support",
            href: "/app/support",
            roles: [SUPER_ADMIN, ADMIN],
            children: [
                { label: "modules.issue", href: "/app/support/issue" },
            ]
        },
        {
            icon: Settings,
            label: "common.setup",
            href: "/app/setup",
            roles: [SUPER_ADMIN, ADMIN],
            children: [
                { label: "modules.company", href: "/app/setup/company" },
                { label: "modules.users", href: "/app/setup/users" }, // Added User Management
            ]
        },
    ];

    const filteredItems = sidebarItems.filter(item => {
        if (!item.roles) return true;
        return user && item.roles.includes(user.role);
    });

    return (
        <div className="h-screen w-64 bg-card border-r flex flex-col">
            <div className="p-6 border-b">
                <h1 className="text-2xl font-bold text-primary">Perfex</h1>
                <p className="text-xs text-muted-foreground">Cloudflare Native</p>
            </div>
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {filteredItems.map((item) => {
                    const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + "/");
                    const isOpen = openMenus.includes(item.label) || isActive;
                    const hasChildren = item.children && item.children.length > 0;

                    return (
                        <div key={item.label}>
                            {hasChildren ? (
                                <button
                                    onClick={() => toggleMenu(item.label)}
                                    className={cn(
                                        "w-full flex items-center justify-between gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                                        isActive
                                            ? "text-primary bg-primary/5"
                                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <item.icon className="w-4 h-4" />
                                        {t(item.label)}
                                    </div>
                                    {isOpen ? (
                                        <ChevronDown className="w-4 h-4" />
                                    ) : (
                                        <ChevronRight className="w-4 h-4" />
                                    )}
                                </button>
                            ) : (
                                <Link
                                    to={item.href}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                                        isActive
                                            ? "bg-primary text-primary-foreground"
                                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                    )}
                                >
                                    <item.icon className="w-4 h-4" />
                                    {t(item.label)}
                                </Link>
                            )}

                            {hasChildren && isOpen && (
                                <div className="ml-9 mt-1 space-y-1 border-l pl-2">
                                    {item.children!.map((child) => {
                                        const isChildActive = location.pathname === child.href;
                                        return (
                                            <Link
                                                key={child.href}
                                                to={child.href}
                                                className={cn(
                                                    "block px-4 py-2 rounded-lg text-sm transition-colors",
                                                    isChildActive
                                                        ? "text-primary font-medium bg-primary/5"
                                                        : "text-muted-foreground hover:text-foreground"
                                                )}
                                            >
                                                {t(child.label)}
                                            </Link>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </nav>
            <div className="p-4 border-t space-y-4">
                <button
                    onClick={changeLanguage}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground w-full px-4 py-2 rounded-lg hover:bg-accent"
                >
                    <Globe className="w-4 h-4" />
                    {i18n.language === 'en' ? 'English' : 'Français'}
                </button>

                <div className="flex items-center gap-3 px-4 py-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {user?.full_name?.charAt(0) || 'U'}
                    </div>
                    <div className="overflow-hidden flex-1">
                        <p className="text-sm font-medium truncate">{user?.full_name || 'User'}</p>
                        <p className="text-xs text-muted-foreground truncate">{user?.email || 'user@example.com'}</p>
                    </div>
                    <button onClick={logout} className="text-muted-foreground hover:text-destructive transition-colors" title="Logout">
                        <LogOut className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
