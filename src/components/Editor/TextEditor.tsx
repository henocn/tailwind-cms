import React, { useState, useEffect } from 'react'
import { useEditorStore } from '../../store/editorStore'
import type { ArticleBlock, TextStyle } from '../../types'
import { generateId } from '../../utils/helpers'




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
    color: 'gray-900',
    alignment: 'left'
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

  const toggleStyle = (style: keyof Pick<TextStyle, 'bold' | 'italic' | 'underline'>) => {
    setCurrentStyles(prev => ({ ...prev, [style]: !prev[style] }))
  }

  const getPreviewClasses = () => {
    return [
      currentStyles.bold ? 'font-bold' : '',
      currentStyles.italic ? 'italic' : '',
      currentStyles.underline ? 'underline' : '',
      `text-${currentStyles.fontSize}`,
      `text-${currentStyles.color}`,
      `text-${currentStyles.alignment}`
    ].filter(Boolean).join(' ')
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Éditeur de Texte</h2>
      
      <div className="mb-4 flex flex-wrap gap-2 p-4 bg-gray-50 rounded-lg">
        <button
          onClick={() => toggleStyle('bold')}
          className={`px-3 py-2 rounded font-bold ${currentStyles.bold ? 'bg-blue-500 text-white' : 'bg-white border hover:bg-gray-100'}`}
        >
          B
        </button>
        <button
          onClick={() => toggleStyle('italic')}
          className={`px-3 py-2 rounded italic ${currentStyles.italic ? 'bg-blue-500 text-white' : 'bg-white border hover:bg-gray-100'}`}
        >
          I
        </button>
        <button
          onClick={() => toggleStyle('underline')}
          className={`px-3 py-2 rounded underline ${currentStyles.underline ? 'bg-blue-500 text-white' : 'bg-white border hover:bg-gray-100'}`}
        >
          U
        </button>
        
        <select
          value={currentStyles.fontSize}
          onChange={(e) => setCurrentStyles(prev => ({ ...prev, fontSize: e.target.value }))}
          className="px-3 py-2 rounded border bg-white"
        >
          <option value="xs">XS</option>
          <option value="sm">Small</option>
          <option value="base">Base</option>
          <option value="lg">Large</option>
          <option value="xl">XL</option>
          <option value="2xl">2XL</option>
          <option value="3xl">3XL</option>
        </select>
        
        <select
          value={currentStyles.color}
          onChange={(e) => setCurrentStyles(prev => ({ ...prev, color: e.target.value }))}
          className="px-3 py-2 rounded border bg-white"
        >
          <option value="gray-900">Noir</option>
          <option value="red-500">Rouge</option>
          <option value="blue-500">Bleu</option>
          <option value="green-500">Vert</option>
          <option value="purple-500">Violet</option>
          <option value="yellow-500">Jaune</option>
        </select>
        
        <select
          value={currentStyles.alignment}
          onChange={(e) => setCurrentStyles(prev => ({ ...prev, alignment: e.target.value as TextStyle['alignment'] }))}
          className="px-3 py-2 rounded border bg-white"
        >
          <option value="left">Gauche</option>
          <option value="center">Centre</option>
          <option value="right">Droite</option>
          <option value="justify">Justifié</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Aperçu du style:</label>
        <div className={`p-3 border rounded-lg bg-gray-50 ${getPreviewClasses()}`}>
          {currentText || 'Tapez votre texte pour voir l\'aperçu...'}
        </div>
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
          disabled={!currentText.trim()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Ajouter Paragraphe
        </button>
        <button
          onClick={() => handleAddBlock('heading')}
          disabled={!currentText.trim()}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Ajouter Titre
        </button>
      </div>

      {currentArticle && currentArticle.blocks.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Blocs ajoutés:</h3>
          <div className="space-y-3">
            {currentArticle.blocks.map((block) => (
              <div key={block.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <span className="text-sm text-gray-500 uppercase">{block.type}</span>
                  <p className="text-gray-800 truncate">{block.content}</p>
                </div>
                <button
                  onClick={() => handleDeleteBlock(block.id)}
                  className="ml-3 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                >
                  Supprimer
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}