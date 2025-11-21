import { ListView } from "@/components/generic/ListView";

export default function StockEntryList() {
    return (
        <ListView
            module="stock"
            doctype="stock-entry"
            title="Stock Entries"
            columns={[
                { key: "name", label: "ID" },
                { key: "stock_entry_type", label: "Type" },
                { key: "posting_date", label: "Date" },
                { key: "total_amount", label: "Total Amount" },
            ]}
        />
    );
}
