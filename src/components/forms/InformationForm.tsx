"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Button from "@/components/buttons/Button";
import toast from "react-hot-toast";
import { Content } from "@/types";
import { formatTimestamp } from "@/utils/timeformater";

const InformationForm: React.FC = () => {
    const [form, setForm] = useState({ title: "", description: "" });
    const [timestamps, setTimestamps] = useState({
        titleUpdatedAt: "",
        descriptionUpdatedAt: "",
    });
    const [initial, setInitial] = useState({ title: "", description: "" });
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchContent = async () => {
            const { data } = await supabase
                .from("content")
                .select("*")
                .eq("id", 1)
                .single();
            if (data) {
                const { title, description, titleUpdatedAt, descriptionUpdatedAt } =
                    data as Content;
                setForm({ title, description });
                setInitial({ title, description });
                setTimestamps({ titleUpdatedAt, descriptionUpdatedAt });
            }
        };
        fetchContent();
    }, []);

    const handleSave = async () => {
        try {
            setLoading(true)
            const now = new Date().toISOString()
            const updates: Partial<Content> = {}
            let savedFields: string[] = []

            if (form.title !== initial.title) {
                updates.title = form.title.trim();
                updates.titleUpdatedAt = now
                savedFields.push('Title')
            }

            if (form.description !== initial.description) {
                updates.description = form.description.trim();
                updates.descriptionUpdatedAt = now
                savedFields.push('Description')
            }

            if (savedFields.length === 0) return

            const { error } = await supabase.from('content').update(updates).eq('id', 1)

            if (!error) {
                setInitial({ ...form })
                if (updates.titleUpdatedAt) setTimestamps((prev) => ({ ...prev, titleUpdatedAt: now }))
                if (updates.descriptionUpdatedAt) setTimestamps((prev) => ({ ...prev, descriptionUpdatedAt: now }))

                // Show toast message dynamically
                toast.success(`${savedFields.join(' & ')} updated successfully!`)
            } else {
                toast.error('Something went wrong!')
            }
        } catch (error) {
            toast.error('Error saving data!')
        } finally {
            setLoading(false)
        }
    }
    const isDisabled =
        form.title === initial.title && form.description === initial.description;

    return (
        <div className="w-full max-w-2xl bg-[#1e3261] p-8 rounded-2xl shadow-2xl space-y-6 text-white">
            <h2 className="text-3xl font-semibold text-white">Admin Panel</h2>

            <div>
                <label className="block font-medium text-white">Title</label>
                <input
                    type="text"
                    value={form.title}
                    onChange={(e) =>
                        setForm((prev) => ({ ...prev, title: e.target.value }))
                    }
                    className="w-full bg-[#1e3261] border border-white/30 text-white p-3 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-white placeholder:text-slate-400"
                    placeholder="Enter title"
                />
                <p className="text-xs text-slate-300 mt-1">
                    {" "}
                    Last updated: {formatTimestamp(timestamps.titleUpdatedAt)}
                </p>
            </div>

            <div>
                <label className="block font-medium text-white">Description</label>
                <textarea
                    rows={5}
                    value={form.description}
                    onChange={(e) =>
                        setForm((prev) => ({ ...prev, description: e.target.value }))
                    }
                    className="w-full bg-[#1e3261] border border-white/30 text-white p-3 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-white placeholder:text-slate-400"
                    placeholder="Enter description"
                />
                <p className="text-xs text-slate-300x mt-1">
                    {" "}
                    Last updated: {formatTimestamp(timestamps.descriptionUpdatedAt)}
                </p>
            </div>

            <div className="flex justify-center">
                <Button onClick={handleSave} isLoading={loading} disabled={isDisabled}>
                    Save Changes
                </Button>
            </div>
        </div>
    );
}


export default InformationForm;