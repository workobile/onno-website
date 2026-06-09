export const siteSettings = {
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    {
      name: "email",
      title: "Contact Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    },
    {
      name: "instagram",
      title: "Instagram Handle",
      description: "Without the @ symbol",
      type: "string",
    },
    {
      name: "youtube",
      title: "YouTube Channel URL",
      type: "url",
    },
    {
      name: "linkedin",
      title: "LinkedIn URL",
      type: "url",
    },
    {
      name: "phone",
      title: "Phone Number",
      type: "string",
    },
    {
      name: "location",
      title: "Location / City",
      type: "string",
    },
    {
      name: "footerTagline",
      title: "Footer Tagline",
      type: "string",
    },
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
};
