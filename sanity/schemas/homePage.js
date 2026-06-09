export const homePage = {
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    {
      name: "heading",
      title: "Hero Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "tagline",
      title: "Tagline",
      type: "string",
    },
    {
      name: "heroImage",
      title: "Hero / Portrait Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "ctaLabel",
      title: "CTA Button Label",
      type: "string",
      initialValue: "View My Work",
    },
    {
      name: "stats",
      title: "Stats (Home page counters)",
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
  ],
  preview: {
    prepare() {
      return { title: "Home Page" };
    },
  },
};
