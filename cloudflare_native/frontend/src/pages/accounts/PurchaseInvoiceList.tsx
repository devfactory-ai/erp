import { ListView } from "@/components/generic/ListView";

export default function PurchaseInvoiceList() {
    return (
        <ListView
            module="accounts"
            doctype="purchase-invoice"
            title="Purchase Invoices"
            columns={[
                { key: "name", label: "ID" },
                { key: "supplier", label: "Supplier" },
                { key: "posting_date", label: "Date" },
                { key: "grand_total", label: "Total" },
                { key: "status", label: "Status" },
            ]}
        />
    );
}
