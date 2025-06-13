export interface TextStyle {
  bold: boolean
  italic: boolean
  underline: boolean
  fontSize: string
  color: string
  alignment: 'left' | 'center' | 'right' | 'justify'
}

export interface ArticleBlock {
  id: string
  type: 'paragraph' | 'heading' | 'list'
  content: string
  styles: TextStyle
}

export interface Article {
  id: string
  title: string
  blocks: ArticleBlock[]
  createdAt: Date
  updatedAt: Date
}