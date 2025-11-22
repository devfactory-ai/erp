import { FormView } from "@/components/generic/FormView";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export default function UserForm() {
    return (
        <FormView
            module="core"
            doctype="user"
            title="User"
            backPath="/app/setup/users"
        >
            {(data, handleChange) => (
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                value={data.email || ""}
                                onChange={(e) => handleChange("email", e.target.value)}
                                required
                                disabled={!!data.creation} // Disable email edit for existing users
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="full_name">Full Name</Label>
                            <Input
                                id="full_name"
                                value={data.full_name || ""}
                                onChange={(e) => handleChange("full_name", e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="role">Role</Label>
                            <Select
                                value={data.role || "User"}
                                onChange={(e) => handleChange("role", e.target.value)}
                            >
                                <SelectValue placeholder="Select role" />
                                <SelectContent>
                                    <SelectItem value="Super Admin">Super Admin</SelectItem>
                                    <SelectItem value="Administrator">Administrator</SelectItem>
                                    <SelectItem value="Sales User">Sales User</SelectItem>
                                    <SelectItem value="Purchase User">Purchase User</SelectItem>
                                    <SelectItem value="Stock User">Stock User</SelectItem>
                                    <SelectItem value="User">User</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password {data.creation && "(Leave blank to keep unchanged)"}</Label>
                            <Input
                                id="password"
                                type="password"
                                value={data.password || ""}
                                onChange={(e) => handleChange("password", e.target.value)}
                                required={!data.creation}
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="enabled"
                            checked={data.enabled !== false}
                            onCheckedChange={(checked) => handleChange("enabled", checked)}
                        />
                        <Label htmlFor="enabled">Enabled</Label>
                    </div>
                </div>
            )}
        </FormView>
    );
}
