import { FormView } from "@/components/generic/FormView";

export default function ItemForm() {
    return (
        <FormView
            module="stock"
            doctype="item"
            title="Item"
            fields={[
                { name: "item_code", label: "Item Code", type: "text", required: true },
                { name: "item_name", label: "Item Name", type: "text" },
                { name: "valuation_rate", label: "Valuation Rate", type: "number" },
                { name: "description", label: "Description", type: "text" },
            ]}
        />
    );
}
