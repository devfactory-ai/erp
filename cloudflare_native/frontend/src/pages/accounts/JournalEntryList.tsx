import { ListView } from "@/components/generic/ListView";

export default function JournalEntryList() {
    return (
        <ListView
            module="accounts"
            doctype="journal-entry"
            title="Journal Entries"
            columns={[
                { key: "name", label: "ID" },
                { key: "posting_date", label: "Date" },
                { key: "total_debit", label: "Total Debit" },
                { key: "total_credit", label: "Total Credit" },
            ]}
        />
    );
}
