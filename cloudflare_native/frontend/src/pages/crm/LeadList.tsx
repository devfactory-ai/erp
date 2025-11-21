import { ListView } from "@/components/generic/ListView";

export default function LeadList() {
    return (
        <ListView
            module="crm"
            doctype="lead"
            title="Leads"
            columns={[
                { key: "name", label: "ID" },
                { key: "lead_name", label: "Lead Name" },
                { key: "email_id", label: "Email" },
                { key: "mobile_no", label: "Mobile" },
                { key: "status", label: "Status" },
            ]}
        />
    );
}
