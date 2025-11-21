import { FormView } from "@/components/generic/FormView";

export default function SupplierForm() {
    return (
        <FormView
            module="buying"
            doctype="supplier"
            title="Supplier"
            fields={[
                { name: "supplier_name", label: "Supplier Name", type: "text", required: true },
                { name: "supplier_type", label: "Supplier Type", type: "text" },
                { name: "email_id", label: "Email", type: "email" },
                { name: "mobile_no", label: "Mobile No", type: "text" },
            ]}
        />
    );
}
