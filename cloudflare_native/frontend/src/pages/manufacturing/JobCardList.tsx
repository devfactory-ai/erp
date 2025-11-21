import { ListView } from "@/components/generic/ListView";

export default function JobCardList() {
    return (
        <ListView
            module="manufacturing"
            doctype="job-card"
            title="Job Cards"
            columns={[
                { key: "name", label: "ID" },
                { key: "work_order", label: "Work Order" },
                { key: "operation", label: "Operation" },
                { key: "status", label: "Status" },
            ]}
        />
    );
}
