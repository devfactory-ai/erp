import { FormView } from "@/components/generic/FormView";

export default function AssetMovementForm() {
    return (
        <FormView
            module="assets"
            doctype="asset-movement"
            title="Asset Movement"
            fields={[
                { name: "asset", label: "Asset", type: "text", required: true },
                { name: "target_location", label: "Target Location", type: "text", required: true },
                { name: "transaction_date", label: "Transaction Date", type: "date", required: true },
            ]}
        />
    );
}
