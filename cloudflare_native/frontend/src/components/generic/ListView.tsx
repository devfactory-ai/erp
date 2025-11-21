import { useEffect, useState } from "react";
import { getList } from "@/lib/api";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

interface ListViewProps {
    module: string;
    doctype: string;
    title: string;
    columns: { key: string; label: string }[];
}

export function ListView({ module, doctype, title, columns }: ListViewProps) {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getList(module, doctype)
            .then((res) => setData(res))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, [module, doctype]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
                <Button asChild>
                    <Link to="new">
                        <Plus className="mr-2 h-4 w-4" /> New {title}
                    </Link>
                </Button>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {columns.map((col) => (
                                <TableHead key={col.key}>{col.label}</TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="text-center">
                                    No records found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((row, i) => (
                                <TableRow key={row.name || i}>
                                    {columns.map((col) => (
                                        <TableCell key={col.key}>{row[col.key]}</TableCell>
                                    ))}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
