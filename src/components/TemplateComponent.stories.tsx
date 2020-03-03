import * as React from 'react'
import TemplateComponent from './TemplateComponent'
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, object } from '@storybook/addon-knobs';

export default {
    component: TemplateComponent,
    title: 'Basics',
    decorators: [withKnobs({
        escapeHTML: false
    })]
}

const templateKnob = (defaultText: string) => text("template", defaultText);

export const allOptions = () => <TemplateComponent
    template={templateKnob("This is a simple text, with data: {{test}}")}
    sanitize={boolean("sanitize", true)}
    sanitizeOptions={object("sanitizeOptions", {})}
    className={text("className", "")}
    data={object("data", { test: "testData" })}
/>

export const basicDiv = () => <TemplateComponent template={templateKnob("div text")} />
export const basicSpan = () => <TemplateComponent type="span" template={templateKnob("span text")} />
export const unsanitizedXSS = () => <TemplateComponent sanitize={boolean("sanitize", false)} template={templateKnob("This should produce an XSS when not properly sanitized! <img src=x onerror=alert(1)//>")} />
export const onClick = () => <TemplateComponent template="click me, see Actions tab" onClick={action("onClick")} />
export const onDblClick = () => <TemplateComponent template="double click me, see Actions tab" onDblClick={action("onDblClick")} />
