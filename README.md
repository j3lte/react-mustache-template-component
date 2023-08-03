[![npm](https://img.shields.io/npm/v/react-mustache-template-component?label=NPM&logo=npm&style=flat-square)](https://www.npmjs.com/package/react-mustache-template-component)
[![License](https://img.shields.io/github/license/j3lte/react-mustache-template-component?color=%2344cc10&label=License&logo=github&style=flat-square)](https://github.com/j3lte/react-mustache-template-component/blob/main/LICENSE)
[![GitHub Bugs](https://img.shields.io/github/issues-search/j3lte/react-mustache-template-component?label=Bugs&logo=github&query=is%3Aopen%20label%3Abug&style=flat-square)](https://github.com/j3lte/react-mustache-template-component/issues)
[![GitHub issues](https://img.shields.io/github/issues/j3lte/react-mustache-template-component?label=Issues&style=flat-square)](https://github.com/j3lte/react-mustache-template-component/issues)
[![GitHub last commit](https://img.shields.io/github/last-commit/j3lte/react-mustache-template-component?label=Last%20Commit&logo=github&style=flat-square)](https://github.com/j3lte/react-mustache-template-component/commits/main)
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/j3lte/react-mustache-template-component/ci.yml?label=Build%20status&logo=github&style=flat-square)](https://github.com/j3lte/react-mustache-template-component/actions/workflows/ci.yml)
[![Codecov](https://img.shields.io/codecov/c/github/j3lte/react-mustache-template-component?label=Code%20Coverage&logo=codecov&style=flat-square&token=JZUQJXMB4C)](https://codecov.io/gh/j3lte/react-mustache-template-component)
![npm type definitions](https://img.shields.io/npm/types/react-mustache-template-component?style=flat-square)
[![DeepScan grade](https://flat.badgen.net/deepscan/grade/team/20288/project/24005/branch/735054?icon=deepscan&label=Deepscan)](https://deepscan.io/dashboard#view=project&tid=20288&pid=24005&bid=735054)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/j3lte/react-mustache-template-component/issues)
![Known Vulnerabilities](https://snyk.io/test/github/j3lte/react-mustache-template-component/badge.svg)
[![Bundlephobia](https://img.shields.io/bundlephobia/min/react-mustache-template-component?label=Size&style=flat-square)](https://bundlephobia.com/package/react-mustache-template-component@latest)


# React Mustache Template Component

The Template component that uses [Mustache.js](https://www.npmjs.com/package/mustache) to render the a component, sanitized by [dompurify](https://www.npmjs.com/package/dompurify).

## Demo

See [Storybook](https://j3lte.github.io/react-mustache-template-component/)

## Installation and Usage

```
$ npm install react-mustache-template-component
```

The use it in your app:

```js
import TemplateComponent from 'react-mustache-template-component'

...
const template = `<img class="img" src="{{url}}" />`;
const data = { url: 'http://example.com/img' };

<TemplateComponent template={template} data={data} />
```

This will be rendered as

```html
<div><img class="img" src="http://example.com/img" /></div>
```

## Notes

- Input is properly sanitized by [dompurify](https://www.npmjs.com/package/dompurify). This can be switched off (`... sanitize={false} ...`) but is highly discouraged, as this might introduce XSS issues

## Props

Props that are used:

|Name|Required|Type|Default|Comments|
|---|---|---|---|---|
|**template**|Yes|string|-|Mustache [template string](https://github.com/janl/mustache.js) that is used in your template component|
|**data**|No|object|`{}`|Data used by Mustache to replace placeholders (marked by `{{}}`)|
|**type**|No|string|`"div"`|Type of container. Can be any HTMLElement, like `div`, `span`, `i` etc |
|**sanitize**|No|boolean|true|Sanitize the result using `dompurify`|
|**sanitizeOptions**|No|object|{}|Sanitation can be changed by [Dompurify.Config](https://www.npmjs.com/package/dompurify#can-i-configure-dompurify) options|

Besides these props, it can also use all basic HTML attributes, like `className`, `style`, `id`, etc.

## Development

To install dependencies
```
$ npm install
```

To build
```
$ npm run build
```

To run tests
```
$ npm run test
```

To run Storybook
```
$ npm run storybook
```

## License

MIT Licensed. Copyright (c) Jelte Lagendijk 2020.
