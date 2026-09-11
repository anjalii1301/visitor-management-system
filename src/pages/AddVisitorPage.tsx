import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    useAppDispatch,
    useAppSelector,
} from "../app/hooks";

import { addVisitor } from "../app/visitorSlice";

const AddVisitorPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { loading, error } = useAppSelector(
        (state) => state.visitors
    );

    const [form, setForm] = useState({
        name: "",
        phone: "",
        unit: "",
        visitDate: "",
    });

    const [validationError, setValidationError] =
        useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        if (!form.name.trim()) {
            setValidationError("Name is required");
            return;
        }

        if (!/^\d{10}$/.test(form.phone)) {
            setValidationError(
                "Enter a valid 10 digit phone number"
            );
            return;
        }

        if (!form.unit.trim()) {
            setValidationError(
                "Unit number is required"
            );
            return;
        }

        if (!form.visitDate) {
            setValidationError(
                "Visit date is required"
            );
            return;
        }

        setValidationError("");

        try {
            await dispatch(addVisitor(form)).unwrap();

            navigate("/visitors");
        } catch {
            console.error("Error in adding visitor");
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
                <button
                    onClick={() => navigate("/visitors")}
                    className="mb-6 rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                    Back to Visitors List
                </button>

                <div className="mb-6">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-800">
                        Add Visitor
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Add a new visitor request
                    </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

                    {(validationError || error) && (
                        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                            {validationError || error}
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        <div>
                            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                                Visitor Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Enter visitor name"
                                className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        <div>
                            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                                Phone Number
                            </label>

                            <input
                                type="tel"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="Enter 10 digit phone number"
                                className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        <div>
                            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                                Unit Number
                            </label>

                            <input
                                type="text"
                                name="unit"
                                value={form.unit}
                                onChange={handleChange}
                                placeholder="e.g. A-101"
                                className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        <div>
                            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                                Visit Date
                            </label>

                            <input
                                type="date"
                                name="visitDate"
                                value={form.visitDate}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        <div className="flex flex-col-reverse gap-3 pt-3 sm:flex-row sm:justify-end">

                            <button
                                type="button"
                                onClick={() =>
                                    navigate("/visitors")
                                }
                                className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={loading}
                                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
                            >
                                {loading
                                    ? "Adding..."
                                    : "Add Visitor"}
                            </button>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddVisitorPage;