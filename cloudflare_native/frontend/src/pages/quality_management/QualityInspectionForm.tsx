import { FormView } from "@/components/generic/FormView";

export default function QualityInspectionForm() {
    return (
        <FormView
            module="quality-management"
            doctype="quality-inspection"
            title="Quality Inspection"
            fields={[
                { name: "reference_type", label: "Reference Type", type: "text", required: true },
                { name: "reference_name", label: "Reference Name", type: "text", required: true },
            ]}
        />
    );
}
