import { ListView } from "@/components/generic/ListView";

export default function CustomerList() {
    return (
        <ListView
            module="selling"
            doctype="customer"
            title="Customers"
            columns={[
                { key: "name", label: "ID" },
                { key: "customer_name", label: "Customer Name" },
                { key: "customer_type", label: "Type" },
                { key: "email_id", label: "Email" },
            ]}
        />
    );
}
