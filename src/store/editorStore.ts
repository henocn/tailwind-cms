import { create } from 'zustand'
import { Article, ArticleBlock, TextStyle } from '../types'




// Store principal pour gérer l'état de l'éditeur
interface EditorStore {
  currentArticle: Article | null
  selectedBlockId: string | null
  isPreviewMode: boolean
  setCurrentArticle: (article: Article) => void
  addBlock: (block: ArticleBlock) => void
  updateBlock: (id: string, updates: Partial<ArticleBlock>) => void
  deleteBlock: (id: string) => void
  setSelectedBlock: (id: string | null) => void
  togglePreviewMode: () => void
  generateTailwindCode: () => string
}

export const useEditorStore = create<EditorStore>((set, get) => ({
  currentArticle: null,
  selectedBlockId: null,
  isPreviewMode: false,
  
  setCurrentArticle: (article) => set({ currentArticle: article }),
  
  addBlock: (block) => set((state) => ({
    currentArticle: state.currentArticle ? {
      ...state.currentArticle,
      blocks: [...state.currentArticle.blocks, block]
    } : null
  })),
  
  updateBlock: (id, updates) => set((state) => ({
    currentArticle: state.currentArticle ? {
      ...state.currentArticle,
      blocks: state.currentArticle.blocks.map(block => 
        block.id === id ? { ...block, ...updates } : block
      )
    } : null
  })),
  
  deleteBlock: (id) => set((state) => ({
    currentArticle: state.currentArticle ? {
      ...state.currentArticle,
      blocks: state.currentArticle.blocks.filter(block => block.id !== id)
    } : null
  })),
  
  setSelectedBlock: (id) => set({ selectedBlockId: id }),
  
  togglePreviewMode: () => set((state) => ({ isPreviewMode: !state.isPreviewMode })),
  
  generateTailwindCode: () => {
    const { currentArticle } = get()
    if (!currentArticle) return ''
    
    return currentArticle.blocks.map(block => {
      const { styles } = block
      const classes = [
        styles.bold ? 'font-bold' : '',
        styles.italic ? 'italic' : '',
        styles.underline ? 'underline' : '',
        `text-${styles.fontSize}`,
        `text-${styles.color}`,
        `text-${styles.alignment}`
      ].filter(Boolean).join(' ')
      
      return `<${block.type} class="${classes}">${block.content}</${block.type}>`
    }).join('\n')
  }
}))