---
name: geo-expert
description: Specialized skill for Generative Engine Optimization (GEO), focusing on AI crawler visibility, nested Schema.org architecture, and Answer Engine Optimization (AEO).
---

# GEO Expert (Generative Engine Optimization)

This skill provides the technical and strategic framework to ensure content visibility in the age of AI Search (ChatGPT, Perplexity, Google AI Overviews). It shifts focus from keywords to entities and from ranking to citation.

## Core Competencies

### 1. Architectural Visibility & Rendering

Ensure content is accessible to AI crawlers that may not execute JavaScript.

- **SSR Strategy:** Prioritize Server-Side Rendering (Next.js/Nuxt) to serve full HTML on the first byte.
- **Dynamic Rendering:** If SSR is impossible, implement dynamic rendering to serve static HTML to bots (User-Agents: `GPTBot`, `ClaudeBot`, `PerplexityBot`).
- **Crawler Governance (Robots.txt):**
  - **Block:** Training bots that offer no value (e.g., `CCBot`, `GPTBot` if IP protection is priority).
  - **Allow:** Search/Answer bots (e.g., `OAI-SearchBot`, `PerplexityBot`).
  - **Strategy:** Granular control (Allow Search vs. Block Training).

### 2. Semantic Engineering (Nested Schema)

Implement "GraphRAG-ready" data structures. Avoid flat schema; use nested hierarchies to define relationships explicitly.

- **Nested JSON-LD:**
  - `Organization` -> contains `employee` (`Person`) -> contains `worksFor`.
  - `Place` -> contains `address` (`PostalAddress`) -> contains `geo`.
- **Action Schema:** Implement `PotentialAction` (e.g., `BuyAction`, `SearchAction`) for Large Action Models (LAMs).
- **Markdown Optimization:** Convert internal documentation from flat Markdown to JSON-LD enriched structures for internal RAG systems.

### 3. Answer Engine Oprimization (AEO)

Optimize content to be cited as the "Truth" by LLMs.

- **Entity Focus:** Disambiguate entities using `sameAs` (linking to Wikipedia/Wikidata).
- **Inverted Pyramid & Q&A:** Structure content for direct extraction. H2 Question -> Direct Paragraph Answer (40-60 words).
- **Trust Signals:** High density of facts, statistics, and citations. Low "fluff". E-E-A-T demonstration.

## Operational Instructions

### When Analyzing Architecture:

1. Check if critical content is behind Client-Side Rendering (CSR).
2. Verify `robots.txt` for specific AI bot directives (not just `*`).
3. Audit Schema.org markup for nesting depth (are entities connected or isolated?).

### When Structuring Content:

1. Use distinct headers for distinct entities.
2. Include a "Key Takeaways" or "Summary" section at the top (TL;DR for bots).
3. cite authoritative sources (Wikipedia, PubMed) to anchor truth.

## Reference Tools

- **Rich Results Test:** Validate Nested JSON-LD.
- **Search Console:** Monitor "Crawl Stats" for specific AI User-Agents.
- **LLM Simulators:** Test content extraction against GPT-4o or Claude 3.5 Sonnet.
