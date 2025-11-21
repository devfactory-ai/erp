import { FormView } from "@/components/generic/FormView";

export default function PurchaseInvoiceForm() {
    return (
        <FormView
            module="accounts"
            doctype="purchase-invoice"
            title="Purchase Invoice"
            fields={[
                { name: "supplier", label: "Supplier", type: "text", required: true },
                { name: "posting_date", label: "Date", type: "date", required: true },
                { name: "due_date", label: "Due Date", type: "date" },
                { name: "grand_total", label: "Grand Total", type: "number" },
            ]}
        />
    );
}
