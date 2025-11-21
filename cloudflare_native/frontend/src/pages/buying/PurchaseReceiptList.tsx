import { ListView } from "@/components/generic/ListView";

export default function PurchaseReceiptList() {
    return (
        <ListView
            module="buying"
            doctype="purchase-receipt"
            title="Purchase Receipts"
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
