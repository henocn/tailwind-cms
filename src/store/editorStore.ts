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
    if (!currentArticle || currentArticle.blocks.length === 0) {
      return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Article Tailwind</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 p-8">
    <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <p class="text-gray-500 text-center">Aucun contenu disponible</p>
    </div>
</body>
</html>`
    }
    
    const blocksCode = currentArticle.blocks.map(block => {
      const s = block.styles
      const classes = [
        s.bold ? 'font-bold' : '',
        s.italic ? 'italic' : '',
        s.underline ? 'underline' : '',
        `text-${s.fontSize}`,
        s.fontWeight !== 'normal' ? `font-${s.fontWeight}` : '',
        `text-${s.color}`,
        s.backgroundColor !== 'transparent' ? `bg-${s.backgroundColor}` : '',
        `text-${s.alignment}`,
        s.padding !== '0' ? `p-${s.padding}` : '',
        s.margin !== '0' ? `m-${s.margin}` : '',
        s.borderWidth !== '0' ? `border-${s.borderWidth}` : '',
        s.borderColor !== 'transparent' ? `border-${s.borderColor}` : '',
        s.borderRadius !== 'none' ? `rounded-${s.borderRadius}` : '',
        s.lineHeight !== 'normal' ? `leading-${s.lineHeight}` : '',
        s.letterSpacing !== 'normal' ? `tracking-${s.letterSpacing}` : '',
        'mb-4'
      ].filter(Boolean).join(' ')
      
      let tag = 'p'
      if (block.type === 'heading') tag = 'h2'
      if (block.type === 'quote') tag = 'blockquote'
      
      const extraClasses = block.type === 'quote' ? ' border-l-4 border-gray-300 pl-4' : ''
      
      return `        <${tag} class="${classes}${extraClasses}">${block.content}</${tag}>`
    }).join('\n')
    
    return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${currentArticle.title}</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 p-8">
    <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
${blocksCode}
    </div>
</body>
</html>`
  }
}))