import { FormView } from "@/components/generic/FormView";

export default function StockEntryForm() {
    return (
        <FormView
            module="stock"
            doctype="stock-entry"
            title="Stock Entry"
            fields={[
                { name: "stock_entry_type", label: "Type", type: "text", required: true },
                { name: "posting_date", label: "Date", type: "date", required: true },
            ]}
        />
    );
}
