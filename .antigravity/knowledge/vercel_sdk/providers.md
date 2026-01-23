# https://sdk.vercel.ai/providers

AI SDK Providers

Copy markdown

[AI SDK Providers](#ai-sdk-providers)
=====================================

The AI SDK comes with several providers that you can use to interact with different language models:

[Vercel AI Gateway

Image InputImage GenerationObject GenerationTool UsageTool Streaming](/providers/ai-sdk-providers/ai-gateway)[OpenAI

Image InputImage GenerationObject GenerationTool UsageTool Streaming](/providers/ai-sdk-providers/openai)[Anthropic

Image InputObject GenerationTool UsageTool Streaming](/providers/ai-sdk-providers/anthropic)[Google Generative AI

![Google Generative AI logo](/_next/image?url=%2Ficons%2Fgoogle.svg&w=256&q=75&dpl=dpl_34u9oohYr3RxuFq9TLMoLGBY6uAw)

Image InputObject GenerationTool UsageTool Streaming](/providers/ai-sdk-providers/google-generative-ai)[xAI Grok

Image InputImage GenerationObject GenerationTool UsageTool Streaming](/providers/ai-sdk-providers/xai)[Azure

![Azure logo](/_next/image?url=%2Ficons%2Fazure.svg&w=256&q=75&dpl=dpl_34u9oohYr3RxuFq9TLMoLGBY6uAw)

Image InputObject GenerationTool UsageTool Streaming](/providers/ai-sdk-providers/azure)[Amazon Bedrock

Image InputImage GenerationObject GenerationTool UsageTool Streaming](/providers/ai-sdk-providers/amazon-bedrock)[Groq

Image InputObject GenerationTool UsageTool Streaming](/providers/ai-sdk-providers/groq)[Fal AI

Image Generation](/providers/ai-sdk-providers/fal)[DeepInfra

Image InputObject GenerationTool UsageTool Streaming](/providers/ai-sdk-providers/deepinfra)[Google Vertex AI

![Google Vertex AI logo](/_next/image?url=%2Ficons%2Fgoogle.svg&w=256&q=75&dpl=dpl_34u9oohYr3RxuFq9TLMoLGBY6uAw)

Image InputImage GenerationObject GenerationTool UsageTool Streaming](/providers/ai-sdk-providers/google-vertex)[Mistral

![Mistral logo](/_next/image?url=%2Ficons%2Fmistral.svg&w=256&q=75&dpl=dpl_34u9oohYr3RxuFq9TLMoLGBY6uAw)

Image InputObject GenerationTool UsageTool Streaming](/providers/ai-sdk-providers/mistral)[Together.ai

Object GenerationTool UsageTool Streaming](/providers/ai-sdk-providers/togetherai)[Cohere

![Cohere logo](/_next/image?url=%2Ficons%2Fcohere.svg&w=256&q=75&dpl=dpl_34u9oohYr3RxuFq9TLMoLGBY6uAw)

Tool UsageTool Streaming](/providers/ai-sdk-providers/cohere)[Fireworks

![Fireworks logo](/_next/image?url=%2Ficons%2Ffireworks.png&w=256&q=75&dpl=dpl_34u9oohYr3RxuFq9TLMoLGBY6uAw)

Image GenerationObject GenerationTool UsageTool Streaming](/providers/ai-sdk-providers/fireworks)[DeepSeek

![DeepSeek logo](/_next/image?url=%2Ficons%2Fdeepseek.svg&w=256&q=75&dpl=dpl_34u9oohYr3RxuFq9TLMoLGBY6uAw)

Object GenerationTool UsageTool Streaming](/providers/ai-sdk-providers/deepseek)[Cerebras

Object GenerationTool UsageTool Streaming](/providers/ai-sdk-providers/cerebras)[Perplexity

![Perplexity logo](/_next/image?url=%2Ficons%2Fperplexity.svg&w=256&q=75&dpl=dpl_34u9oohYr3RxuFq9TLMoLGBY6uAw)](/providers/ai-sdk-providers/perplexity)[Luma AI

![Luma AI logo](/_next/image?url=%2Ficons%2Fluma.png&w=256&q=75&dpl=dpl_34u9oohYr3RxuFq9TLMoLGBY6uAw)

Image Generation](/providers/ai-sdk-providers/luma)[Baseten

![Baseten logo](/_next/image?url=%2Ficons%2Fbaseten.svg&w=256&q=75&dpl=dpl_34u9oohYr3RxuFq9TLMoLGBY6uAw)

Object GenerationTool Usage](/providers/ai-sdk-providers/baseten)

There are also [community providers](./community-providers) that have been created using the [Language Model Specification](./community-providers/custom-providers).

[Ollama

Provider Dependent](/providers/community-providers/ollama)[Anthropic Vertex

Provider Dependent](/providers/community-providers/anthropic-vertex-ai)[Portkey

![Portkey logo](/_next/image?url=%2Ficons%2Fportkey.png&w=256&q=75&dpl=dpl_34u9oohYr3RxuFq9TLMoLGBY6uAw)

Provider Dependent](/providers/community-providers/portkey)[Cloudflare Workers AI

Provider Dependent](/providers/community-providers/cloudflare-workers-ai)[Write your own

Provider Dependent](/providers/community-providers/custom-providers)

[Provider support](#provider-support)
-------------------------------------

Not all providers support all AI SDK features. Here's a quick comparison of the capabilities of popular models:

| Provider | Model | Image Input | Object Generation | Tool Usage | Tool Streaming |
| --- | --- | --- | --- | --- | --- |
| [xAI Grok](/providers/ai-sdk-providers/xai) | `grok-4-fast-reasoning` |  |  |  |  |
| [xAI Grok](/providers/ai-sdk-providers/xai) | `grok-4` |  |  |  |  |
| [xAI Grok](/providers/ai-sdk-providers/xai) | `grok-3` |  |  |  |  |
| [xAI Grok](/providers/ai-sdk-providers/xai) | `grok-3-fast` |  |  |  |  |
| [xAI Grok](/providers/ai-sdk-providers/xai) | `grok-3-mini` |  |  |  |  |
| [xAI Grok](/providers/ai-sdk-providers/xai) | `grok-2-vision-1212` |  |  |  |  |
| [Vercel](/providers/ai-sdk-providers/vercel) | `v0-1.0-md` |  |  |  |  |
| [OpenAI](/providers/ai-sdk-providers/openai) | `gpt-5.2-pro` |  |  |  |  |
| [OpenAI](/providers/ai-sdk-providers/openai) | `gpt-5.2` |  |  |  |  |
| [OpenAI](/providers/ai-sdk-providers/openai) | `gpt-5.1` |  |  |  |  |
| [OpenAI](/providers/ai-sdk-providers/openai) | `gpt-5.1-codex` |  |  |  |  |
| [OpenAI](/providers/ai-sdk-providers/openai) | `gpt-5` |  |  |  |  |
| [OpenAI](/providers/ai-sdk-providers/openai) | `gpt-5-mini` |  |  |  |  |
| [OpenAI](/providers/ai-sdk-providers/openai) | `gpt-4.1` |  |  |  |  |
| [OpenAI](/providers/ai-sdk-providers/openai) | `gpt-4.1-mini` |  |  |  |  |
| [OpenAI](/providers/ai-sdk-providers/openai) | `gpt-4o` |  |  |  |  |
| [OpenAI](/providers/ai-sdk-providers/openai) | `gpt-4o-mini` |  |  |  |  |
| [Anthropic](/providers/ai-sdk-providers/anthropic) | `claude-opus-4-5` |  |  |  |  |
| [Anthropic](/providers/ai-sdk-providers/anthropic) | `claude-sonnet-4-5` |  |  |  |  |
| [Anthropic](/providers/ai-sdk-providers/anthropic) | `claude-haiku-4-5` |  |  |  |  |
| [Anthropic](/providers/ai-sdk-providers/anthropic) | `claude-opus-4-1` |  |  |  |  |
| [Anthropic](/providers/ai-sdk-providers/anthropic) | `claude-sonnet-4-0` |  |  |  |  |
| [Anthropic](/providers/ai-sdk-providers/anthropic) | `claude-3-7-sonnet-latest` |  |  |  |  |
| [Anthropic](/providers/ai-sdk-providers/anthropic) | `claude-3-5-haiku-latest` |  |  |  |  |
| [Google Generative AI](/providers/ai-sdk-providers/google-generative-ai) | `gemini-3-pro-preview` |  |  |  |  |
| [Google Generative AI](/providers/ai-sdk-providers/google-generative-ai) | `gemini-2.5-pro` |  |  |  |  |
| [Google Generative AI](/providers/ai-sdk-providers/google-generative-ai) | `gemini-2.5-flash` |  |  |  |  |
| [Google Vertex](/providers/ai-sdk-providers/google-vertex) | `gemini-3-pro-preview` |  |  |  |  |
| [Google Vertex](/providers/ai-sdk-providers/google-vertex) | `gemini-2.5-pro` |  |  |  |  |
| [Google Vertex](/providers/ai-sdk-providers/google-vertex) | `gemini-2.5-flash` |  |  |  |  |
| [Mistral](/providers/ai-sdk-providers/mistral) | `pixtral-large-latest` |  |  |  |  |
| [Mistral](/providers/ai-sdk-providers/mistral) | `mistral-large-latest` |  |  |  |  |
| [Mistral](/providers/ai-sdk-providers/mistral) | `magistral-medium-2506` |  |  |  |  |
| [Mistral](/providers/ai-sdk-providers/mistral) | `magistral-small-2506` |  |  |  |  |
| [Mistral](/providers/ai-sdk-providers/mistral) | `mistral-small-latest` |  |  |  |  |
| [Mistral](/providers/ai-sdk-providers/mistral) | `ministral-8b-latest` |  |  |  |  |
| [Cohere](/providers/ai-sdk-providers/cohere) | `command-a-03-2025` |  |  |  |  |
| [Cohere](/providers/ai-sdk-providers/cohere) | `command-a-reasoning-08-2025` |  |  |  |  |
| [Cohere](/providers/ai-sdk-providers/cohere) | `command-r-plus` |  |  |  |  |
| [Cohere](/providers/ai-sdk-providers/cohere) | `command-r` |  |  |  |  |
| [DeepSeek](/providers/ai-sdk-providers/deepseek) | `deepseek-chat` |  |  |  |  |
| [DeepSeek](/providers/ai-sdk-providers/deepseek) | `deepseek-reasoner` |  |  |  |  |
| [Groq](/providers/ai-sdk-providers/groq) | `meta-llama/llama-4-scout-17b-16e-instruct` |  |  |  |  |
| [Groq](/providers/ai-sdk-providers/groq) | `llama-3.3-70b-versatile` |  |  |  |  |
| [Groq](/providers/ai-sdk-providers/groq) | `deepseek-r1-distill-llama-70b` |  |  |  |  |
| [Groq](/providers/ai-sdk-providers/groq) | `qwen-qwq-32b` |  |  |  |  |
| [Groq](/providers/ai-sdk-providers/groq) | `openai/gpt-oss-120b` |  |  |  |  |
| [Together AI](/providers/ai-sdk-providers/togetherai) | `meta-llama/Meta-Llama-3.3-70B-Instruct-Turbo` |  |  |  |  |
| [Together AI](/providers/ai-sdk-providers/togetherai) | `Qwen/Qwen2.5-72B-Instruct-Turbo` |  |  |  |  |
| [Together AI](/providers/ai-sdk-providers/togetherai) | `deepseek-ai/DeepSeek-V3` |  |  |  |  |
| [Together AI](/providers/ai-sdk-providers/togetherai) | `mistralai/Mixtral-8x22B-Instruct-v0.1` |  |  |  |  |
| [Fireworks](/providers/ai-sdk-providers/fireworks) | `accounts/fireworks/models/deepseek-r1` |  |  |  |  |
| [Fireworks](/providers/ai-sdk-providers/fireworks) | `accounts/fireworks/models/deepseek-v3` |  |  |  |  |
| [Fireworks](/providers/ai-sdk-providers/fireworks) | `accounts/fireworks/models/llama-v3p3-70b-instruct` |  |  |  |  |
| [Fireworks](/providers/ai-sdk-providers/fireworks) | `accounts/fireworks/models/qwen2-vl-72b-instruct` |  |  |  |  |
| [DeepInfra](/providers/ai-sdk-providers/deepinfra) | `meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8` |  |  |  |  |
| [DeepInfra](/providers/ai-sdk-providers/deepinfra) | `meta-llama/Llama-4-Scout-17B-16E-Instruct` |  |  |  |  |
| [DeepInfra](/providers/ai-sdk-providers/deepinfra) | `meta-llama/Llama-3.3-70B-Instruct` |  |  |  |  |
| [DeepInfra](/providers/ai-sdk-providers/deepinfra) | `deepseek-ai/DeepSeek-V3` |  |  |  |  |
| [DeepInfra](/providers/ai-sdk-providers/deepinfra) | `deepseek-ai/DeepSeek-R1` |  |  |  |  |
| [DeepInfra](/providers/ai-sdk-providers/deepinfra) | `Qwen/QwQ-32B` |  |  |  |  |
| [Cerebras](/providers/ai-sdk-providers/cerebras) | `llama3.3-70b` |  |  |  |  |
| [Cerebras](/providers/ai-sdk-providers/cerebras) | `gpt-oss-120b` |  |  |  |  |
| [Cerebras](/providers/ai-sdk-providers/cerebras) | `qwen-3-32b` |  |  |  |  |
| [Hugging Face](/providers/ai-sdk-providers/huggingface) | `meta-llama/Llama-3.1-8B-Instruct` |  |  |  |  |
| [Hugging Face](/providers/ai-sdk-providers/huggingface) | `moonshotai/Kimi-K2-Instruct` |  |  |  |  |
| [Baseten](/providers/ai-sdk-providers/baseten) | `Qwen/Qwen3-235B-A22B-Instruct-2507` |  |  |  |  |
| [Baseten](/providers/ai-sdk-providers/baseten) | `deepseek-ai/DeepSeek-V3.1` |  |  |  |  |
| [Baseten](/providers/ai-sdk-providers/baseten) | `moonshotai/Kimi-K2-Instruct-0905` |  |  |  |  |

This table is not exhaustive. Additional models can be found in the provider
documentation pages and on the provider websites.