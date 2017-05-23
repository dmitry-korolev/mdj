import { expect } from 'chai'
import { MDJ } from 'core/MDJ'

const { parse } = MDJ()

const compound =
  `> header
> ------
>
> paragraph
>
> - li
>
> ---
>
> paragraph`

const lazy =
  `> quote
the rest of it

> another paragraph
the rest of it`

const simple =
  `> quote

indented:
   > quote

no space after \`>\`:
>quote`

describe('Blockquotes', () => {
  it('compound', () => {
    expect(parse(compound)).to.eql([
      {
        type: 'blockquote',
        children: [
          {
            type: 'heading',
            level: 2,
            children: [
              {
                type: 'text',
                value: 'header'
              }
            ]
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                value: 'paragraph '
              }
            ]
          },
          {
            type: 'list',
            ordered: false,
            start: null,
            children: [
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    value: 'li '
                  }
                ]
              }
            ]
          },
          {
            type: 'hr'
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                value: 'paragraph'
              }
            ]
          }
        ]
      }
    ])
  })

  it('lazy blockquote', () => {
    expect(parse(lazy)).to.eql([
      {
        type: 'blockquote',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                value: 'quote'
              },
              {
                type: 'br'
              },
              {
                type: 'text',
                value: 'the rest of it '
              }
            ]
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                value: 'another paragraph'
              },
              {
                type: 'br'
              },
              {
                type: 'text',
                value: 'the rest of it'
              }
            ]
          }
        ]
      }
    ])
  })

  it('simple blockquote', () => {
    expect(parse(simple)).to.eql([
      {
        type: 'blockquote',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                value: 'quote '
              }
            ]
          }
        ]
      },
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            value: 'indented:'
          }
        ]
      },
      {
        type: 'blockquote',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                value: 'quote '
              }
            ]
          }
        ]
      },
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            value: 'no space after '
          },
          {
            type: 'code',
            value: '>'
          },
          {
            type: 'text',
            value: ':'
          }
        ]
      },
      {
        type: 'blockquote',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                value: 'quote'
              }
            ]
          }
        ]
      }
    ])
  })
})
