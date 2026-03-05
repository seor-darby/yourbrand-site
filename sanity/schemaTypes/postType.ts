import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'titleKo',
      title: '제목 (한국어)',
      type: 'string',
    }),
    defineField({
      name: 'titleEn',
      title: 'Title (English)',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'titleKo',
      },
    }),
    defineField({
      name: 'tag',
      title: '태그',
      type: 'string',
      options: {
        list: ['Essay', 'Sensory', 'Research', 'Note'],
      },
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        })
      ]
    }),
    defineField({
      name: 'publishedAt',
      title: '발행일',
      type: 'datetime',
    }),
    defineField({
      name: 'excerptKo',
      title: '요약 (한국어)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'excerptEn',
      title: 'Excerpt (English)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'bodyKo',
      title: '본문 (한국어)',
      type: 'blockContent',
    }),
    defineField({
      name: 'bodyEn',
      title: 'Body (English)',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      title: 'titleKo',
      media: 'mainImage',
    },
  },
})