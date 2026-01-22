import { describe, expect, it } from "vitest";

import { mockQualify } from "@/lib/elysian/mockQualify";

describe("mockQualify", () => {
  it("returns trust mood + protection hero for protection language", async () => {
    const res = await mockQualify({
      message: "Quero proteger o patrimônio da minha família",
    });

    expect(res.uiSignals.backgroundMood).toBe("trust");
    expect(res.uiSignals.heroVariant).toBe("protection");
    expect(res.uiSignals.accentColor).toBe("#4A9CC9");
    expect(res.profile.concerns).toContain("asset_protection");
    expect(res.profile.concerns).toContain("succession_planning");
  });
});

