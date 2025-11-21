import { ListView } from "@/components/generic/ListView";

export default function AssetCategoryList() {
    return (
        <ListView
            module="assets"
            doctype="asset-category"
            title="Asset Categories"
            columns={[
                { key: "name", label: "ID" },
                { key: "category_name", label: "Name" },
                { key: "depreciation_method", label: "Depreciation Method" },
            ]}
        />
    );
}
