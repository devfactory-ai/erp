import { FormView } from "@/components/generic/FormView";

export default function ItemForm() {
    return (
        <FormView
            module="stock"
            doctype="item"
            title="modules.item"
            fields={[
                { name: "item_code", label: "fields.item_code", type: "text", required: true },
                { name: "item_name", label: "fields.item_name", type: "text" },
                { name: "valuation_rate", label: "fields.valuation_rate", type: "number" },
                { name: "description", label: "fields.description", type: "text" },
            ]}
        />
    );
}
