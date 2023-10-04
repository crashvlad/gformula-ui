import { defineDocumentType, makeSource } from 'contentlayer/source-files';

import highlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields: any = {
  slug: {
    type: 'string',
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath.split('/').slice(1).join('/'),
  },
};

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `posts/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    author: {
      type: 'string',
      required: true,
    },
    authorImage: {
      type: 'string',
      required: false,
    },
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
    },
    date: {
      type: 'date',
      required: true,
    },
    imageUrl: {
      type: 'string',
      required: true,
    },
    category: {
      type: 'string',
      required: true,
    },
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: './content',
  documentTypes: [Post],
});
