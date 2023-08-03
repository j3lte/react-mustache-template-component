/* eslint-disable import/no-extraneous-dependencies */
import React from "react";

import { Story } from "@storybook/react";

import TemplateComponent from ".";
import type { TemplateComponentProps } from ".";

export default {
  title: "TemplateComponent",
  argTypes: {
    onClick: { action: "onClick" },
    onDoubleClick: { action: "onDoubleClick" },
  },
};

const ComponentStory: Story<TemplateComponentProps> = (args) => (
  <TemplateComponent {...args} />
);
const createStory = (args: TemplateComponentProps) => {
  const story = ComponentStory.bind({});
  story.args = args;
  return story;
};

export const AllOptions = createStory({
  template: "This is a simple text, with data: {{test}}",
  sanitize: true,
  sanitizeOptions: {},
  className: "",
  data: { test: "testData" },
});

export const BasicDiv = createStory({
  template: "div text",
});

export const BasicSpan = createStory({
  type: "span",
  template: "span text",
});

export const UnsanitizedXSS = createStory({
  template:
    "This should produce an XSS when not properly sanitized! <img src=x onerror=alert(1)//>",
  sanitize: false,
});

export const OnClick = createStory({
  template: "click me (single or double), see Actions tab",
});
