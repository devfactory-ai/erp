import { ListView } from "@/components/generic/ListView";

export default function QuotationList() {
    return (
        <ListView
            module="selling"
            doctype="quotation"
            title="Quotations"
            columns={[
                { key: "name", label: "ID" },
                { key: "customer", label: "Customer" },
                { key: "transaction_date", label: "Date" },
                { key: "grand_total", label: "Total" },
                { key: "status", label: "Status" },
            ]}
        />
    );
}
