import { FormView } from "@/components/generic/FormView";

export default function ProjectForm() {
    return (
        <FormView
            module="projects"
            doctype="project"
            title="Project"
            fields={[
                { name: "project_name", label: "Project Name", type: "text", required: true },
                { name: "project_type", label: "Type", type: "text" },
                { name: "expected_start_date", label: "Start Date", type: "date" },
                { name: "expected_end_date", label: "End Date", type: "date" },
            ]}
        />
    );
}
