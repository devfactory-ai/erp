import { FormView } from "@/components/generic/FormView";

export default function SalesInvoiceForm() {
    return (
        <FormView
            module="accounts"
            doctype="sales-invoice"
            title="Sales Invoice"
            fields={[
                { name: "customer", label: "Customer", type: "text", required: true },
                { name: "posting_date", label: "Date", type: "date", required: true },
                { name: "due_date", label: "Due Date", type: "date" },
                { name: "grand_total", label: "Grand Total", type: "number" },
            ]}
        />
    );
}
