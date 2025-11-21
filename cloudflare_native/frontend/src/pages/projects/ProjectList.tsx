import { ListView } from "@/components/generic/ListView";

export default function ProjectList() {
    return (
        <ListView
            module="projects"
            doctype="project"
            title="Projects"
            columns={[
                { key: "name", label: "ID" },
                { key: "project_name", label: "Project Name" },
                { key: "status", label: "Status" },
                { key: "expected_end_date", label: "End Date" },
            ]}
        />
    );
}
