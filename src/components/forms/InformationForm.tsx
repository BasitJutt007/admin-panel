"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Button from "@/components/buttons/Button";
import toast from "react-hot-toast";
import { Content } from "@/types";
import { formatTimestamp } from "@/utils/timeformater";
import { triggerRebuild } from "@/utils/triggerRebuilds";

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
            setLoading(true);
            const now = new Date().toISOString();
            const updates: Partial<Content> = {};
            const savedFields: string[] = []
            let shouldTriggerRebuild = false;

            if (form.title !== initial.title) {
                updates.title = form.title.trim();
                updates.titleUpdatedAt = now;
                savedFields.push("Title");
                shouldTriggerRebuild = true;
            }

            if (form.description !== initial.description) {
                updates.description = form.description.trim();
                updates.descriptionUpdatedAt = now;
                savedFields.push("Description");
                shouldTriggerRebuild = true;
            }

            if (savedFields.length === 0) return;

            const { data, error } = await supabase
                .from("content")
                .update(updates)
                .eq("id", 1);

            if (error) {
                console.error("❌ Supabase Update Error:", error);
                toast.error("Something went wrong!");
            } else {
                console.log("✅ Data updated:", data);
                setInitial({ ...form });
                if (updates.titleUpdatedAt)
                    setTimestamps((prev) => ({ ...prev, titleUpdatedAt: now }));
                if (updates.descriptionUpdatedAt)
                    setTimestamps((prev) => ({ ...prev, descriptionUpdatedAt: now }));
                toast.success(`${savedFields.join(" & ")} updated successfully!`);
            }

            if (shouldTriggerRebuild) {
                await triggerRebuild();
            }
        } catch (error) {
            console.log("Error saving data:", error);
            toast.error("Error saving data!");
        } finally {
            setLoading(false);
        }
    };
    const isDisabled =
        form.title === initial.title && form.description === initial.description;

    return (
        <div className="w-full max-w-4xl bg-gradient-to-br from-[#1e3261] to-[#394d7b] p-10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] space-y-10 text-white transition-all">
            <h2 className="text-4xl font-bold tracking-tight text-center">🛠️ Admin Panel</h2>

            <div className="space-y-2">
                <label className="block font-semibold text-lg">Title</label>
                <input
                    type="text"
                    value={form.title}
                    onChange={(e) =>
                        setForm((prev) => ({ ...prev, title: e.target.value }))
                    }
                    className="w-full bg-[#1e3261]/60 border border-white/30 text-white placeholder:text-white/40 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:bg-[#1e3261]/80 transition-all duration-150"
                    placeholder="Enter title"
                />
                <p className="text-xs text-slate-300">
                    Last updated: {formatTimestamp(timestamps.titleUpdatedAt)}
                </p>
            </div>

            <div className="space-y-2">
                <label className="block font-semibold text-lg">Description</label>
                <textarea
                    rows={7}
                    value={form.description}
                    onChange={(e) =>
                        setForm((prev) => ({ ...prev, description: e.target.value }))
                    }
                    className="w-full bg-[#1e3261]/60 border border-white/30 text-white placeholder:text-white/40 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:bg-[#1e3261]/80 transition-all duration-150"
                    placeholder="Enter description"
                />
                <p className="text-xs text-slate-300">
                    Last updated: {formatTimestamp(timestamps.descriptionUpdatedAt)}
                </p>
            </div>

            <div className="flex justify-center pt-2">
                <Button
                    onClick={handleSave}
                    isLoading={loading}
                    disabled={isDisabled}
                    className="!px-8 !py-3 !text-lg"
                >
                    💾 Save Changes
                </Button>
            </div>
        </div>
    )
};

export default InformationForm;
