import { FormView } from "@/components/generic/FormView";

export default function PaymentEntryForm() {
    return (
        <FormView
            module="accounts"
            doctype="payment-entry"
            title="Payment Entry"
            fields={[
                { name: "payment_type", label: "Type", type: "text", required: true },
                { name: "posting_date", label: "Date", type: "date", required: true },
                { name: "paid_amount", label: "Paid Amount", type: "number" },
                { name: "received_amount", label: "Received Amount", type: "number" },
            ]}
        />
    );
}
