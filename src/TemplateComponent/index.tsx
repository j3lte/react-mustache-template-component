/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-danger */
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
import PropTypes from "prop-types";

export type ComponentType =
  | keyof JSX.IntrinsicElements
  | JSXElementConstructor<any>;

export interface TemplateComponentProps extends HTMLAttributes<HTMLElement> {
  template: string;
  sanitize?: boolean;
  sanitizeOptions?: Config;
  data?: object;
  type?: ComponentType;
}

const TemplateComponentInternal: FunctionComponent<TemplateComponentProps> =
  forwardRef(
    ({ template, sanitize, sanitizeOptions, data, type, ...args }, ref) => {
      try {
        const sanitizer = dompurify.sanitize;
        const compiled = useMemo(
          () =>
            typeof template === "string"
              ? Mustache.render(template, data)
              : null,
          [template, data],
        );
        const shouldSanitize = typeof sanitize === "boolean" ? sanitize : true;
        const innerType = type || "div";

        if (compiled === null) {
          return null;
        }

        const html = (
          shouldSanitize
            ? typeof sanitizeOptions !== "undefined"
              ? sanitizer(compiled, sanitizeOptions)
              : sanitizer(compiled)
            : compiled
        ) as string;

        const htmlOpts = useMemo(
          () => ({
            ...args,
            dangerouslySetInnerHTML: { __html: html },
          }),
          [html],
        );

        return createElement(innerType, { ...htmlOpts, ref }, null);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        return null;
      }
    },
  );

TemplateComponentInternal.propTypes = {
  template: PropTypes.string.isRequired,
  sanitize: PropTypes.bool,
  sanitizeOptions: PropTypes.object,
  data: PropTypes.object,
  // @ts-ignore
  type: PropTypes.string,
};

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
