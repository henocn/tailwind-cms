export interface TextStyle {
  bold: boolean
  italic: boolean
  underline: boolean
  fontSize: string
  fontWeight: string
  color: string
  backgroundColor: string
  alignment: 'left' | 'center' | 'right' | 'justify'
  padding: string
  margin: string
  borderWidth: string
  borderColor: string
  borderRadius: string
  lineHeight: string
  letterSpacing: string
}

export interface ArticleBlock {
  id: string
  type: 'paragraph' | 'heading' | 'list' | 'quote'
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

export interface ColorOption {
  name: string
  value: string
  hex: string
}