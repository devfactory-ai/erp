import { FormView } from "@/components/generic/FormView";

export default function AssetCategoryForm() {
    return (
        <FormView
            module="assets"
            doctype="asset-category"
            title="Asset Category"
            fields={[
                { name: "category_name", label: "Category Name", type: "text", required: true },
                { name: "depreciation_method", label: "Depreciation Method", type: "text" },
            ]}
        />
    );
}
