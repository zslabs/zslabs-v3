import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import { visit } from 'unist-util-visit'

function rehypeMetaAsAttributes() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'code' && node.data && node.data.meta) {
        // eslint-disable-next-line no-param-reassign
        node.properties.meta = node.data.meta
      }
    })
  }
}

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: '**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    date: {
      type: 'date',
      description: 'The date of the post',
      required: true,
    },
    excerpt: {
      type: 'string',
      description: 'The excerpt of the post',
      required: false,
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (post) => `/articles/${post._raw.flattenedPath}`,
    },
  },
}))

export default makeSource({
  contentDirPath: 'articles',
  documentTypes: [Post],
  mdx: { rehypePlugins: [rehypeMetaAsAttributes] },
})
