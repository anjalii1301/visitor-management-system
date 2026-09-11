import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    useAppDispatch,
    useAppSelector,
} from "../app/hooks";

import {
    fetchVisitors,
    approveVisitor,
    rejectVisitor,
    deleteVisitor,
} from "../app/visitorSlice";

import type { Visitor } from "../features/visitors-types";
import ConfirmDialog from "../component/dialog";

const VisitorListPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [selectedVisitor, setSelectedVisitor] =
        useState<Visitor | null>(null);

    const {
        visitors,
        loading,
        error,
    } = useAppSelector(
        (state) => state.visitors
    );

    useEffect(() => {
        dispatch(fetchVisitors());
    }, [dispatch]);

    const handleApprove = (visitor: Visitor) => {
        dispatch(approveVisitor(visitor));
    };

    const handleReject = (visitor: Visitor) => {
        dispatch(rejectVisitor(visitor));
    };

    const handleDelete = async () => {
        if (!selectedVisitor) return;

        await dispatch(
            deleteVisitor(selectedVisitor.id)
        );

        setSelectedVisitor(null);
    };

    const filteredVisitors = visitors.filter(
        (visitor) => {
            const value = search.toLowerCase();

            return (
                visitor.name
                    .toLowerCase()
                    .includes(value) ||
                visitor.phone.includes(value) ||
                visitor.unit
                    .toLowerCase()
                    .includes(value)
            );
        }
    );

    return (
        <div className="min-h-[calc(100vh-64px)] bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">

            <div className="mx-auto max-w-7xl">

                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-800">
                            Visitors
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Manage and review visitor requests
                        </p>
                    </div>

                    <button
                        onClick={() =>
                            navigate("/visitors/add")
                        }
                        className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        + Add Visitor
                    </button>
                </div>

                <div className="mb-5">
                    <input
                        type="text"
                        placeholder="Search by name, phone or unit..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 shadow-sm outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                </div>

                {error && (
                    <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="flex justify-center rounded-xl bg-white py-16 shadow-sm">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
                    </div>
                ) : (
                    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[850px]">

                                <thead className="border-b border-slate-200 bg-slate-50">
                                    <tr>
                                        <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Name
                                        </th>

                                        <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Phone
                                        </th>

                                        <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Unit
                                        </th>

                                        <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Visit Date
                                        </th>

                                        <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Status
                                        </th>

                                        <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-100">
                                    {filteredVisitors.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={6}
                                                className="px-5 py-12 text-center text-sm text-slate-500"
                                            >
                                                No visitors found
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredVisitors.map(
                                            (visitor) => (
                                                <tr
                                                    key={visitor.id}
                                                    className="transition hover:bg-slate-50"
                                                >
                                                    <td className="px-5 py-4 text-sm font-medium text-slate-800">
                                                        {visitor.name}
                                                    </td>

                                                    <td className="px-5 py-4 text-sm text-slate-600">
                                                        {visitor.phone}
                                                    </td>

                                                    <td className="px-5 py-4 text-sm text-slate-600">
                                                        {visitor.unit}
                                                    </td>

                                                    <td className="px-5 py-4 text-sm text-slate-600">
                                                        {visitor.visitDate}
                                                    </td>

                                                    <td className="px-5 py-4">
                                                        <span
                                                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                                                visitor.status ===
                                                                "Approved"
                                                                    ? "bg-emerald-50 text-emerald-700"
                                                                    : visitor.status ===
                                                                      "Rejected"
                                                                    ? "bg-red-50 text-red-700"
                                                                    : "bg-amber-50 text-amber-700"
                                                            }`}
                                                        >
                                                            {visitor.status}
                                                        </span>
                                                    </td>

                                                    <td className="px-5 py-4">
                                                        <div className="flex gap-2">
                                                            {visitor.status !==
                                                                "Approved" && (
                                                                <button
                                                                    onClick={() =>
                                                                        handleApprove(
                                                                            visitor
                                                                        )
                                                                    }
                                                                    className="rounded-md bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100"
                                                                >
                                                                    Approve
                                                                </button>
                                                            )}

                                                            {visitor.status !==
                                                                "Rejected" && (
                                                                <button
                                                                    onClick={() =>
                                                                        handleReject(
                                                                            visitor
                                                                        )
                                                                    }
                                                                    className="rounded-md bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 transition hover:bg-amber-100"
                                                                >
                                                                    Reject
                                                                </button>
                                                            )}

                                                            <button
                                                                onClick={() =>
                                                                    setSelectedVisitor(
                                                                        visitor
                                                                    )
                                                                }
                                                                className="rounded-md bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-100"
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                <ConfirmDialog
                    open={Boolean(selectedVisitor)}
                    onClose={() =>
                        setSelectedVisitor(null)
                    }
                    onConfirm={handleDelete}
                />
            </div>
        </div>
    );
};

export default VisitorListPage;