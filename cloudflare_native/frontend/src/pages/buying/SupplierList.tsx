import { ListView } from "@/components/generic/ListView";

export default function SupplierList() {
    return (
        <ListView
            module="buying"
            doctype="supplier"
            title="Suppliers"
            columns={[
                { key: "name", label: "ID" },
                { key: "supplier_name", label: "Supplier Name" },
                { key: "supplier_type", label: "Type" },
                { key: "email_id", label: "Email" },
            ]}
        />
    );
}
