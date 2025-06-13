import React, { useState } from 'react'
import { useEditorStore } from '../../store/editorStore'
import { ArticleBlock, TextStyle } from '../../types'
import { generateId } from '../../utils/helpers'




// Composant principal de l'éditeur de texte
export const TextEditor: React.FC = () => {
  const { currentArticle, addBlock, updateBlock, selectedBlockId, setSelectedBlock } = useEditorStore()
  const [currentText, setCurrentText] = useState('')
  const [currentStyles, setCurrentStyles] = useState<TextStyle>({
    bold: false,
    italic: false,
    underline: false,
    fontSize: 'base',
    color: 'gray-900',
    alignment: 'left'
  })

  const handleAddBlock = (type: ArticleBlock['type']) => {
    if (!currentText.trim()) return
    
    const newBlock: ArticleBlock = {
      id: generateId(),
      type,
      content: currentText,
      styles: currentStyles
    }
    
    addBlock(newBlock)
    setCurrentText('')
  }

  const toggleStyle = (style: keyof Pick<TextStyle, 'bold' | 'italic' | 'underline'>) => {
    setCurrentStyles(prev => ({ ...prev, [style]: !prev[style] }))
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-4 flex flex-wrap gap-2 p-4 bg-gray-50 rounded-lg">
        <button
          onClick={() => toggleStyle('bold')}
          className={`px-3 py-1 rounded ${currentStyles.bold ? 'bg-blue-500 text-white' : 'bg-white'}`}
        >
          B
        </button>
        <button
          onClick={() => toggleStyle('italic')}
          className={`px-3 py-1 rounded ${currentStyles.italic ? 'bg-blue-500 text-white' : 'bg-white'}`}
        >
          I
        </button>
        <button
          onClick={() => toggleStyle('underline')}
          className={`px-3 py-1 rounded ${currentStyles.underline ? 'bg-blue-500 text-white' : 'bg-white'}`}
        >
          U
        </button>
        
        <select
          value={currentStyles.fontSize}
          onChange={(e) => setCurrentStyles(prev => ({ ...prev, fontSize: e.target.value }))}
          className="px-3 py-1 rounded border"
        >
          <option value="sm">Small</option>
          <option value="base">Base</option>
          <option value="lg">Large</option>
          <option value="xl">XL</option>
          <option value="2xl">2XL</option>
        </select>
        
        <select
          value={currentStyles.alignment}
          onChange={(e) => setCurrentStyles(prev => ({ ...prev, alignment: e.target.value as TextStyle['alignment'] }))}
          className="px-3 py-1 rounded border"
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
          <option value="justify">Justify</option>
        </select>
      </div>

      <textarea
        value={currentText}
        onChange={(e) => setCurrentText(e.target.value)}
        className="w-full h-32 p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Tapez votre texte ici..."
      />

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => handleAddBlock('paragraph')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Ajouter Paragraphe
        </button>
        <button
          onClick={() => handleAddBlock('heading')}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Ajouter Titre
        </button>
      </div>
    </div>
  )
}