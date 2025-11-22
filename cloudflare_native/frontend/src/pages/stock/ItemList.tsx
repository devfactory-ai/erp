import { ListView } from "@/components/generic/ListView";

export default function ItemList() {
    return (
        <ListView
            module="stock"
            doctype="item"
            title="modules.item"
            columns={[
                { key: "name", label: "fields.id" },
                { key: "item_code", label: "fields.item_code" },
                { key: "item_name", label: "fields.item_name" },
                { key: "valuation_rate", label: "fields.rate" },
            ]}
        />
    );
}
