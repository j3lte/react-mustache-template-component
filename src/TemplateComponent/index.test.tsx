/* eslint-disable no-console */
import React, { ReactElement } from "react";

import { render } from "@testing-library/react";

import TemplateComponent from ".";

const getContainer = (
  element: ReactElement,
  showDebug = false,
): ChildNode | null => {
  const { container, debug } = render(element);
  if (showDebug) {
    debug();
  }
  return container.firstChild;
};

describe("TemplateComponent", () => {
  it("Renders basic content", () => {
    const { container } = render(<TemplateComponent template="Has text" />);
    expect(container).toHaveTextContent("Has text");
  });

  it("Renders span", () => {
    const { container } = render(
      <TemplateComponent template="Has text" type="span" />,
    );

    expect(container.firstChild?.nodeName).toEqual("SPAN");
    expect(container).toHaveTextContent("Has text");
  });
  it("Renders i", () => {
    const { container } = render(
      <TemplateComponent template="Has text" type="i" />,
    );

    expect(container.firstChild?.nodeName).toEqual("I");
    expect(container).toHaveTextContent("Has text");
  });

  it("Only accepts strings as template", () => {
    // @ts-ignore
    const { container } = render(<TemplateComponent template={{}} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("Renders elements", () => {
    const { container } = render(
      <TemplateComponent template={'<div class="test">Has text</div>'} />,
    );
    const { firstChild: child } = container.firstChild;

    expect(child).toHaveTextContent("Has text");
    expect(child).toHaveClass("test");
  });

  it("Mustache data rendered", () => {
    const { container } = render(
      <TemplateComponent template="Test {{x}}" data={{ x: 123 }} />,
    );

    expect(container).toHaveTextContent("Test 123");
  });

  it("Sanitizes elements", () => {
    const { container } = render(
      <TemplateComponent
        sanitizeOptions={{}}
        template={'<img class="test" src=x onerror=alert(1) />'}
      />,
    );
    const { firstChild: child } = container.firstChild;

    expect(child).toHaveAttribute("src", "x");
    expect(child).not.toHaveAttribute("onerror");
  });

  it("Disable sanitize elements", () => {
    const { container } = render(
      <TemplateComponent
        sanitize={false}
        template={'<img class="test" src=x onerror=alert(1) />'}
      />,
    );
    const { firstChild: child } = container.firstChild;

    expect(child).toHaveAttribute("src", "x");
    expect(child).toHaveAttribute("onerror");
  });

  it("Renders null when error", () => {
    const originalError = console.error;
    const mocked = jest.fn();

    console.error = mocked;

    const el = getContainer(
      // @ts-ignore
      <TemplateComponent template="This doesn't work {{test" sanitize={1} />,
    );

    expect(el).toBeNull();
    expect(mocked).toHaveBeenCalledWith(expect.any(Error));

    console.error = originalError;
  });
});
