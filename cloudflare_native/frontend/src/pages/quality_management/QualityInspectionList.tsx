import { ListView } from "@/components/generic/ListView";

export default function QualityInspectionList() {
    return (
        <ListView
            module="quality-management"
            doctype="quality-inspection"
            title="Quality Inspections"
            columns={[
                { key: "name", label: "ID" },
                { key: "reference_type", label: "Ref Type" },
                { key: "reference_name", label: "Ref Name" },
                { key: "status", label: "Status" },
            ]}
        />
    );
}
