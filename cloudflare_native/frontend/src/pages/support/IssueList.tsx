import { ListView } from "@/components/generic/ListView";

export default function IssueList() {
    return (
        <ListView
            module="support"
            doctype="issue"
            title="Issues"
            columns={[
                { key: "name", label: "ID" },
                { key: "subject", label: "Subject" },
                { key: "status", label: "Status" },
                { key: "priority", label: "Priority" },
            ]}
        />
    );
}
