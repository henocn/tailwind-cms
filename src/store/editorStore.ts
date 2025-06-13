import { create } from 'zustand'
import type { Article, ArticleBlock, TextStyle } from '../types'




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
  initializeArticle: () => void
}

export const useEditorStore = create<EditorStore>((set, get) => ({
  currentArticle: null,
  selectedBlockId: null,
  isPreviewMode: false,
  
  initializeArticle: () => set({
    currentArticle: {
      id: Math.random().toString(36).substr(2, 9),
      title: 'Nouvel Article',
      blocks: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }
  }),
  
  setCurrentArticle: (article) => set({ currentArticle: article }),
  
  addBlock: (block) => set((state) => ({
    currentArticle: state.currentArticle ? {
      ...state.currentArticle,
      blocks: [...state.currentArticle.blocks, block],
      updatedAt: new Date()
    } : null
  })),
  
  updateBlock: (id, updates) => set((state) => ({
    currentArticle: state.currentArticle ? {
      ...state.currentArticle,
      blocks: state.currentArticle.blocks.map(block => 
        block.id === id ? { ...block, ...updates } : block
      ),
      updatedAt: new Date()
    } : null
  })),
  
  deleteBlock: (id) => set((state) => ({
    currentArticle: state.currentArticle ? {
      ...state.currentArticle,
      blocks: state.currentArticle.blocks.filter(block => block.id !== id),
      updatedAt: new Date()
    } : null,
    selectedBlockId: state.selectedBlockId === id ? null : state.selectedBlockId
  })),
  
  setSelectedBlock: (id) => set({ selectedBlockId: id }),
  
  togglePreviewMode: () => set((state) => ({ isPreviewMode: !state.isPreviewMode })),
  
  generateTailwindCode: () => {
    const { currentArticle } = get()
    if (!currentArticle || currentArticle.blocks.length === 0) return '<div class="p-4">\n  <!-- Aucun contenu -->\n</div>'
    
    const blocksCode = currentArticle.blocks.map(block => {
      const { styles } = block
      const classes = [
        styles.bold ? 'font-bold' : '',
        styles.italic ? 'italic' : '',
        styles.underline ? 'underline' : '',
        `text-${styles.fontSize}`,
        `text-${styles.color}`,
        `text-${styles.alignment}`,
        'mb-4'
      ].filter(Boolean).join(' ')
      
      const tag = block.type === 'heading' ? 'h2' : 'p'
      return `  <${tag} class="${classes}">${block.content}</${tag}>`
    }).join('\n')
    
    return `<div class="max-w-4xl mx-auto p-6">\n${blocksCode}\n</div>`
  }
}))