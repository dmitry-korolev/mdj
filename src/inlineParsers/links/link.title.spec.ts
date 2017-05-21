// import { expect } from 'chai'
// import { MDJ } from 'core/MDJ'
//
// const { parse } = MDJ()
//
// const singleQuotes = '[single quotes](http://example.com \'Title\')'
// const doubleQuotes = '[double quotes](http://example.com "Title")'
// const singleQuotesBlank = '[single quotes blank](http://example.com \'\')'
// const doubleQuotesBlank = '[double quotes blank](http://example.com "")'
// const image = '[![MD Logo](http://parsedown.org/md.png)](http://example.com)'
// const imageAndText = '[![MD Logo](http://parsedown.org/md.png) and text](http://example.com)'
//
// describe('Auto links', () => {
//   it('inline link', () => {
//     expect(parse(inlineLink)).to.eql([
//       {
//         "type": "paragraph",
//         "children": [
//           {
//             "type": "link",
//             "href": "http://example.com",
//             "children": [
//               {
//                 "type": "text",
//                 "value": "link"
//               }
//             ]
//           }
//         ]
//       }
//     ])
//   })
// })
