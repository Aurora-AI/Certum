# https://sdk.vercel.ai/cookbook/guides/natural-language-postgres

Copy markdown

[Natural Language Postgres Guide](#natural-language-postgres-guide)
===================================================================

In this guide, you will learn how to build an app that uses AI to interact with a PostgreSQL database using natural language.

The application will:

* Generate SQL queries from a natural language input
* Explain query components in plain English
* Create a chart to visualise query results

You can find a completed version of this project at [natural-language-postgres.vercel.app](https://natural-language-postgres.vercel.app).

[Project setup](#project-setup)
-------------------------------

This project uses the following stack:

* [Next.js](https://nextjs.org) (App Router)
* [AI SDK](/docs)
* [OpenAI](https://openai.com)
* [Zod](https://zod.dev)
* [Postgres](https://www.postgresql.org/) with  [Vercel Postgres](https://vercel.com/postgres)
* [shadcn-ui](https://ui.shadcn.com) and [TailwindCSS](https://tailwindcss.com) for styling
* [Recharts](https://recharts.org) for data visualization

### [Clone repo](#clone-repo)

To focus on the AI-powered functionality rather than project setup and configuration we've prepared a starter repository which includes a database schema and a few components.

Clone the starter repository and check out the `starter` branch:

```
git clone https://github.com/vercel-labs/natural-language-postgres
```

```
cd natural-language-postgres
```

```
git checkout starter
```

### [Project setup and data](#project-setup-and-data)

Let's set up the project and seed the database with the dataset:

1. Install dependencies:

```
pnpm install
```

2. Copy the example environment variables file:

```
cp .env.example .env
```

3. Add your environment variables to `.env`:

.env

```
1

OPENAI_API_KEY="your_api_key_here"



2

POSTGRES_URL="..."



3

POSTGRES_PRISMA_URL="..."



4

POSTGRES_URL_NO_SSL="..."



5

POSTGRES_URL_NON_POOLING="..."



6

POSTGRES_USER="..."



7

POSTGRES_HOST="..."



8

POSTGRES_PASSWORD="..."



9

POSTGRES_DATABASE="..."
```

4. This project uses CB Insights' Unicorn Companies dataset. You can download the dataset by following these instructions:
   * Navigate to [CB Insights Unicorn Companies](https://www.cbinsights.com/research-unicorn-companies)
   * Enter in your email. You will receive a link to download the dataset.
   * Save it as `unicorns.csv` in your project root

You will need a Postgres database to complete this tutorial. If you don't have
Postgres setup on your local machine you can: - Create a free Postgres
database with Vercel (recommended - see instructions below); or - Follow [this
guide](https://www.prisma.io/dataguide/postgresql/setting-up-a-local-postgresql-database)
to set it up locally

#### [Setting up Postgres with Vercel](#setting-up-postgres-with-vercel)

To set up a Postgres instance on your Vercel account:

1. Go to [Vercel.com](https://vercel.com) and make sure you're logged in
2. Navigate to your team homepage
3. Click on the **Integrations** tab
4. Click **Browse Marketplace**
5. Look for the **Storage** option in the sidebar
6. Select the **Neon** option (recommended, but any other PostgreSQL database provider should work)
7. Click **Install**, then click **Install** again in the top right corner
8. On the "Get Started with Neon" page, click **Create Database** on the right
9. Select your region (e.g., Washington, D.C., U.S. East)
10. Turn off **Auth**
11. Click **Continue**
12. Name your database (you can use the default name or rename it to something like "NaturalLanguagePostgres")
13. Click **Create** in the bottom right corner
14. After seeing "Database created successfully", click **Done**
15. You'll be redirected to your database instance
16. In the Quick Start section, click **Show secrets**
17. Copy the full `DATABASE_URL` environment variable and use it to populate the Postgres environment variables in your `.env` file

### [About the dataset](#about-the-dataset)

The Unicorn List dataset contains the following information about unicorn startups (companies with a valuation above $1bn):

* Company name
* Valuation
* Date joined (unicorn status)
* Country
* City
* Industry
* Select investors

This dataset contains over 1000 rows of data over 7 columns, giving us plenty of structured data to analyze. This makes it perfect for exploring various SQL queries that can reveal interesting insights about the unicorn startup ecosystem.

5. Now that you have the dataset downloaded and added to your project, you can initialize the database with the following command:

```
pnpm run seed
```

Note: this step can take a little while. You should see a message indicating the Unicorns table has been created and then that the database has been seeded successfully.

Remember, the dataset should be named `unicorns.csv` and located in root of
your project.

6. Start the development server:

```
pnpm run dev
```

Your application should now be running at <http://localhost:3000>.

[Project structure](#project-structure)
---------------------------------------

The starter repository already includes everything that you will need, including:

* Database seed script (`lib/seed.ts`)
* Basic components built with shadcn/ui (`components/`)
* Function to run SQL queries (`app/actions.ts`)
* Type definitions for the database schema (`lib/types.ts`)

### [Existing components](#existing-components)

The application contains a single page in `app/page.tsx` that serves as the main interface.

At the top, you'll find a header (`header.tsx`) displaying the application title and description. Below that is an input field and search button (`search.tsx`) where you can enter natural language queries.

Initially, the page shows a collection of suggested example queries (`suggested-queries.tsx`) that you can click to quickly try out the functionality.

When you submit a query:

* The suggested queries section disappears and a loading state appears
* Once complete, a card appears with "TODO - IMPLEMENT ABOVE" (`query-viewer.tsx`) which will eventually show your generated SQL
* Below that is an empty results area with "No results found" (`results.tsx`)

After you implement the core functionality:

* The results section will display data in a table format
* A toggle button will allow switching between table and chart views
* The chart view will visualize your query results

Let's implement the AI-powered functionality to bring it all together.

[Building the application](#building-the-application)
-----------------------------------------------------

As a reminder, this application will have three main features:

1. Generate SQL queries from natural language
2. Create a chart from the query results
3. Explain SQL queries in plain English

For each of these features, you'll use the AI SDK via  [Server Actions](https://react.dev/reference/rsc/server-actions)  to interact with OpenAI's GPT-4o and GPT-4o-mini models. Server Actions are a powerful React Server Component feature that allows you to call server-side functions directly from your frontend code.

Let's start with generating a SQL query from natural language.

[Generate SQL queries](#generate-sql-queries)
---------------------------------------------

### [Providing context](#providing-context)

For the model to generate accurate SQL queries, it needs context about your database schema, tables, and relationships. You will communicate this information through a prompt that should include:

1. Schema information
2. Example data formats
3. Available SQL operations
4. Best practices for query structure
5. Nuanced advice for specific fields

Let's write a prompt that includes all of this information:

```
1

You are a SQL (postgres) and data visualization expert. Your job is to help the user write a SQL query to retrieve the data they need. The table schema is as follows:



2



3

unicorns (



4

id SERIAL PRIMARY KEY,



5

company VARCHAR(255) NOT NULL UNIQUE,



6

valuation DECIMAL(10, 2) NOT NULL,



7

date_joined DATE,



8

country VARCHAR(255) NOT NULL,



9

city VARCHAR(255) NOT NULL,



10

industry VARCHAR(255) NOT NULL,



11

select_investors TEXT NOT NULL



12

);



13



14

Only retrieval queries are allowed.



15



16

For things like industry, company names and other string fields, use the ILIKE operator and convert both the search term and the field to lowercase using LOWER() function. For example: LOWER(industry) ILIKE LOWER('%search_term%').



17



18

Note: select_investors is a comma-separated list of investors. Trim whitespace to ensure you're grouping properly. Note, some fields may be null or have only one value.



19

When answering questions about a specific field, ensure you are selecting the identifying column (ie. what is Vercel's valuation would select company and valuation').



20



21

The industries available are:



22

- healthcare & life sciences



23

- consumer & retail



24

- financial services



25

- enterprise tech



26

- insurance



27

- media & entertainment



28

- industrials



29

- health



30



31

If the user asks for a category that is not in the list, infer based on the list above.



32



33

Note: valuation is in billions of dollars so 10b would be 10.0.



34

Note: if the user asks for a rate, return it as a decimal. For example, 0.1 would be 10%.



35



36

If the user asks for 'over time' data, return by year.



37



38

When searching for UK or USA, write out United Kingdom or United States respectively.



39



40

EVERY QUERY SHOULD RETURN QUANTITATIVE DATA THAT CAN BE PLOTTED ON A CHART! There should always be at least two columns. If the user asks for a single column, return the column and the count of the column. If the user asks for a rate, return the rate as a decimal. For example, 0.1 would be 10%.
```

There are several important elements of this prompt:

* Schema description helps the model understand exactly what data fields to work with
* Includes rules for handling queries based on common SQL patterns - for example, always using ILIKE for case-insensitive string matching
* Explains how to handle edge cases in the dataset, like dealing with the comma-separated investors field and ensuring whitespace is properly handled
* Instead of having the model guess at industry categories, it provides the exact list that exists in the data, helping avoid mismatches
* The prompt helps standardize data transformations - like knowing to interpret "10b" as "10.0" billion dollars, or that rates should be decimal values
* Clear rules ensure the query output will be chart-friendly by always including at least two columns of data that can be plotted

This prompt structure provides a strong foundation for query generation, but you should experiment and iterate based on your specific needs and the model you're using.

### [Create a Server Action](#create-a-server-action)

With the prompt done, let's create a Server Action.

Open `app/actions.ts`. You should see one action already defined (`runGeneratedSQLQuery`).

Add a new action. This action should be asynchronous and take in one parameter - the natural language query.

app/actions.ts

```
1

/* ...rest of the file... */



2



3

export const generateQuery = async (input: string) => {};
```

In this action, you'll use the `generateObject` function from the AI SDK which allows you to constrain the model's output to a pre-defined schema. This process, sometimes called structured output, ensures the model returns only the SQL query without any additional prefixes, explanations, or formatting that would require manual parsing.

app/actions.ts

```
1

/* ...other imports... */



2

import { generateObject } from 'ai';



3

import { z } from 'zod';



4



5

/* ...rest of the file... */



6



7

export const generateQuery = async (input: string) => {



8

'use server';



9

try {



10

const result = await generateObject({



11

model: 'openai/gpt-4o',



12

system: `You are a SQL (postgres) ...`, // SYSTEM PROMPT AS ABOVE - OMITTED FOR BREVITY



13

prompt: `Generate the query necessary to retrieve the data the user wants: ${input}`,



14

schema: z.object({



15

query: z.string(),



16

}),



17

});



18

return result.object.query;



19

} catch (e) {



20

console.error(e);



21

throw new Error('Failed to generate query');



22

}



23

};
```

Note, you are constraining the output to a single string field called `query` using `zod`, a TypeScript schema validation library. This will ensure the model only returns the SQL query itself. The resulting generated query will then be returned.

### [Update the frontend](#update-the-frontend)

With the Server Action in place, you can now update the frontend to call this action when the user submits a natural language query. In the root page (`app/page.tsx`), you should see a `handleSubmit` function that is called when the user submits a query.

Import the `generateQuery` function and call it with the user's input.

app/page.tsx

```
1

/* ...other imports... */



2

import { runGeneratedSQLQuery, generateQuery } from './actions';



3



4

/* ...rest of the file... */



5



6

const handleSubmit = async (suggestion?: string) => {



7

clearExistingData();



8



9

const question = suggestion ?? inputValue;



10

if (inputValue.length === 0 && !suggestion) return;



11



12

if (question.trim()) {



13

setSubmitted(true);



14

}



15



16

setLoading(true);



17

setLoadingStep(1);



18

setActiveQuery('');



19



20

try {



21

const query = await generateQuery(question);



22



23

if (query === undefined) {



24

toast.error('An error occurred. Please try again.');



25

setLoading(false);



26

return;



27

}



28



29

setActiveQuery(query);



30

setLoadingStep(2);



31



32

const companies = await runGeneratedSQLQuery(query);



33

const columns = companies.length > 0 ? Object.keys(companies[0]) : [];



34

setResults(companies);



35

setColumns(columns);



36



37

setLoading(false);



38

} catch (e) {



39

toast.error('An error occurred. Please try again.');



40

setLoading(false);



41

}



42

};



43



44

/* ...rest of the file... */
```

Now, when the user submits a natural language query (ie. "how many unicorns are from San Francisco?"), that question will be sent to your newly created Server Action. The Server Action will call the model, passing in your system prompt and the users query, and return the generated SQL query in a structured format. This query is then passed to the `runGeneratedSQLQuery` action to run the query against your database. The results are then saved in local state and displayed to the user.

Save the file, make sure the dev server is running, and then head to `localhost:3000` in your browser. Try submitting a natural language query and see the generated SQL query and results. You should see a SQL query generated and displayed under the input field. You should also see the results of the query displayed in a table below the input field.

Try clicking the SQL query to see the full query if it's too long to display in the input field. You should see a button on the right side of the input field with a question mark icon. Clicking this button currently does nothing, but you'll add the "explain query" functionality to it in the next step.

[Explain SQL Queries](#explain-sql-queries)
-------------------------------------------

Next, let's add the ability to explain SQL queries in plain English. This feature helps users understand how the generated SQL query works by breaking it down into logical sections.
As with the SQL query generation, you'll need a prompt to guide the model when explaining queries.

Let's craft a prompt for the explain query functionality:

```
1

You are a SQL (postgres) expert. Your job is to explain to the user write a SQL query you wrote to retrieve the data they asked for. The table schema is as follows:



2

unicorns (



3

id SERIAL PRIMARY KEY,



4

company VARCHAR(255) NOT NULL UNIQUE,



5

valuation DECIMAL(10, 2) NOT NULL,



6

date_joined DATE,



7

country VARCHAR(255) NOT NULL,



8

city VARCHAR(255) NOT NULL,



9

industry VARCHAR(255) NOT NULL,



10

select_investors TEXT NOT NULL



11

);



12



13

When you explain you must take a section of the query, and then explain it. Each "section" should be unique. So in a query like: "SELECT * FROM unicorns limit 20", the sections could be "SELECT *", "FROM UNICORNS", "LIMIT 20".



14

If a section doesn't have any explanation, include it, but leave the explanation empty.
```

Like the prompt for generating SQL queries, you provide the model with the schema of the database. Additionally, you provide an example of what each section of the query might look like. This helps the model understand the structure of the query and how to break it down into logical sections.

### [Create a Server Action](#create-a-server-action-1)

Add a new Server Action to generate explanations for SQL queries.

This action takes two parameters - the original natural language input and the generated SQL query.

app/actions.ts

```
1

/* ...rest of the file... */



2



3

export const explainQuery = async (input: string, sqlQuery: string) => {



4

'use server';



5

try {



6

const result = await generateObject({



7

model: 'openai/gpt-4o',



8

system: `You are a SQL (postgres) expert. ...`, // SYSTEM PROMPT AS ABOVE - OMITTED FOR BREVITY



9

prompt: `Explain the SQL query you generated to retrieve the data the user wanted. Assume the user is not an expert in SQL. Break down the query into steps. Be concise.



10



11

User Query:



12

${input}



13



14

Generated SQL Query:



15

${sqlQuery}`,



16

});



17

return result.object;



18

} catch (e) {



19

console.error(e);



20

throw new Error('Failed to generate query');



21

}



22

};
```

This action uses the `generateObject` function again. However, you haven't defined the schema yet. Let's define it in another file so it can also be used as a type in your components.

Update your `lib/types.ts` file to include the schema for the explanations:

lib/types.ts

```
1

import { z } from 'zod';



2



3

/* ...rest of the file... */



4



5

export const explanationSchema = z.object({



6

section: z.string(),



7

explanation: z.string(),



8

});



9



10

export type QueryExplanation = z.infer<typeof explanationSchema>;
```

This schema defines the structure of the explanation that the model will generate. Each explanation will have a `section` and an `explanation`. The `section` is the part of the query being explained, and the `explanation` is the plain English explanation of that section. Go back to your `actions.ts` file and import and use the `explanationSchema`:

app/actions.ts

```
1

// other imports



2

import { explanationSchema } from '@/lib/types';



3



4

/* ...rest of the file... */



5



6

export const explainQuery = async (input: string, sqlQuery: string) => {



7

'use server';



8

try {



9

const result = await generateObject({



10

model: 'openai/gpt-4o',



11

system: `You are a SQL (postgres) expert. ...`, // SYSTEM PROMPT AS ABOVE - OMITTED FOR BREVITY



12

prompt: `Explain the SQL query you generated to retrieve the data the user wanted. Assume the user is not an expert in SQL. Break down the query into steps. Be concise.



13



14

User Query:



15

${input}



16



17

Generated SQL Query:



18

${sqlQuery}`,



19

schema: explanationSchema,



20

output: 'array',



21

});



22

return result.object;



23

} catch (e) {



24

console.error(e);



25

throw new Error('Failed to generate query');



26

}



27

};
```

You can use `output: "array"` to indicate to the model that you expect an
array of objects matching the schema to be returned.

### [Update query viewer](#update-query-viewer)

Next, update the `query-viewer.tsx` component to display these explanations. The `handleExplainQuery` function is called every time the user clicks the question icon button on the right side of the query. Let's update this function to use the new `explainQuery` action:

components/query-viewer.tsx

```
1

/* ...other imports... */



2

import { explainQuery } from '@/app/actions';



3



4

/* ...rest of the component... */



5



6

const handleExplainQuery = async () => {



7

setQueryExpanded(true);



8

setLoadingExplanation(true);



9



10

const explanations = await explainQuery(inputValue, activeQuery);



11

setQueryExplanations(explanations);



12



13

setLoadingExplanation(false);



14

};



15



16

/* ...rest of the component... */
```

Now when users click the explanation button (the question mark icon), the component will:

1. Show a loading state
2. Send the active SQL query and the users natural language query to your Server Action
3. The model will generate an array of explanations
4. The explanations will be set in the component state and rendered in the UI

Submit a new query and then click the explanation button. Hover over different elements of the query. You should see the explanations for each section!

[Visualizing query results](#visualizing-query-results)
-------------------------------------------------------

Finally, let's render the query results visually in a chart. There are two approaches you could take:

1. Send both the query and data to the model and ask it to return the data in a visualization-ready format. While this provides complete control over the visualization, it requires the model to send back all of the data, which significantly increases latency and costs.
2. Send the query and data to the model and ask it to generate a chart configuration (fixed-size and not many tokens) that maps your data appropriately. This configuration specifies how to visualize the information while delivering the insights from your natural language query. Importantly, this is done without requiring the model return the full dataset.

Since you don't know the SQL query or data shape beforehand, let's use the second approach to dynamically generate chart configurations based on the query results and user intent.

### [Generate the chart configuration](#generate-the-chart-configuration)

For this feature, you'll create a Server Action that takes the query results and the user's original natural language query to determine the best visualization approach. Your application is already set up to use `shadcn` charts (which uses [`Recharts`](https://recharts.org/en-US/) under the hood) so the model will need to generate:

* Chart type (bar, line, area, or pie)
* Axis mappings
* Visual styling

Let's start by defining the schema for the chart configuration in `lib/types.ts`:

lib/types.ts

```
1

/* ...rest of the file... */



2



3

export const configSchema = z



4

.object({



5

description: z



6

.string()



7

.describe(



8

'Describe the chart. What is it showing? What is interesting about the way the data is displayed?',



9

),



10

takeaway: z.string().describe('What is the main takeaway from the chart?'),



11

type: z.enum(['bar', 'line', 'area', 'pie']).describe('Type of chart'),



12

title: z.string(),



13

xKey: z.string().describe('Key for x-axis or category'),



14

yKeys: z



15

.array(z.string())



16

.describe(



17

'Key(s) for y-axis values this is typically the quantitative column',



18

),



19

multipleLines: z



20

.boolean()



21

.describe(



22

'For line charts only: whether the chart is comparing groups of data.',



23

)



24

.optional(),



25

measurementColumn: z



26

.string()



27

.describe(



28

'For line charts only: key for quantitative y-axis column to measure against (eg. values, counts etc.)',



29

)



30

.optional(),



31

lineCategories: z



32

.array(z.string())



33

.describe(



34

'For line charts only: Categories used to compare different lines or data series. Each category represents a distinct line in the chart.',



35

)



36

.optional(),



37

colors: z



38

.record(



39

z.string().describe('Any of the yKeys'),



40

z.string().describe('Color value in CSS format (e.g., hex, rgb, hsl)'),



41

)



42

.describe('Mapping of data keys to color values for chart elements')



43

.optional(),



44

legend: z.boolean().describe('Whether to show legend'),



45

})



46

.describe('Chart configuration object');



47



48

export type Config = z.infer<typeof configSchema>;
```

Replace the existing `export type Config = any;` type with the new one.

This schema makes extensive use of Zod's `.describe()` function to give the model extra context about each of the key's you are expecting in the chart configuration. This will help the model understand the purpose of each key and generate more accurate results.

Another important technique to note here is that you are defining `description` and `takeaway` fields. Not only are these useful for the user to quickly understand what the chart means and what they should take away from it, but they also force the model to generate a description of the data first, before it attempts to generate configuration attributes like axis and columns. This will help the model generate more accurate and relevant chart configurations.

### [Create the Server Action](#create-the-server-action)

Create a new action in `app/actions.ts`:

```
1

/* ...other imports... */



2

import { Config, configSchema, explanationsSchema, Result } from '@/lib/types';



3



4

/* ...rest of the file... */



5



6

export const generateChartConfig = async (



7

results: Result[],



8

userQuery: string,



9

) => {



10

'use server';



11



12

try {



13

const { object: config } = await generateObject({



14

model: 'openai/gpt-4o',



15

system: 'You are a data visualization expert.',



16

prompt: `Given the following data from a SQL query result, generate the chart config that best visualises the data and answers the users query.



17

For multiple groups use multi-lines.



18



19

Here is an example complete config:



20

export const chartConfig = {



21

type: "pie",



22

xKey: "month",



23

yKeys: ["sales", "profit", "expenses"],



24

colors: {



25

sales: "#4CAF50",    // Green for sales



26

profit: "#2196F3",   // Blue for profit



27

expenses: "#F44336"  // Red for expenses



28

},



29

legend: true



30

}



31



32

User Query:



33

${userQuery}



34



35

Data:



36

${JSON.stringify(results, null, 2)}`,



37

schema: configSchema,



38

});



39



40

// Override with shadcn theme colors



41

const colors: Record<string, string> = {};



42

config.yKeys.forEach((key, index) => {



43

colors[key] = `hsl(var(--chart-${index + 1}))`;



44

});



45



46

const updatedConfig = { ...config, colors };



47

return { config: updatedConfig };



48

} catch (e) {



49

console.error(e);



50

throw new Error('Failed to generate chart suggestion');



51

}



52

};
```

### [Update the chart component](#update-the-chart-component)

With the action in place, you'll want to trigger it automatically after receiving query results. This ensures the visualization appears almost immediately after data loads.

Update the `handleSubmit` function in your root page (`app/page.tsx`) to generate and set the chart configuration after running the query:

app/page.tsx

```
1

/* ...other imports... */



2

import { getCompanies, generateQuery, generateChartConfig } from './actions';



3



4

/* ...rest of the file... */



5

const handleSubmit = async (suggestion?: string) => {



6

clearExistingData();



7



8

const question = suggestion ?? inputValue;



9

if (inputValue.length === 0 && !suggestion) return;



10



11

if (question.trim()) {



12

setSubmitted(true);



13

}



14



15

setLoading(true);



16

setLoadingStep(1);



17

setActiveQuery('');



18



19

try {



20

const query = await generateQuery(question);



21



22

if (query === undefined) {



23

toast.error('An error occurred. Please try again.');



24

setLoading(false);



25

return;



26

}



27



28

setActiveQuery(query);



29

setLoadingStep(2);



30



31

const companies = await runGeneratedSQLQuery(query);



32

const columns = companies.length > 0 ? Object.keys(companies[0]) : [];



33

setResults(companies);



34

setColumns(columns);



35



36

setLoading(false);



37



38

const { config } = await generateChartConfig(companies, question);



39

setChartConfig(config);



40

} catch (e) {



41

toast.error('An error occurred. Please try again.');



42

setLoading(false);



43

}



44

};



45



46

/* ...rest of the file... */
```

Now when users submit queries, the application will:

1. Generate and run the SQL query
2. Display the table results
3. Generate a chart configuration for the results
4. Allow toggling between table and chart views

Head back to the browser and test the application with a few queries. You should see the chart visualization appear after the table results.

[Next steps](#next-steps)
-------------------------

You've built an AI-powered SQL analysis tool that can convert natural language to SQL queries, visualize query results, and explain SQL queries in plain English.

You could, for example, extend the application to use your own data sources or add more advanced features like customizing the chart configuration schema to support more chart types and options. You could also add more complex SQL query generation capabilities.