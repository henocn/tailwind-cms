import React from 'react'
import { useEditorStore } from '../../store/editorStore'




// Composant de prévisualisation de l'article
export const Preview: React.FC = () => {
  const { currentArticle } = useEditorStore()

  if (!currentArticle) {
    return (
      <div className="w-full p-6 bg-gray-50 rounded-lg">
        <p className="text-gray-500 text-center">Aucun article à prévisualiser</p>
      </div>
    )
  }

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Prévisualisation</h2>
      <div className="space-y-4">
        {currentArticle.blocks.map((block) => {
          const { styles } = block
          const className = [
            styles.bold ? 'font-bold' : '',
            styles.italic ? 'italic' : '',
            styles.underline ? 'underline' : '',
            `text-${styles.fontSize}`,
            `text-${styles.color}`,
            `text-${styles.alignment}`,
            'mb-4'
          ].filter(Boolean).join(' ')

          if (block.type === 'heading') {
            return <h3 key={block.id} className={className}>{block.content}</h3>
          }
          
          return <p key={block.id} className={className}>{block.content}</p>
        })}
      </div>
    </div>
  )
}