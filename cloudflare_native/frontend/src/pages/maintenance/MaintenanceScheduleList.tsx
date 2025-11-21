import { ListView } from "@/components/generic/ListView";

export default function MaintenanceScheduleList() {
    return (
        <ListView
            module="maintenance"
            doctype="maintenance-schedule"
            title="Maintenance Schedules"
            columns={[
                { key: "name", label: "ID" },
                { key: "item_code", label: "Item" },
                { key: "schedule_date", label: "Date" },
                { key: "status", label: "Status" },
            ]}
        />
    );
}
