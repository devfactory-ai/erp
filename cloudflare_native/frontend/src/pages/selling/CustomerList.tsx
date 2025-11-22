import { ListView } from "@/components/generic/ListView";

export default function CustomerList() {
    return (
        <ListView
            module="selling"
            doctype="customer"
            title="modules.customer"
            columns={[
                { key: "name", label: "fields.id" },
                { key: "customer_name", label: "fields.name" },
                { key: "customer_type", label: "fields.type" },
                { key: "email_id", label: "fields.email" },
            ]}
        />
    );
}
