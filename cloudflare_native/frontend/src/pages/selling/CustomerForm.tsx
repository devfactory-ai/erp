import { FormView } from "@/components/generic/FormView";

export default function CustomerForm() {
    return (
        <FormView
            module="selling"
            doctype="customer"
            title="Customer"
            fields={[
                { name: "customer_name", label: "Customer Name", type: "text", required: true },
                { name: "customer_type", label: "Customer Type", type: "text" },
                { name: "email_id", label: "Email", type: "email" },
                { name: "mobile_no", label: "Mobile No", type: "text" },
            ]}
        />
    );
}
