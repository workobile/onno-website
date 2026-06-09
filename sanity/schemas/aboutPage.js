export const aboutPage = {
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    {
      name: "heading",
      title: "Page Heading",
      type: "string",
      initialValue: "About",
    },
    {
      name: "bio",
      title: "Biography",
      type: "text",
      rows: 8,
      description: "Main biographical text. Separate paragraphs with a blank line.",
    },
    {
      name: "stats",
      title: "Stats (About page counters)",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "number", title: "Number / Value", type: "string" },
          { name: "label",  title: "Label",          type: "string" },
        ],
        preview: { select: { title: "number", subtitle: "label" } },
      }],
    },
    {
      name: "portrait",
      title: "Portrait Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "experience",
      title: "Experience / Education",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "year", title: "Year / Period", type: "string" },
            { name: "title", title: "Role / Degree", type: "string" },
            { name: "company", title: "Company / Institution", type: "string" },
            { name: "location", title: "Location", type: "string" },
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "company",
            },
          },
        },
      ],
    },
    {
      name: "skills",
      title: "Skills",
      description: "Each item is one skill tag. Click 'Add item' to add more.",
      type: "array",
      of: [{ type: "string" }],
    },
  ],
  preview: {
    prepare() {
      return { title: "About Page" };
    },
  },
};
