import { FormView } from "@/components/generic/FormView";

export default function WorkOrderForm() {
    return (
        <FormView
            module="manufacturing"
            doctype="work-order"
            title="Work Order"
            fields={[
                { name: "production_item", label: "Production Item", type: "text", required: true },
                { name: "qty", label: "Quantity", type: "number", required: true },
            ]}
        />
    );
}
