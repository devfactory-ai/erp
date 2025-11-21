import { ListView } from "@/components/generic/ListView";

export default function SubcontractingReceiptList() {
    return (
        <ListView
            module="subcontracting"
            doctype="subcontracting-receipt"
            title="Subcontracting Receipts"
            columns={[
                { key: "name", label: "ID" },
                { key: "supplier", label: "Supplier" },
                { key: "purchase_order", label: "Purchase Order" },
                { key: "status", label: "Status" },
            ]}
        />
    );
}
