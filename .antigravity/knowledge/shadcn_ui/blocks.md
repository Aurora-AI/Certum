# https://ui.shadcn.com/blocks

[Base UI Documentation](/docs/changelog) 

Building Blocks for the Web
===========================

Clean, modern building blocks. Copy and paste into your apps. Works with all React frameworks. Open Source. Free forever.

[Browse Blocks](#blocks)[Add a block](/docs/blocks)

[Featured](/blocks)[Sidebar](/blocks/sidebar)[Login](/blocks/login)[Signup](/blocks/signup)[OTP](/blocks/otp)[Calendar](/blocks/calendar)

[Browse all blocks](/blocks/sidebar)

PreviewCode

[A dashboard with sidebar, charts and data table](#dashboard-01)

[Open in New Tab](/view/new-york-v4/dashboard-01 "Open in New Tab")Refresh Preview

npx shadcn add dashboard-01[Open in](https://v0.dev/chat/api/open?url=https://ui.shadcn.com/r/styles/new-york-v4/dashboard-01.json)

app/dashboard/page.tsx

```
import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import data from "./data.json"

export default function Page() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
```

A dashboard with sidebar, charts and data table.

dashboard-01

![dashboard-01](/_next/image?url=%2Fr%2Fstyles%2Fnew-york-v4%2Fdashboard-01-light.png&w=3840&q=75&dpl=dpl_8vJR8o1uj1zMAzvp71J6ADL1bovV)![dashboard-01](/_next/image?url=%2Fr%2Fstyles%2Fnew-york-v4%2Fdashboard-01-dark.png&w=3840&q=75&dpl=dpl_8vJR8o1uj1zMAzvp71J6ADL1bovV)

PreviewCode

[A sidebar that collapses to icons](#sidebar-07)

[Open in New Tab](/view/new-york-v4/sidebar-07 "Open in New Tab")Refresh Preview

npx shadcn add sidebar-07[Open in](https://v0.dev/chat/api/open?url=https://ui.shadcn.com/r/styles/new-york-v4/sidebar-07.json)

app/dashboard/page.tsx

```
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div>
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
```

A sidebar that collapses to icons.

sidebar-07

![sidebar-07](/_next/image?url=%2Fr%2Fstyles%2Fnew-york-v4%2Fsidebar-07-light.png&w=3840&q=75&dpl=dpl_8vJR8o1uj1zMAzvp71J6ADL1bovV)![sidebar-07](/_next/image?url=%2Fr%2Fstyles%2Fnew-york-v4%2Fsidebar-07-dark.png&w=3840&q=75&dpl=dpl_8vJR8o1uj1zMAzvp71J6ADL1bovV)

PreviewCode

[A sidebar with submenus](#sidebar-03)

[Open in New Tab](/view/new-york-v4/sidebar-03 "Open in New Tab")Refresh Preview

npx shadcn add sidebar-03[Open in](https://v0.dev/chat/api/open?url=https://ui.shadcn.com/r/styles/new-york-v4/sidebar-03.json)

app/dashboard/page.tsx

```
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div>
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
```

A sidebar with submenus.

sidebar-03

![sidebar-03](/_next/image?url=%2Fr%2Fstyles%2Fnew-york-v4%2Fsidebar-03-light.png&w=3840&q=75&dpl=dpl_8vJR8o1uj1zMAzvp71J6ADL1bovV)![sidebar-03](/_next/image?url=%2Fr%2Fstyles%2Fnew-york-v4%2Fsidebar-03-dark.png&w=3840&q=75&dpl=dpl_8vJR8o1uj1zMAzvp71J6ADL1bovV)

PreviewCode

[A login page with a muted background color](#login-03)

[Open in New Tab](/view/new-york-v4/login-03 "Open in New Tab")Refresh Preview

npx shadcn add login-03[Open in](https://v0.dev/chat/api/open?url=https://ui.shadcn.com/r/styles/new-york-v4/login-03.json)

app/login/page.tsx

```
import { GalleryVerticalEnd } from "lucide-react"

import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Acme Inc.
        </a>
        <LoginForm />
      </div>
    </div>
  )
}
```

A login page with a muted background color.

login-03

![login-03](/_next/image?url=%2Fr%2Fstyles%2Fnew-york-v4%2Flogin-03-light.png&w=3840&q=75&dpl=dpl_8vJR8o1uj1zMAzvp71J6ADL1bovV)![login-03](/_next/image?url=%2Fr%2Fstyles%2Fnew-york-v4%2Flogin-03-dark.png&w=3840&q=75&dpl=dpl_8vJR8o1uj1zMAzvp71J6ADL1bovV)

PreviewCode

[A login page with form and image](#login-04)

[Open in New Tab](/view/new-york-v4/login-04 "Open in New Tab")Refresh Preview

npx shadcn add login-04[Open in](https://v0.dev/chat/api/open?url=https://ui.shadcn.com/r/styles/new-york-v4/login-04.json)

app/login/page.tsx

```
import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <LoginForm />
      </div>
    </div>
  )
}
```

A login page with form and image.

login-04

![login-04](/_next/image?url=%2Fr%2Fstyles%2Fnew-york-v4%2Flogin-04-light.png&w=3840&q=75&dpl=dpl_8vJR8o1uj1zMAzvp71J6ADL1bovV)![login-04](/_next/image?url=%2Fr%2Fstyles%2Fnew-york-v4%2Flogin-04-dark.png&w=3840&q=75&dpl=dpl_8vJR8o1uj1zMAzvp71J6ADL1bovV)

[Browse more blocks](/blocks/sidebar)