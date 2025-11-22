import { ListView } from "@/components/generic/ListView";

export default function UserList() {
    const columns = [
        { key: "email", label: "Email" },
        { key: "full_name", label: "Full Name" },
        { key: "role", label: "Role" },
        { key: "enabled", label: "Enabled", render: (value: boolean) => value ? "Yes" : "No" },
    ];

    return (
        <ListView
            module="core"
            doctype="user"
            title="Users"
            columns={columns}
            linkPath="/app/setup/users/new"
        />
    );
}
