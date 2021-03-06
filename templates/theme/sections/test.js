const sectionCategoryKeys = require("../../page_data/section_category_keys");
const pageKeys = require("../../page_data/page_keys");

const schema = {
  name: "slider2",
  presets: [
    {
      name: "Slider 2",
      category: sectionCategoryKeys.IMAGES,
    },
  ],
  settings: [
    {
      type: "checkbox",
      id: "enabled",
      label: "reggeweegewewee!?",
      default: false,
      data: `{{ section.settings.enabled }}`,
    },
  ],
  blocks: [
    {
      type: "slide",
      name: "Slide",
      settings: [
        {
          id: "title",
          type: "text",
          label: "Title",
          data: `
            "{{block.settings.title | escape}}"
          `,
        },
        {
          id: "dingo",
          type: "textarea",
          label: "Big text",
          data: `
            "{{block.settings.dingo | escape}}"
          `,
        },
        {
          id: "image",
          type: "image_picker",
          label: "Image",
          data: `
            "{{block.settings.image | img_url:'400x400', crop:'center' }}"
          `,
        },
      ],
    },
    {
      type: "bing",
      name: "Bing",
      settings: [
        {
          id: "image2",
          type: "image_picker",
          label: "Image",
          data: `
            "{{block.settings.image2 | img_url:'master'}}"
          `,
        },
      ],
    },
  ],
};

module.exports = schema;
