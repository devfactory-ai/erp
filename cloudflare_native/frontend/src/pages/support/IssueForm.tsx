import { FormView } from "@/components/generic/FormView";

export default function IssueForm() {
    return (
        <FormView
            module="support"
            doctype="issue"
            title="Issue"
            fields={[
                { name: "subject", label: "Subject", type: "text", required: true },
                { name: "description", label: "Description", type: "text" },
                { name: "priority", label: "Priority", type: "text" },
            ]}
        />
    );
}
