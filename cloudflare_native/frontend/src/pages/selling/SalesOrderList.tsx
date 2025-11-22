import { ListView } from "@/components/generic/ListView";

export default function SalesOrderList() {
    return (
        <ListView
            module="selling"
            doctype="sales-order"
            title="modules.sales_order"
            columns={[
                { key: "name", label: "fields.id" },
                { key: "customer", label: "fields.customer" },
                { key: "transaction_date", label: "fields.date" },
                { key: "grand_total", label: "fields.total" },
                { key: "status", label: "fields.status" },
            ]}
        />
    );
}
