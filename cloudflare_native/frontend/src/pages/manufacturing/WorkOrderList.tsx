import { ListView } from "@/components/generic/ListView";

export default function WorkOrderList() {
    return (
        <ListView
            module="manufacturing"
            doctype="work-order"
            title="Work Orders"
            columns={[
                { key: "name", label: "ID" },
                { key: "production_item", label: "Item" },
                { key: "qty", label: "Qty" },
                { key: "status", label: "Status" },
            ]}
        />
    );
}
