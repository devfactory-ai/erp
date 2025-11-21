import { ListView } from "@/components/generic/ListView";

export default function SalesInvoiceList() {
    return (
        <ListView
            module="accounts"
            doctype="sales-invoice"
            title="Sales Invoices"
            columns={[
                { key: "name", label: "ID" },
                { key: "customer", label: "Customer" },
                { key: "posting_date", label: "Date" },
                { key: "grand_total", label: "Total" },
                { key: "status", label: "Status" },
            ]}
        />
    );
}
