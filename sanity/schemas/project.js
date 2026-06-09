export const project = {
  name: "project",
  title: "Projects",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "year",
      title: "Year",
      type: "string",
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      description: "Type any category name (e.g. 'Models', 'Set Design', 'Lighting'). The filter buttons on the website are built automatically from whatever categories exist.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "images",
      title: "Project Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    },
    {
      name: "description",
      title: "Short Description",
      type: "text",
      rows: 2,
    },
    {
      name: "longDescription",
      title: "Long Description",
      type: "text",
      rows: 6,
    },
    {
      name: "client",
      title: "Client",
      type: "string",
    },
    {
      name: "location",
      title: "Location",
      type: "string",
    },
    {
      name: "medium",
      title: "Medium / Materials",
      type: "string",
    },
    {
      name: "collaborators",
      title: "Collaborators",
      type: "string",
    },
    {
      name: "dimensions",
      title: "Dimensions / Scale",
      type: "string",
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    },
  ],
  orderings: [
    {
      title: "Year, Newest First",
      name: "yearDesc",
      by: [{ field: "year", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "year",
      media: "coverImage",
    },
  },
};
