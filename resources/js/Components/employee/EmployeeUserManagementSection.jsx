import { Switch } from "@/Components/ui/switch";
import { router } from "@inertiajs/react";
import { useState } from "react";
import { Button } from "../ui/button";

export default function EmployeeUserManagementSection({auth, user, employee, permissions }) {
    // Local state to manage form inputs
    const [formData, setFormData] = useState({
        systemAccess: user ? true : false,
        password: "",
        permissions: permissions ?? [],
    });

    // Handler to toggle system access
    const onSystemAccessChange = (checked) => {
        setFormData((prevState) => ({
            ...prevState,
            systemAccess: checked,
        }));
    };

    // Handler for updating password
    const onPasswordChange = (e) => {
        const { value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            password: value,
        }));
    };

    // Handler to toggle permissions
    const onPermissionChange = (permission) => {
        setFormData((prevState) => {
            const permissions = [...prevState.permissions];
            const permissionIndex = permissions.indexOf(permission);

            // Add permission if it doesn't exist, remove it if it does
            if (permissionIndex === -1) {
                permissions.push(permission);
            } else {
                permissions.splice(permissionIndex, 1);
            }

            return {
                ...prevState,
                permissions,
            };
        });
    };

    const handleSave = () => {
        const dataToSave = {
            systemAccess: formData.systemAccess,
            password: formData.password,
            permissions: formData.permissions,
        };

        if (!formData.systemAccess) {
            delete dataToSave.username;
            delete dataToSave.password;
            delete dataToSave.permissions;
        }

        router.put(`/employees/user-management/${employee.id}`, dataToSave);
    };

    return (
        <div className="space-y-4">
            <div className="flex gap-60">
                <div className="flex items-center space-x-3">
                    <label htmlFor="systemAccess" className="text-sm font-medium">
                        Give this employee system access.
                    </label>
                    <Switch
                        id="systemAccess"
                        checked={formData.systemAccess}
                        onCheckedChange={onSystemAccessChange}
                        className="bg-gray-200 rounded-full w-10 h-6 p-0.5"
                    />
                </div>
                <div>
                    <Button
                        onClick={handleSave}
                    >
                        Save Changes
                    </Button>
                </div>
            </div>

            {/* If system access is enabled, show fields for username and password */}
            {formData.systemAccess && (
                <>
                    <div className="flex flex-col space-y-2">
                        <div>Email: {user ? user.email : employee.email_address}</div>
                        <div>
                            <label
                                htmlFor="password"
                                className="text-sm font-medium block"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={formData.password}
                                onChange={onPasswordChange}
                                className="border rounded px-2 py-1 w-full max-w-sm"
                                placeholder="Enter a password"
                                required
                            />
                        </div>
                    </div>

                    <h3 className="text-xl font-semibold mt-4">
                        Employee Permissions
                    </h3>

                    <div className="flex items-center space-x-3">
                        <label
                            htmlFor="contractAccess"
                            className="text-sm font-medium"
                        >
                            Contract Management Access
                        </label>
                        <Switch
                            id="contractAccess"
                            checked={formData.permissions.includes("contract_management")}
                            onCheckedChange={() =>
                                onPermissionChange("contract_management")
                            }
                            className="bg-gray-200 rounded-full w-10 h-6 p-0.5"
                        />
                    </div>

                    <div className="flex items-center space-x-3">
                        <label
                            htmlFor="itemManagementAccess"
                            className="text-sm font-medium"
                        >
                            Item Management Access
                        </label>
                        <Switch
                            id="itemManagementAccess"
                            checked={formData.permissions.includes("item_management")}
                            onCheckedChange={() =>
                                onPermissionChange("item_management")
                            }
                            className="bg-gray-200 rounded-full w-10 h-6 p-0.5"
                        />
                    </div>

                    <div className="flex items-center space-x-3">
                        <label
                            htmlFor="jobOrderAccess"
                            className="text-sm font-medium"
                        >
                            Job Order Access
                        </label>
                        <Switch
                            id="jobOrderAccess"
                            checked={formData.permissions.includes("job_order_management")}
                            onCheckedChange={() =>
                                onPermissionChange("job_order_management")
                            }
                            className="bg-gray-200 rounded-full w-10 h-6 p-0.5"
                        />
                    </div>

                    <div className="flex items-center space-x-3">
                        <label
                            htmlFor="employeeManagementAccess"
                            className="text-sm font-medium"
                        >
                            Employee Management Access
                        </label>
                        <Switch
                            id="employeeManagementAccess"
                            checked={formData.permissions.includes("employee_management")}
                            onCheckedChange={() =>
                                onPermissionChange("employee_management")
                            }
                            className="bg-gray-200 rounded-full w-10 h-6 p-0.5"
                        />
                    </div>

                    <div className="flex items-center space-x-3">
                        <label
                            htmlFor="progressReportAccess"
                            className="text-sm font-medium"
                        >
                            Progress Report Access
                        </label>
                        <Switch
                            id="progressReportAccess"
                            checked={formData.permissions.includes("progress_report_management")}
                            onCheckedChange={() =>
                                onPermissionChange("progress_report_management")
                            }
                            className="bg-gray-200 rounded-full w-10 h-6 p-0.5"
                        />
                    </div>

                    {/* Save Button */}
                </>
            )}
        </div>
    );
}
