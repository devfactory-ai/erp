import { ListView } from "@/components/generic/ListView";

export default function AssetMovementList() {
    return (
        <ListView
            module="assets"
            doctype="asset-movement"
            title="Asset Movements"
            columns={[
                { key: "name", label: "ID" },
                { key: "asset", label: "Asset" },
                { key: "target_location", label: "Target Location" },
                { key: "transaction_date", label: "Date" },
            ]}
        />
    );
}
