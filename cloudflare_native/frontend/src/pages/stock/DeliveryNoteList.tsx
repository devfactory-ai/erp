import { ListView } from "@/components/generic/ListView";

export default function DeliveryNoteList() {
    return (
        <ListView
            module="stock"
            doctype="delivery-note"
            title="Delivery Notes"
            columns={[
                { key: "name", label: "ID" },
                { key: "customer", label: "Customer" },
                { key: "posting_date", label: "Date" },
                { key: "grand_total", label: "Total" },
                { key: "status", label: "Status" },
            ]}
        />
    );
}
