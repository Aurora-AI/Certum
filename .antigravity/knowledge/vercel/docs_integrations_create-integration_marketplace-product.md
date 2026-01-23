# https://vercel.com/docs/integrations/create-integration/marketplace-product

Menu

Create a Native Integration
===========================

Copy pageAsk AI about this page

Last updated October 4, 2025

With a product, you allow a Vercel customer who has installed your integration to use specific features of your integration without having them leave the Vercel dashboard and create a separate account on your platform. You can create multiple products for each integration and each integration connects to Vercel through specific categories.

[Requirements](#requirements)
-----------------------------

To create and list your products as a Vercel provider, you need to:

* Use a Vercel Team on a [Pro plan](/docs/plans/pro-plan).
* Provide a Base URL in the product specification for a native integration server that you will create based on:
  + The [sample integration server repository](https://github.com/vercel/example-marketplace-integration).
  + The [native integrations API endpoints](/docs/integrations/marketplace-api).
* Be an approved provider so that your product is available in the Vercel Marketplace. To do so, [submit your application](https://vercel.com/marketplace/program#become-a-provider) to the Vercel Marketplace program.

[Create your product](#create-your-product)
-------------------------------------------

In this tutorial, you create a storage product for your native integration through the following steps:

1. ### [Set up the integration](#set-up-the-integration)

   Before you can create a product, you must have an existing integration. [Create a new Native Integration](/docs/integrations/create-integration) or use your existing one.
2. ### [Deploy the integration server](#deploy-the-integration-server)

   In order to deploy the integration server, you should update your integration configuration to set the base URL to the integration server URL:

   1. Select the team you would like to use from the scope selector.
   2. From your dashboard, select the Integrations tab and then select the Integrations Console button.
   3. Select the integration you would like to use for the product.
   4. Find the base URL field in the Product section and set it to the integration server URL.
   5. Select Update.

   You can use this [example Next.js application](https://github.com/vercel/example-marketplace-integration) as a guide to create your integration server
3. ### [Add a new product](#add-a-new-product)

   1. Select the integration you would like to use for the product from the Integrations Console
   2. Select Create Product from the Products card of the Product section
4. ### [Complete the fields and save](#complete-the-fields-and-save)

   You should now see the Create Product form. Fill in the following fields:

   1. Complete the Name, URL Slug, Visibility and Short Description fields
   2. Optionally update the following in the [Metadata Schema](#metadata-schema) field:
   * Edit the `properties` of the JSON schema to match the options that you are making available through the integration server.
   * Edit and check that the attributes of each property such as `type` matches your requirements.
   * Include the billing plan options that Vercel will send to your integration server when requesting the list of billing plans.
   * Use the Preview Form section to check your JSON schema as you update it.

   Review the data collection process shown in the [submit store creation flow](/docs/integrations/create-integration/marketplace-flows#submit-store-creation) to understand the impact of the metadata schema.

   3. Select Apply Changes
5. ### [Update your integration server](#update-your-integration-server)

   Add or update the [Billing](/docs/integrations/marketplace-api#billing) endpoints in your integration server so that the appropriate plans are pulled from your backend when Vercel calls these endpoints. Review the [marketplace integration example](https://github.com/vercel/example-marketplace-integration/blob/main/app/v1/products/%5BproductId%5D/plans/route.ts) for a sample billing plan route.

   Your integration server needs to handle the [billing plan selection flow](/docs/integrations/create-integration/marketplace-flows#select-billing-plan) and [resource provisioning flow](/docs/integrations/create-integration/marketplace-flows#submit-store-creation).
6. ### [Publish your product](#publish-your-product)

   To publish your product, you'll need to request for the new product to be approved:

   1. Check that your product integration follows our [review guidelines](/docs/integrations/create-integration/approval-checklist)
   2. Email [integrations@vercel.com](mailto:integrations@vercel.com) with your request to be reviewed for listing

   Once approved, Vercel customers can now add your product with the integration and select a billing plan.

[Reference](#reference)
-----------------------

### [Metadata schema](#metadata-schema)

When you first create your product, you will see a [JSON schema](https://json-schema.org/) in the Metadata Schema field of the product configuration options. You will edit this schema to match the options you want to make available in the Vercel integration dashboard to the customer who installs this product integration.

When the customer installs your product, Vercel collects data from this customer and sends it to your integration server based on the Metadata schema you provided in the product configuration. The schema includes properties specific to Vercel that allow the Vercel dashboard to understand how to render the user interface to collect this data from the customer.

As an example, use the following configuration to only show the name of the product:

```
{
  "type": "object",
  "properties": {},
  "additionalProperties": false,
  "required": []
}
```

See the endpoints for [Provision](/docs/integrations/marketplace-api#provision-resource) or [Update](/docs/integrations/marketplace-api#update-resource) Resource for specific examples.

| Property `ui:control` | Property `type` | Notes |
| --- | --- | --- |
| `input` | `number` | Number input |
| `input` | `string` | Text input |
| `toggle` | `boolean` | Toggle input |
| `slider` | `array` | Slider input. The `items` property of your array must have a type of number |
| `select` | `string` | Dropdown input |
| `multi-select` | `array` | Dropdown with multi-select input. The items property of your array must have a type of string |
| `vercel-region` | `string` | Vercel Region dropdown input. You can restrict the list of available regions by settings the acceptable regions in the enum property |
| `multi-vercel-region` | `array` | Vercel Region dropdown with multi-select input. You can restrict the list of available regions by settings the acceptable regions in the enum property of your items. Your items property must have type of string |
| `domain` | `string` | Domain name input |
| `git-namespace` | `string` | Git namespace selector |

This table shows the possible keys for the `properties` object that each
represent a type of `ui:control` that is a form element to be used on the
Vercel dashboard for this property.

See the [full JSON
schema](https://vercel.com/api/v1/integrations/marketplace/metadata-schema)
for the Metadata Schema. You can add it to your code editor for autocomplete
and validation.

You can add it to your editor configuration as follows:

```
{
  "$schema": "https://vercel.com/api/v1/integrations/marketplace/metadata-schema"
}
```

[More resources](#more-resources)
---------------------------------

* [Native integrations API reference](/docs/integrations/create-integration/marketplace-api)
* [Native integration server Github code sample](https://github.com/vercel/example-marketplace-integration)
* [Native Integration Flows](/docs/integrations/create-integration/marketplace-flows)

---

Was this helpful?

supported.

Send