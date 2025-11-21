import { FormView } from "@/components/generic/FormView";

export default function QuotationForm() {
    return (
        <FormView
            module="selling"
            doctype="quotation"
            title="Quotation"
            fields={[
                { name: "customer", label: "Customer", type: "text", required: true },
                { name: "transaction_date", label: "Date", type: "date", required: true },
                { name: "grand_total", label: "Grand Total", type: "number" },
            ]}
        />
    );
}
