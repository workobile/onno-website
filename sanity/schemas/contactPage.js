export const contactPage = {
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  __experimental_actions: ["update", "publish"],
  fields: [
    {
      name: "heading",
      title: "Page Heading",
      type: "string",
      initialValue: "Contact",
    },
    {
      name: "introText",
      title: "Introduction Text",
      type: "text",
      rows: 3,
      initialValue: "Let's collaborate on your next production. Available for theatrical design projects worldwide.",
    },
    {
      name: "formHeadline",
      title: "Form Headline",
      type: "string",
      initialValue: "Send a Message",
    },
    {
      name: "submitLabel",
      title: "Submit Button Label",
      type: "string",
      initialValue: "Send Message",
    },
    {
      name: "ctaHeading",
      title: "Home Page CTA Heading",
      description: "Large heading shown in the 'Let's Collaborate' section on the home page.",
      type: "string",
      initialValue: "Let's Collaborate",
    },
    {
      name: "ctaText",
      title: "Home Page CTA Subtext",
      description: "Subtitle shown below the CTA heading on the home page.",
      type: "string",
      initialValue: "Available for theatrical design projects worldwide",
    },
  ],
  preview: {
    prepare() {
      return { title: "Contact Page" };
    },
  },
};
