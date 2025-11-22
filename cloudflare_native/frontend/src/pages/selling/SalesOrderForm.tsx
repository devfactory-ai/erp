import { FormView } from "@/components/generic/FormView";

export default function SalesOrderForm() {
    return (
        <FormView
            module="selling"
            doctype="sales-order"
            title="modules.sales_order"
            fields={[
                { name: "customer", label: "fields.customer", type: "text", required: true },
                { name: "transaction_date", label: "fields.date", type: "date", required: true },
                { name: "delivery_date", label: "fields.delivery_date", type: "date" },
                { name: "grand_total", label: "fields.grand_total", type: "number" },
            ]}
        />
    );
}
