import { defineType, defineField, defineArrayMember } from 'sanity'

export const atlasType = defineType({
  name: 'atlas',
  title: 'Atlas',
  type: 'document',
  fields: [
    defineField({
      name: 'nameKo',
      title: '이름 (한국어)',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'nameEn',
      title: 'Name (English)',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'nameEn' },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: '대표 이미지',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Alternative Text' }),
      ],
    }),

    // 기본 정보
    defineField({
      name: 'category',
      title: '분류',
      type: 'string',
      options: {
        list: ['채소', '과일', '육류', '해산물', '유제품', '곡물', '허브·향신료', '기타'],
      },
    }),
    defineField({
      name: 'season',
      title: '계절',
      type: 'string',
      options: {
        list: ['봄', '여름', '가을', '겨울', '연중'],
      },
    }),
    defineField({
      name: 'originKo',
      title: '원산지 (한국어)',
      type: 'string',
    }),
    defineField({
      name: 'originEn',
      title: 'Origin (English)',
      type: 'string',
    }),

    // 감각 프로파일
    defineField({
      name: 'aromaKo',
      title: '향 (한국어)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'aromaEn',
      title: 'Aroma (English)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'palateKo',
      title: '맛 (한국어)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'palateEn',
      title: 'Palate (English)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'textureKo',
      title: '질감 (한국어)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'textureEn',
      title: 'Texture (English)',
      type: 'text',
      rows: 2,
    }),

    // 조리 특성
    defineField({
      name: 'cookingKo',
      title: '조리 특성 (한국어)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'cookingEn',
      title: 'Cooking Behaviour (English)',
      type: 'text',
      rows: 3,
    }),

    // 관련 글
    defineField({
      name: 'relatedPosts',
      title: '관련 글',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'post' }],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'nameKo',
      subtitle: 'nameEn',
      media: 'mainImage',
    },
  },
})