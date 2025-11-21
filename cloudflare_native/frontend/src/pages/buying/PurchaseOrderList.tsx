import { ListView } from "@/components/generic/ListView";

export default function PurchaseOrderList() {
    return (
        <ListView
            module="buying"
            doctype="purchase-order"
            title="Purchase Orders"
            columns={[
                { key: "name", label: "ID" },
                { key: "supplier", label: "Supplier" },
                { key: "transaction_date", label: "Date" },
                { key: "grand_total", label: "Total" },
                { key: "status", label: "Status" },
            ]}
        />
    );
}
