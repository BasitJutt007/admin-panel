import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";

   export const triggerRebuild = async () => {
        const { error } = await supabase.functions.invoke("rebuild-hook");
        if (error) {
            console.error("❌ Rebuild trigger failed:", error);
            toast.error("Failed to trigger rebuild");
        } else {
            console.log("✅ Rebuild triggered");
            toast.success("Site rebuild triggered!");
        }
    };