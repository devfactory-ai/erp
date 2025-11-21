import { FormView } from "@/components/generic/FormView";

export default function SalesOrderForm() {
    return (
        <FormView
            module="selling"
            doctype="sales-order"
            title="Sales Order"
            fields={[
                { name: "customer", label: "Customer", type: "text", required: true },
                { name: "transaction_date", label: "Date", type: "date", required: true },
                { name: "delivery_date", label: "Delivery Date", type: "date" },
                { name: "grand_total", label: "Grand Total", type: "number" },
            ]}
        />
    );
}
