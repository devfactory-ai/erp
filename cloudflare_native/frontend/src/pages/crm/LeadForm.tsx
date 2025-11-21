import { FormView } from "@/components/generic/FormView";

export default function LeadForm() {
    return (
        <FormView
            module="crm"
            doctype="lead"
            title="Lead"
            fields={[
                { name: "lead_name", label: "Lead Name", type: "text", required: true },
                { name: "email_id", label: "Email", type: "email" },
                { name: "mobile_no", label: "Mobile No", type: "text" },
                { name: "status", label: "Status", type: "text" },
            ]}
        />
    );
}
