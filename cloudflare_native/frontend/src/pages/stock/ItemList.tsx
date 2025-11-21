import { ListView } from "@/components/generic/ListView";

export default function ItemList() {
    return (
        <ListView
            module="stock"
            doctype="item"
            title="Items"
            columns={[
                { key: "name", label: "ID" },
                { key: "item_code", label: "Item Code" },
                { key: "item_name", label: "Item Name" },
                { key: "valuation_rate", label: "Rate" },
            ]}
        />
    );
}
