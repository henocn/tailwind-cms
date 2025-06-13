import React, { useState, useEffect } from 'react'
import { Plus, Eye, Code, Trash2, FileText, Heading } from 'lucide-react'
import { useEditorStore } from '../../store/editorStore'
import type { ArticleBlock, TextStyle } from '../../types'
import { generateId } from '../../utils/helpers'
import { StylePanel } from './StylePanel'




// Composant principal de l'éditeur de texte
export const TextEditor: React.FC = () => {
  const { 
    currentArticle, 
    addBlock, 
    updateBlock, 
    deleteBlock,
    selectedBlockId, 
    setSelectedBlock,
    initializeArticle 
  } = useEditorStore()
  
  const [currentText, setCurrentText] = useState('')
  const [currentStyles, setCurrentStyles] = useState<TextStyle>({
    bold: false,
    italic: false,
    underline: false,
    fontSize: 'base',
    fontWeight: 'normal',
    color: 'gray-900',
    backgroundColor: 'transparent',
    alignment: 'left',
    padding: '4',
    margin: '2',
    borderWidth: '0',
    borderColor: 'transparent',
    borderRadius: 'none',
    lineHeight: 'normal',
    letterSpacing: 'normal'
  })

  useEffect(() => {
    if (!currentArticle) {
      initializeArticle()
    }
  }, [currentArticle, initializeArticle])

  const handleAddBlock = (type: ArticleBlock['type']) => {
    if (!currentText.trim()) return
    
    const newBlock: ArticleBlock = {
      id: generateId(),
      type,
      content: currentText,
      styles: { ...currentStyles }
    }
    
    addBlock(newBlock)
    setCurrentText('')
  }

  const handleDeleteBlock = (id: string) => {
    deleteBlock(id)
  }

  const getPreviewClasses = () => {
    const s = currentStyles
    return [
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
      s.letterSpacing !== 'normal' ? `tracking-${s.letterSpacing}` : ''
    ].filter(Boolean).join(' ')
  }

  const getBlockClasses = (block: ArticleBlock) => {
    const s = block.styles
    return [
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
      s.letterSpacing !== 'normal' ? `tracking-${s.letterSpacing}` : ''
    ].filter(Boolean).join(' ')
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Code className="text-blue-500" size={24} />
        <h2 className="text-2xl font-bold text-gray-800">Éditeur de Texte</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <StylePanel styles={currentStyles} onChange={setCurrentStyles} />

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">Aperçu du style:</label>
            <div className={`p-4 border-2 border-dashed border-gray-300 rounded-lg min-h-[60px] ${getPreviewClasses()}`}>
              {currentText || 'Tapez votre texte pour voir l\'aperçu...'}
            </div>
          </div>

          <textarea
            value={currentText}
            onChange={(e) => setCurrentText(e.target.value)}
            className="w-full h-32 p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Tapez votre texte ici..."
          />

          <div className="flex gap-2">
            <button
              onClick={() => handleAddBlock('paragraph')}
              disabled={!currentText.trim()}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <FileText size={16} />
              Paragraphe
            </button>
            <button
              onClick={() => handleAddBlock('heading')}
              disabled={!currentText.trim()}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <Heading size={16} />
              Titre
            </button>
            <button
              onClick={() => handleAddBlock('quote')}
              disabled={!currentText.trim()}
              className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <Plus size={16} />
              Citation
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Eye className="text-green-500" size={20} />
            <h3 className="text-lg font-semibold text-gray-800">Blocs créés</h3>
          </div>
          
          {currentArticle && currentArticle.blocks.length > 0 ? (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {currentArticle.blocks.map((block) => (
                <div key={block.id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {block.type === 'heading' ? <Heading size={16} /> : 
                       block.type === 'quote' ? <Plus size={16} /> : <FileText size={16} />}
                      <span className="text-sm font-medium text-gray-600 capitalize">{block.type}</span>
                    </div>
                    <button
                      onClick={() => handleDeleteBlock(block.id)}
                      className="flex items-center gap-1 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                    >
                      <Trash2 size={12} />
                      Supprimer
                    </button>
                  </div>
                  <div className={`${getBlockClasses(block)} border rounded p-2 bg-white`}>
                    {block.content}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <FileText size={48} className="mx-auto mb-2 opacity-50" />
              <p>Aucun bloc créé pour le moment</p>
              <p className="text-sm">Ajoutez du contenu pour commencer</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}