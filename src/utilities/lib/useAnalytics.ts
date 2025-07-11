// utilities/trackAnalyticsEvent.ts
import { useEffect } from "react";
import { useLocation } from "react-router";
import { supabase } from "@api/supabase";
import { getSessionID } from "@custom/providers/Providers";

let isFirstEvent = true;
export async function trackAnalyticsEvent({
  project = "blog",
  page,
  type,
  description,
  notes,
  metadata = {},
}: {
  project?: string;
  page: string;
  type: string;
  description?: string;
  notes?: string;
  metadata?: Record<string, any>;
}) {
    const sessionID = getSessionID();

    const { data: eventType } = await supabase
        .from("analytics_event_types")
        .select("id")
        .eq("type", type)
        .single();

    if (!eventType) return;

    try {
        const token: string = (import.meta.env as any).VITE_PUBLIC_ANALYTICS_TOKEN;

        if (!token) return;

        const { error } = await supabase
            .from("analytics_events")
            .insert({
                project,
                page,
                description,
                notes,
                event_type_id: eventType.id,
                client_token: token,
                metadata: {
                    ...metadata,
                    isFirstEvent,
                    sessionID,
                    userAgent: navigator.userAgent
                }
            })
            .select("*")
            .single();
    
        if (error) {
            console.error('Error tracking analytics event:', error);
        }
        return;
        
    } catch (error) {
        console.error('Error tracking analytics event:', error);
    }
};

const useAnalytics = () => {
    const location = useLocation();
    useEffect(() => {
        trackAnalyticsEvent({
            project: "blog",
            page: location.pathname,
            type: "page_view",
            metadata: {
                referrer: document.referrer,
                title: document.title,
            }
        });

        const timeout = setTimeout(() => {
            trackAnalyticsEvent({
                project: "blog",
                page: location.pathname,
                type: "page_view",
                metadata: {
                referrer: document.referrer,
                title: document.title,
            }
            });
        }, 30000);

        return () => clearTimeout(timeout);
    }, []);

    return null;
}