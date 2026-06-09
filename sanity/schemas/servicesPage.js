export const servicesPage = {
  name: "servicesPage",
  title: "Services Page",
  type: "document",
  fields: [
    {
      name: "heading",
      title: "Page Heading",
      type: "string",
      initialValue: "Services",
    },
    {
      name: "introText",
      title: "Introduction Text",
      type: "text",
      rows: 3,
    },
  ],
  preview: {
    prepare() {
      return { title: "Services Page" };
    },
  },
};
