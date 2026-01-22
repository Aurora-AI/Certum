import React, { useEffect, useState } from "react";

import { useSiteStore } from "@/store/useSiteStore";

interface SiteStateProviderProps {
  children: React.ReactNode;
}

export function SiteStateProvider({ children }: SiteStateProviderProps) {
  const [hasHydrated, setHasHydrated] = useState(() => useSiteStore.persist.hasHydrated());

  useEffect(() => {
    const unsubFinish = useSiteStore.persist.onFinishHydration(() => setHasHydrated(true));
    setHasHydrated(useSiteStore.persist.hasHydrated());
    return unsubFinish;
  }, []);

  if (!hasHydrated) {
    return <div className="min-h-screen bg-[#0A0A0A]" />;
  }

  return <>{children}</>;
}

