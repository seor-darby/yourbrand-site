import {defineType, defineArrayMember, defineField} from 'sanity'
import {ImageIcon, PlayIcon} from '@sanity/icons'

export const blockContentType = defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [{title: 'Bullet', value: 'bullet'}],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          },
        ],
      },
    }),

    // 이미지 블록
    defineArrayMember({
      type: 'image',
      icon: ImageIcon,
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
        {
          name: 'caption',
          type: 'string',
          title: '캡션',
        },
      ],
    }),

    // 음악 임베드 블록
    defineArrayMember({
      type: 'object',
      name: 'musicEmbed',
      title: '음악 임베드',
      icon: PlayIcon,
      fields: [
        defineField({
          name: 'youtubeUrl',
          title: 'YouTube URL',
          type: 'url',
          description: 'YouTube 영상 URL을 붙여넣으세요 (예: https://www.youtube.com/watch?v=xxxxx)',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'startTime',
          title: '시작 시간 (초)',
          type: 'number',
          description: '재생을 시작할 시간 (초 단위, 예: 90 = 1분 30초)',
          initialValue: 0,
        }),
        defineField({
          name: 'label',
          title: '레이블',
          type: 'string',
          description: '예: Gustav Mahler — Symphony No.2 "Resurrection", I. Allegro maestoso',
        }),
        defineField({
          name: 'autoplay',
          title: '스크롤 시 자동 재생',
          type: 'boolean',
          description: '이 블록이 화면에 보일 때 자동으로 재생할까요?',
          initialValue: true,
        }),
      ],
      preview: {
        select: {
          title: 'label',
          subtitle: 'youtubeUrl',
        },
        prepare({title, subtitle}) {
          return {
            title: title || '음악 임베드',
            subtitle: subtitle,
          }
        },
      },
    }),
  ],
})