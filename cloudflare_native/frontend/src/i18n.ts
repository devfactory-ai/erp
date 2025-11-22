import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            "common": {
                "dashboard": "Dashboard",
                "selling": "Selling",
                "buying": "Buying",
                "stock": "Stock",
                "accounts": "Accounts",
                "projects": "Projects",
                "support": "Support",
                "setup": "Setup",
                "crm": "CRM",
                "manufacturing": "Manufacturing",
                "assets": "Assets",
                "quality_management": "Quality Management",
                "maintenance": "Maintenance",
                "subcontracting": "Subcontracting",
                "select_doctype": "Select a DocType",
                "logout": "Logout",
                "search": "Search...",
                "notifications": "Notifications",
                "profile": "Profile",
                "settings": "Settings"
            },
            "modules": {
                "customer": "Customer",
                "quotation": "Quotation",
                "sales_order": "Sales Order",
                "supplier": "Supplier",
                "purchase_order": "Purchase Order",
                "purchase_receipt": "Purchase Receipt",
                "item": "Item",
                "delivery_note": "Delivery Note",
                "stock_entry": "Stock Entry",
                "material_request": "Material Request",
                "sales_invoice": "Sales Invoice",
                "purchase_invoice": "Purchase Invoice",
                "journal_entry": "Journal Entry",
                "payment_entry": "Payment Entry",
                "lead": "Lead",
                "project": "Project",
                "work_order": "Work Order",
                "job_card": "Job Card",
                "asset": "Asset",
                "asset_category": "Asset Category",
                "asset_movement": "Asset Movement",
                "maintenance_schedule": "Maintenance Schedule",
                "issue": "Issue",
                "quality_goal": "Quality Goal",
                "quality_inspection": "Quality Inspection",
                "subcontracting_order": "Subcontracting Order",
                "subcontracting_receipt": "Subcontracting Receipt",
                "company": "Company"
            }
        }
    },
    fr: {
        translation: {
            "common": {
                "dashboard": "Tableau de bord",
                "selling": "Vente",
                "buying": "Achat",
                "stock": "Stock",
                "accounts": "Comptabilité",
                "projects": "Projets",
                "support": "Support",
                "setup": "Configuration",
                "crm": "CRM",
                "manufacturing": "Fabrication",
                "assets": "Immobilisations",
                "quality_management": "Qualité",
                "maintenance": "Maintenance",
                "subcontracting": "Sous-traitance",
                "select_doctype": "Sélectionnez un document",
                "logout": "Déconnexion",
                "search": "Rechercher...",
                "notifications": "Notifications",
                "profile": "Profil",
                "settings": "Paramètres"
            },
            "modules": {
                "customer": "Client",
                "quotation": "Devis",
                "sales_order": "Commande Client",
                "supplier": "Fournisseur",
                "purchase_order": "Commande Fournisseur",
                "purchase_receipt": "Réception Achat",
                "item": "Article",
                "delivery_note": "Bon de Livraison",
                "stock_entry": "Entrée de Stock",
                "material_request": "Demande Matériel",
                "sales_invoice": "Facture Vente",
                "purchase_invoice": "Facture Achat",
                "journal_entry": "Écriture Journal",
                "payment_entry": "Paiement",
                "lead": "Piste",
                "project": "Projet",
                "work_order": "Ordre de Fabrication",
                "job_card": "Fiche de Travail",
                "asset": "Actif",
                "asset_category": "Catégorie d'Actif",
                "asset_movement": "Mouvement d'Actif",
                "maintenance_schedule": "Planning Maintenance",
                "issue": "Ticket",
                "quality_goal": "Objectif Qualité",
                "quality_inspection": "Inspection Qualité",
                "subcontracting_order": "Ordre Sous-traitance",
                "subcontracting_receipt": "Réception Sous-traitance",
                "company": "Société"
            }
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
