export const impressumPage = {
  name: "impressumPage",
  title: "Impressum",
  type: "document",
  __experimental_actions: ["update", "publish"],
  fields: [
    {
      name: "heading",
      title: "Page Heading",
      type: "string",
      initialValue: "Impressum",
    },

    // Legal entity
    {
      name: "companyName",
      title: "Name / Company Name",
      type: "string",
    },
    {
      name: "address",
      title: "Address",
      description: "Street, house number, city, postal code, country — each on its own line.",
      type: "text",
      rows: 4,
    },

    // Contact
    {
      name: "contactHeading",
      title: "Contact Section Heading",
      type: "string",
      initialValue: "Contact",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "phone",
      title: "Phone",
      type: "string",
    },

    // Legal info
    {
      name: "legalHeading",
      title: "Legal Information Section Heading",
      type: "string",
      initialValue: "Legal Information",
    },
    {
      name: "legalForm",
      title: "Legal Form",
      description: "E.g. Freelancer, Sole Trader, GmbH, BV, Ltd.",
      type: "string",
    },
    {
      name: "vatNumber",
      title: "VAT / Tax Number",
      type: "string",
    },
    {
      name: "registerEntry",
      title: "Trade Register Entry",
      description: "E.g. 'Registered in the Commercial Register of Amsterdam, No. 12345678'",
      type: "string",
    },
    {
      name: "responsiblePerson",
      title: "Responsible for Content",
      description: "Name of the person legally responsible for the website content.",
      type: "string",
    },

    // Extra sections — client can add custom blocks
    {
      name: "sections",
      title: "Additional Sections",
      description: "Add any extra legal sections (e.g. Disclaimer, Copyright, Privacy Note).",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "heading", title: "Section Heading", type: "string" },
            { name: "body",    title: "Section Text",    type: "text", rows: 6 },
          ],
          preview: { select: { title: "heading" } },
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return { title: "Impressum" };
    },
  },
};
