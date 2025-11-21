import { ListView } from "@/components/generic/ListView";

export default function MaterialRequestList() {
    return (
        <ListView
            module="stock"
            doctype="material-request"
            title="Material Requests"
            columns={[
                { key: "name", label: "ID" },
                { key: "transaction_date", label: "Date" },
                { key: "status", label: "Status" },
                { key: "material_request_type", label: "Type" },
            ]}
        />
    );
}
