import { FormView } from "@/components/generic/FormView";

export default function JournalEntryForm() {
    return (
        <FormView
            module="accounts"
            doctype="journal-entry"
            title="Journal Entry"
            fields={[
                { name: "posting_date", label: "Date", type: "date", required: true },
                { name: "voucher_type", label: "Type", type: "text" },
                { name: "cheque_no", label: "Cheque No", type: "text" },
                { name: "cheque_date", label: "Cheque Date", type: "date" },
            ]}
        />
    );
}
