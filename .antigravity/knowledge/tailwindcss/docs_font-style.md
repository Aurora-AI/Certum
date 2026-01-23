# https://tailwindcss.com/docs/font-style

| Class | Styles |
| --- | --- |
| `italic` | `font-style: italic;` |
| `not-italic` | `font-style: normal;` |

[Examples](#examples)
---------------------

### [Italicizing text](#italicizing-text)

Use the `italic` utility to make text italic:

The quick brown fox jumps over the lazy dog.

```
<p class="italic ...">The quick brown fox ...</p>
```

### [Displaying text normally](#displaying-text-normally)

Use the `not-italic` utility to display text normally:

The quick brown fox jumps over the lazy dog.

```
<p class="not-italic ...">The quick brown fox ...</p>
```

### [Responsive design](#responsive-design)

Prefix a `font-style` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above:

```
<p class="italic md:not-italic ...">  Lorem ipsum dolor sit amet...</p>
```

Learn more about using variants in the [variants documentation](/docs/hover-focus-and-other-states).