import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import TemplateComponent from '../../index'
import { ReactElement } from 'react'

const getContainer = (element: ReactElement, showDebug = false): (ChildNode|null) => {
  const { container, debug } = render(element)
  if (showDebug) {
    debug();
  }
  return container.firstChild;
}

test('Renders basic content', async () => {
  const el = getContainer(<TemplateComponent template="Has text"/>);
  expect(el).toHaveTextContent("Has text");
});

test('Renders span', async () => {
  const el = getContainer(<TemplateComponent template="Has text" type="span" />) as HTMLElement;

  expect(el?.tagName).toEqual("SPAN")
  expect(el).toHaveTextContent("Has text");
});

test('Only accepts strings as template', async () => {
  // @ts-ignore
  const el = getContainer(<TemplateComponent template={{}} />);

  expect(el).toBeNull();
});

test('Renders elements', async () => {
  const el = getContainer(<TemplateComponent template={"<div class=\"test\">Has text</div>"}/>);
  const child = el?.firstChild;

  expect(child).toHaveTextContent("Has text");
  expect(child).toHaveClass("test");
});

test('Mustache data rendered', async () => {
  const el = getContainer(<TemplateComponent template={"Test {{x}}"} data={{ x: 123 }} />);

  expect(el).toHaveTextContent("Test 123");
})

test('Sanitizes elements', async () => {
  const el = getContainer(<TemplateComponent sanitizeOptions={{}} template={"<img class=\"test\" src=x onerror=alert(1) />"}/>);
  const child = el?.firstChild;

  expect(child).toHaveAttribute("src", "x");
  expect(child).not.toHaveAttribute("onerror");
});

test('Disable sanitize elements', async () => {
  const el = getContainer(<TemplateComponent sanitize={false} template={"<img class=\"test\" src=x onerror=alert(1) />"}/>);
  const child = el?.firstChild;

  expect(child).toHaveAttribute("src", "x");
  expect(child).toHaveAttribute("onerror");
});

test('Renders null when error', async () => {
  const originalError = console.error;
  const mocked = jest.fn()

  console.error = mocked;

  const el = getContainer(<TemplateComponent template="This doesn't work {{test" />);

  expect(el).toBeNull();
  expect(mocked).toHaveBeenCalled();

  console.error = originalError;
})
