import { FormView } from "@/components/generic/FormView";

export default function MaterialRequestForm() {
    return (
        <FormView
            module="stock"
            doctype="material-request"
            title="Material Request"
            fields={[
                { name: "transaction_date", label: "Date", type: "date", required: true },
                { name: "material_request_type", label: "Type", type: "text", required: true },
                { name: "schedule_date", label: "Schedule Date", type: "date" },
            ]}
        />
    );
}
