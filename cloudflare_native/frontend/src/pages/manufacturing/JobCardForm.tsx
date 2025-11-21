import { FormView } from "@/components/generic/FormView";

export default function JobCardForm() {
    return (
        <FormView
            module="manufacturing"
            doctype="job-card"
            title="Job Card"
            fields={[
                { name: "work_order", label: "Work Order", type: "text", required: true },
                { name: "operation", label: "Operation", type: "text", required: true },
            ]}
        />
    );
}
