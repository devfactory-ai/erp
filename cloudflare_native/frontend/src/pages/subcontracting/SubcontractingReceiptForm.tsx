import { FormView } from "@/components/generic/FormView";

export default function SubcontractingReceiptForm() {
    return (
        <FormView
            module="subcontracting"
            doctype="subcontracting-receipt"
            title="Subcontracting Receipt"
            fields={[
                { name: "supplier", label: "Supplier", type: "text", required: true },
                { name: "purchase_order", label: "Purchase Order", type: "text", required: true },
            ]}
        />
    );
}
