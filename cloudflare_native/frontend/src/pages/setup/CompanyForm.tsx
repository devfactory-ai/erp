import { FormView } from "@/components/generic/FormView";

export default function CompanyForm() {
    return (
        <FormView
            module="setup"
            doctype="company"
            title="Company"
            fields={[
                { name: "company_name", label: "Company Name", type: "text", required: true },
                { name: "default_currency", label: "Default Currency", type: "text" },
                { name: "country", label: "Country", type: "text" },
            ]}
        />
    );
}
