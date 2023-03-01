/* eslint-disable react/no-danger */
import React, { FunctionComponent, memo, useMemo, HTMLAttributes } from "react";

import dompurify, { Config } from "dompurify";
import Mustache from "mustache";

export type ComponentType = "div" | "span";

export interface TemplateComponentProps extends HTMLAttributes<HTMLElement> {
  template: string;
  sanitize?: boolean;
  sanitizeOptions?: Config;
  data?: object;
  type?: ComponentType;
}

const TemplateComponentInternal: FunctionComponent<TemplateComponentProps> = ({
  template,
  sanitize,
  sanitizeOptions,
  data,
  type,
  ...args
}) => {
  try {
    const sanitizer = dompurify.sanitize;
    const compiled = useMemo(
      () =>
        typeof template === "string" ? Mustache.render(template, data) : null,
      [template, data],
    );
    const shouldSanitize = typeof sanitize === "boolean" ? sanitize : true;

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

    if (type && type === "span") {
      return <span {...htmlOpts} />;
    }

    return <div {...htmlOpts} />;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return null;
  }
};

const TemplateComponent = memo(TemplateComponentInternal);

export default TemplateComponent;
