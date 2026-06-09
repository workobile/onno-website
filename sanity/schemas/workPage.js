export const workPage = {
  name: "workPage",
  title: "Work Page",
  type: "document",
  fields: [
    {
      name: "heading",
      title: "Page Heading",
      type: "string",
      initialValue: "Work",
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
      return { title: "Work Page" };
    },
  },
};
