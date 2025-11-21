import { FormView } from "@/components/generic/FormView";

export default function MaintenanceScheduleForm() {
    return (
        <FormView
            module="maintenance"
            doctype="maintenance-schedule"
            title="Maintenance Schedule"
            fields={[
                { name: "item_code", label: "Item Code", type: "text", required: true },
                { name: "schedule_date", label: "Schedule Date", type: "date", required: true },
            ]}
        />
    );
}
