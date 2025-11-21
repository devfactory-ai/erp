import { FormView } from "@/components/generic/FormView";

export default function PurchaseOrderForm() {
    return (
        <FormView
            module="buying"
            doctype="purchase-order"
            title="Purchase Order"
            fields={[
                { name: "supplier", label: "Supplier", type: "text", required: true },
                { name: "transaction_date", label: "Date", type: "date", required: true },
                { name: "schedule_date", label: "Schedule Date", type: "date" },
                { name: "grand_total", label: "Grand Total", type: "number" },
            ]}
        />
    );
}
