# https://vercel.com/docs/ai/replicate

Menu

Vercel Replicate Integration Connectable Account
================================================

Copy pageAsk AI about this page

Last updated June 26, 2025

provides a platform for
accessing and deploying a wide range of open-source artificial intelligence
models. These models span various AI applications such as image and video
processing, natural language processing, and audio synthesis. With the Vercel
Replicate integration, you can incorporate these AI capabilities into your
applications, enabling advanced functionalities and enhancing user experiences.

[Use cases](#use-cases)
-----------------------

You can use the Vercel and Replicate integration to power a variety of AI applications, including:

* Content generation: Use Replicate for generating text, images, and audio content in creative and marketing applications
* Image and video processing: Use Replicate in applications for image enhancement, style transfer, or object detection
* NLP and chat-bots: Use Replicate's language processing models in chat-bots and natural language interfaces

### [Available models](#available-models)

Replicate models cover a broad spectrum of AI applications ranging from image and video processing to natural language processing and audio synthesis.

[Getting started](#getting-started)
-----------------------------------

The Vercel  integration can be accessed through the AI tab on your [Vercel dashboard](/dashboard).

### [Prerequisites](#prerequisites)

To follow this guide, you'll need the following:

* An existing [Vercel project](/docs/projects/overview#creating-a-project)
* The latest version of [Vercel CLI](/docs/cli#installing-vercel-cli)


  Terminal

  ```
  pnpm i -g vercel@latest
  ```

### [Add the provider to your project](#add-the-provider-to-your-project)

#### [Using the dashboard](#using-the-dashboard)

1. Navigate to the AI tab in your [Vercel dashboard](/dashboard)
2. Select  from the list of providers, and press Add
3. Review the provider information, and press Add Provider
4. You can now select which projects the provider will have access to. You can choose from All Projects or Specific Projects
   * If you select Specific Projects, you'll be prompted to select the projects you want to connect to the provider. The list will display projects associated with your scoped team
   * Multiple projects can be selected during this step
5. Select the Connect to Project button
6. You'll be redirected to the provider's website to complete the connection process
7. Once the connection is complete, you'll be redirected back to the Vercel dashboard, and the provider integration dashboard page. From here you can manage your provider settings, view usage, and more
8. Pull the environment variables into your project using [Vercel CLI](/docs/cli/env)

   terminal

   ```
   vercel env pull
   ```
9. Install the providers package
10. Connect your project using the code below:

[Deploy a template](#deploy-a-template)
---------------------------------------

You can deploy a template to Vercel that uses a pre-trained model from Replicate:

[![Scribble Diffusion](/vc-ap-vercel-docs/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fe5382hct74si%2F21QBhvRvCXdu6KZQGQ7MMQ%2F11fb6b76593cf66aea0f8a0f9a5c38b6%2FCleanShot_2023-02-16_at_22.53.58.png&w=3840&q=75)

Scribble Diffusion

Turn your rough sketch into a refined image using AI. Powered by Replicate and ControlNet.](https://vercel.com/templates/next.js/scribble-diffusion)[![Inpainter with Stable Diffusion](/vc-ap-vercel-docs/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fe5382hct74si%2FBHQac6GdSOrGw5xvKBdcR%2F2f0613991a93e5e8f6bc53a434c1f5f7%2FCleanShot_2022-12-09_at_13.19.13.png&w=3840&q=75)

Inpainter with Stable Diffusion

Next.js application for inpainting with Stable Diffusion using the Replicate API.](https://vercel.com/templates/next.js/inpainter-stable-diffusion)[![Paint by Text](/vc-ap-vercel-docs/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fe5382hct74si%2F4MJWAAgQaFRRb0vVgTg4XL%2F4ef163972253a781ebf9596e60837885%2Fpaintbytext.png&w=3840&q=75)

Paint by Text

Edit your photos by chatting with a generative AI model (InstructPix2Pix), powered by Replicate.](https://vercel.com/templates/next.js/paint-by-text)

[More resources](#more-resources)
---------------------------------

---

Was this helpful?

supported.

Send