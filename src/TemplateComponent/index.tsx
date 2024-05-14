import {
  FunctionComponent,
  memo,
  useMemo,
  HTMLAttributes,
  JSXElementConstructor,
  createElement,
  forwardRef,
} from "react";

import dompurify, { Config } from "dompurify";
import Mustache from "mustache";

export type ComponentType =
  | keyof JSX.IntrinsicElements
  | JSXElementConstructor<any>;

export interface TemplateComponentProps extends HTMLAttributes<HTMLElement> {
  /**
   * The template to render
   *
   * Mustache [template string](https://github.com/janl/mustache.js) that is used in your template component
   *
   * @type {string}
   * @memberof TemplateComponentProps
   */
  template: string;
  /**
   * Whether to sanitize the template (default: true)
   *
   * @type {boolean}
   * @memberof TemplateComponentProps
   * @default true
   */
  sanitize?: boolean;
  /**
   * Options to pass to the sanitizer (default: undefined)
   *
   * See [Options](https://github.com/cure53/DOMPurify#can-i-configure-dompurify) for more information
   *
   * @type {Config}
   * @see https://github.com/cure53/DOMPurify#can-i-configure-dompurify
   * @memberof TemplateComponentProps
   * @default undefined
   */
  sanitizeOptions?: Config;
  /**
   * The data to pass to the template (default: {})
   *
   * @type {object}
   * @memberof TemplateComponentProps
   * @default {}
   * @example
   * <TemplateComponent template="Hello {{name}}" data={{ name: "World" }} />
   */
  data?: object;
  /**
   * The type of element to render, can be any HTML element tag, like 'div', 'span', 'i' etc (default: "div")
   *
   * @type {ComponentType}
   * @memberof TemplateComponentProps
   * @default "div"
   * @example
   * <TemplateComponent template="Hello World" type="span" />
   */
  type?: ComponentType;
}

const TemplateComponentInternal: FunctionComponent<TemplateComponentProps> =
  forwardRef<ComponentType, TemplateComponentProps>(
    ({ template, sanitize, sanitizeOptions, data, type, ...args }, ref) => {
      const sanitizer = dompurify.sanitize;
      const shouldSanitize = typeof sanitize === "boolean" ? sanitize : true;
      const innerType = type || "div";

      const compiled = useMemo(() => {
        if (typeof template === "string") {
          try {
            return Mustache.render(template, data);
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
            return null;
          }
        }
        return null;
      }, [template, data]);

      const html = useMemo(() => {
        if (compiled === null) {
          return null;
        }
        try {
          return (
            shouldSanitize
              ? typeof sanitizeOptions !== "undefined"
                ? sanitizer(compiled, sanitizeOptions)
                : sanitizer(compiled)
              : compiled
          ) as string;
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error);
          return null;
        }
      }, [compiled]);

      const htmlOpts = useMemo(
        () =>
          html
            ? {
                ...args,
                dangerouslySetInnerHTML: { __html: html },
              }
            : args,
        [html],
      );

      if (!html) {
        return null;
      }

      return createElement(innerType, { ...htmlOpts, ref }, null);
    },
  );

TemplateComponentInternal.defaultProps = {
  sanitize: true,
  sanitizeOptions: undefined,
  data: {},
  type: "div",
};

TemplateComponentInternal.displayName = "TemplateComponentInternal";

const TemplateComponent = memo(TemplateComponentInternal);

TemplateComponent.displayName = "TemplateComponent";

export default TemplateComponent;
