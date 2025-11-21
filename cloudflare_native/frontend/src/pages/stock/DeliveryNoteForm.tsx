import { FormView } from "@/components/generic/FormView";

export default function DeliveryNoteForm() {
    return (
        <FormView
            module="stock"
            doctype="delivery-note"
            title="Delivery Note"
            fields={[
                { name: "customer", label: "Customer", type: "text", required: true },
                { name: "posting_date", label: "Date", type: "date", required: true },
                { name: "grand_total", label: "Grand Total", type: "number" },
            ]}
        />
    );
}
