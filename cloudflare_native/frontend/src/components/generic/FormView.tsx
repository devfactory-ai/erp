import { useState } from "react";
import { useTranslation } from "react-i18next";
import { createDoc } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

interface Field {
    name: string;
    label: string;
    type: "text" | "number" | "date" | "email";
    required?: boolean;
}

interface FormViewProps {
    module: string;
    doctype: string;
    title: string;
    fields: Field[];
}

export function FormView({ module, doctype, title, fields }: FormViewProps) {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [formData, setFormData] = useState<any>({});
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createDoc(module, doctype, formData);
            navigate("..");
        } catch (err) {
            console.error(err);
            alert(t('common.failed_to_save'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">{t('common.new')} {t(title)}</h2>
                <p className="text-muted-foreground">{t('common.new')} {t(title)}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {fields.map((field) => (
                    <div key={field.name} className="grid gap-2">
                        <Label htmlFor={field.name}>{t(field.label)}</Label>
                        <Input
                            id={field.name}
                            type={field.type}
                            required={field.required}
                            value={formData[field.name] || ""}
                            onChange={(e) =>
                                setFormData({ ...formData, [field.name]: e.target.value })
                            }
                        />
                    </div>
                ))}

                <div className="flex gap-4 pt-4">
                    <Button type="submit" disabled={loading}>
                        {loading ? t('common.saving') : t('common.save')}
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => navigate("..")}
                        disabled={loading}
                    >
                        {t('common.cancel')}
                    </Button>
                </div>
            </form>
        </div>
    );
}
