import { FormView } from "@/components/generic/FormView";

export default function CustomerForm() {
    return (
        <FormView
            module="selling"
            doctype="customer"
            title="modules.customer"
            fields={[
                { name: "customer_name", label: "fields.name", type: "text", required: true },
                { name: "customer_type", label: "fields.type", type: "text" },
                { name: "email_id", label: "fields.email", type: "email" },
                { name: "mobile_no", label: "fields.mobile", type: "text" },
            ]}
        />
    );
}
