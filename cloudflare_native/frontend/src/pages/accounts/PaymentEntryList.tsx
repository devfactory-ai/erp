import { ListView } from "@/components/generic/ListView";

export default function PaymentEntryList() {
    return (
        <ListView
            module="accounts"
            doctype="payment-entry"
            title="Payment Entries"
            columns={[
                { key: "name", label: "ID" },
                { key: "payment_type", label: "Type" },
                { key: "posting_date", label: "Date" },
                { key: "paid_amount", label: "Amount" },
            ]}
        />
    );
}
