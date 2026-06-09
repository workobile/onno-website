import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { siteSettings } from "./schemas/siteSettings";
import { homePage } from "./schemas/homePage";
import { workPage } from "./schemas/workPage";
import { project } from "./schemas/project";
import { servicesPage } from "./schemas/servicesPage";
import { service } from "./schemas/service";
import { aboutPage } from "./schemas/aboutPage";
import { contactPage } from "./schemas/contactPage";
import { impressumPage } from "./schemas/impressumPage";

const singletonTypes = new Set([
  "siteSettings",
  "homePage",
  "workPage",
  "servicesPage",
  "aboutPage",
  "contactPage",
  "impressumPage",
]);

export default defineConfig({
  name: "default",
  title: "Onno Stage Designer",

  projectId: "rcecmbgj",
  dataset: "production",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // Singleton: Site Settings
            S.listItem()
              .title("Site Settings")
              .id("siteSettings")
              .child(
                S.document().schemaType("siteSettings").documentId("siteSettings")
              ),

            S.divider(),

            // Singleton: Pages
            S.listItem()
              .title("Home Page")
              .id("homePage")
              .child(
                S.document().schemaType("homePage").documentId("homePage")
              ),
            S.listItem()
              .title("Work Page")
              .id("workPage")
              .child(
                S.document().schemaType("workPage").documentId("workPage")
              ),
            S.listItem()
              .title("Services Page")
              .id("servicesPage")
              .child(
                S.document().schemaType("servicesPage").documentId("servicesPage")
              ),
            S.listItem()
              .title("About Page")
              .id("aboutPage")
              .child(
                S.document().schemaType("aboutPage").documentId("aboutPage")
              ),
            S.listItem()
              .title("Contact Page")
              .id("contactPage")
              .child(
                S.document().schemaType("contactPage").documentId("contactPage")
              ),
            S.listItem()
              .title("Impressum")
              .id("impressumPage")
              .child(
                S.document().schemaType("impressumPage").documentId("impressumPage")
              ),

            S.divider(),

            // Collections
            S.documentTypeListItem("project").title("Projects"),
            S.documentTypeListItem("service").title("Services"),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: [
      siteSettings,
      homePage,
      workPage,
      project,
      servicesPage,
      service,
      aboutPage,
      contactPage,
      impressumPage,
    ],
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) =>
            action ? ["publish", "discardChanges", "restore"].includes(action) : false
          )
        : input,
  },
});
