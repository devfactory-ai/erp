import { ListView } from "@/components/generic/ListView";

export default function CompanyList() {
    return (
        <ListView
            module="setup"
            doctype="company"
            title="Companies"
            columns={[
                { key: "name", label: "ID" },
                { key: "company_name", label: "Company Name" },
                { key: "default_currency", label: "Currency" },
            ]}
        />
    );
}
