# <%= project.name %> <%= //  "V" + project.version %>

<%= project.description %>
<% if (header) { -%>

<%- header %>
<% } -%>

# Endpoints

<% data.forEach(group => { -%>
- [<%= group.name %>](#<%= toLink(group.name) -%>)
<% group.subs.forEach(sub => { -%>
  - [<%= sub.title %>](#<%= toLink(group.name) -%>##<%= toLink(sub.title) %>)
<% })}) -%>

<% if (prepend) { -%>
<%- prepend %>
<% } -%>
<% data.forEach(group => { -%>
___
# <a name='<%= toLink(group.name) %>'></a> <%= group.name %>
<% group.subs.forEach(sub => { -%>
___
## <a name='<%= toLink(sub.title) %>'></a> <%= sub.title %>

<%- sub.description ? `${sub.description}\n\n` : '' -%>
```http
<%- sub.type.toUpperCase() %> <%= sub.url %>
```
<% if (sub.header && sub.header.fields) { -%>
<% Object.entries(sub.header.fields).forEach(([headersGroup, headersGroupContent]) => { -%>

> ### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
<% headersGroupContent.forEach(header => { -%>
| <%- header.field %> | <%- header.type ? `\`${header.type}\`` : '' %> | <%- header.optional ? '**optional**' : '' %><%- header.description %> |
<% }) // foreach parameter -%>
<% }) // foreach header fields -%>
<% } // if parameters -%>
<% if (sub.header && sub.header.examples && sub.header.examples.length) { -%>

__examples :__

<% sub.header.examples.forEach(example => { -%>
<%= example.title %>

```<%= example.type %>
<%- example.content %>
```
<% }) // foreach example -%>
<% } // if example -%>
<% if (sub.parameter && sub.parameter.fields) { -%>
<% Object.entries(sub.parameter.fields).forEach(([parametersGroup, parametersGroupContent]) => { -%>

> ### Parameters

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
<% parametersGroupContent.forEach(param => { -%>
| <%- param.field -%> | <%- param.type ? `\`${param.type}\`` : '' %> | <%- param.optional ? '**optional** ' : '' -%><%- param.description -%>
<% if (param.defaultValue) { -%>
_Default value: <%= param.defaultValue %>_<br><% } -%>
<% if (param.size) { -%>
_Size range: <%- param.size %>_<br><% } -%>
<% if (param.allowedValues) { -%>
_Allowed values: <%- param.allowedValues %>_<% } -%> |
<% }) // foreach parameters -%>
<% }) // foreach param parameter -%>
<% } // if parameters -%>
<% if (sub.query) { -%>

> ### Queries

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
<% sub.query.forEach(query => { -%>
| <%- query.field -%> | <%- query.type ? `\`${query.type}\`` : '' %> | <%- query.optional ? '**optional** ' : '' -%><%- query.description -%>
<% if (query.defaultValue) { -%>
_Default value: <%= query.defaultValue %>_<br><% } -%>
<% if (query.size) { -%>
_Size range: <%- query.size %>_<br><% } -%>
<% if (query.allowedValues) { -%>
_Allowed values: <%- query.allowedValues %>_<% } -%> |
<% }) // foreach query -%>
<% } // if query -%>
<% if (sub.body) { -%>

> ### Request Body 

<% if (['string','number','boolean'].includes(sub.body[0].type.toLowerCase())) { -%>
The request body must be in `JSON` format
__example :__ 
```javascript
{
<% sub.body.forEach(body => { -%>
	"<%- body.field -%>" : <%- (body.type.toLowerCase() == 'number')? Math.floor(Math.random()*1000) : '"'+body.field.toUpperCase()+'"' -%>,
<% }) // foreach body-%>
}
```
<% } else { -%>
The request body must be in `FormData` format
<% } -%>

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
<% sub.body.forEach(body => { -%>
| <%- body.field -%> | <%- body.type ? `\`${body.type}\`` : '' %> | <%- body.optional ? '**optional** ' : '' -%><%- body.description -%>
<% if (body.defaultValue) { -%>
_Default value: <%= body.defaultValue %>_<br><% } -%>
<% if (body.size) { -%>
_Size range: <%- body.size %>_<br><% } -%>
<% if (body.allowedValues) { -%>
_Allowed values: <%- body.allowedValues %>_<% } -%> |
<% }) // foreach body -%>

<% } // if body -%>
<% if (sub.examples && sub.examples.length) { -%>

__Examples :__

<% sub.examples.forEach(example => { -%>
<%= example.title %>

```<%= example.type %>
<%- example.content %>
```

<% }) // foreach example -%>
<% } // if example -%>
<% if (sub.parameter && sub.parameter.examples && sub.parameter.examples.length) { -%>

__examples :__

<% sub.parameter.examples.forEach(exampleParam => { -%>
`<%= exampleParam.type %>` - <%= exampleParam.title %>

```<%= exampleParam.type %>
<%- exampleParam.content %>
```
<% }) // foreach exampleParam -%>
<% } // if exampleParam -%>
<% if (sub.success && sub.success.fields) { -%>
> ### Success response 

<% Object.entries(sub.success.fields).forEach(([responsesGroup, responsesGroupContent]) => { -%>

##### `<%= responsesGroup %>`


<% if (sub.success && sub.success.examples && sub.success.examples.length) { -%>
The expect response is in `JSON` format and may look like this :
__example :__
<% sub.success.examples.forEach(example => { -%>

```<%= example.type %>
<%- example.content %>
```
<% }) // foreach success example -%>
<% } // if success.examples -%>


| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
<% responsesGroupContent.forEach(param => { -%>
| <%- param.field %> | <%- param.type ? `\`${param.type}\`` : '' %> | <%- param.optional ? '**optional**' : '' %><%- param.description -%>
<% if (param.defaultValue) { -%>
_Default value: <%- param.defaultValue %>_<br><% } -%>
<% if (param.size) { -%>
_Size range: <%- param.size -%>_<br><% } -%>
<% if (param.allowedValues) { -%>
_Allowed values: <%- param.allowedValues %>_<% } -%> |
<% }) // foreach reponses -%>
<% }) // foreach field -%>
<% } // if success.fields -%>

<% if (sub.error && sub.error.fields) { -%>

> ### Error response 

<% Object.entries(sub.error.fields).forEach(([errorsGroup, errorsGroupContent]) => { -%>

##### `<%= errorsGroup %>`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
<% errorsGroupContent.forEach(param => { -%>
| <%- param.field %> | <%- param.type ? `\`${param.type}\`` : '' %> | <%- param.optional ? '**optional**' : '' %><%- param.description -%>
<% if (param.defaultValue) { -%>
_Default value: <%- param.defaultValue %>_<br><% } -%>
<% if (param.size) { -%>
_Size range: <%- param.size -%>_<br><% } -%>
<% if (param.allowedValues) { -%>
_Allowed values: <%- param.allowedValues %>_<% } -%> |
<% }) // foreach errors -%>
<% }) // foreach field -%>
<% } // if error.fields -%>
<% if (sub.error && sub.error.examples && sub.error.examples.length) { -%>

### Error response example
<% sub.error.examples.forEach(example => { -%>

##### `<%= example.title %>`

```<%= example.type %>
<%- example.content %>
```
<% }) // foreach error example -%>
<% } // if error.examples -%>
<% }) // foreach sub -%>
<% }) // foreach group -%>

<% if (footer) { -%>
<%- footer %>
<% } -%>
