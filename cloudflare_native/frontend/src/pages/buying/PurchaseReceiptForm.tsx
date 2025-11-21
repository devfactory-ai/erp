import { FormView } from "@/components/generic/FormView";

export default function PurchaseReceiptForm() {
    return (
        <FormView
            module="buying"
            doctype="purchase-receipt"
            title="Purchase Receipt"
            fields={[
                { name: "supplier", label: "Supplier", type: "text", required: true },
                { name: "posting_date", label: "Date", type: "date", required: true },
                { name: "grand_total", label: "Grand Total", type: "number" },
            ]}
        />
    );
}
