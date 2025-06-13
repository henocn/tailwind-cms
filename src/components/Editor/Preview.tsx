import React from 'react'
import { Eye, FileText } from 'lucide-react'
import { useEditorStore } from '../../store/editorStore'




// Composant de prévisualisation de l'article
export const Preview: React.FC = () => {
  const { currentArticle } = useEditorStore()

  const getBlockClasses = (block: any) => {
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
      s.letterSpacing !== 'normal' ? `tracking-${s.letterSpacing}` : '',
      'mb-4'
    ].filter(Boolean).join(' ')
  }

  if (!currentArticle || currentArticle.blocks.length === 0) {
    return (
      <div className="w-full p-8 bg-white rounded-lg shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <Eye className="text-green-500" size={24} />
          <h2 className="text-2xl font-bold text-gray-800">Prévisualisation</h2>
        </div>
        <div className="text-center py-12 text-gray-500">
          <FileText size={64} className="mx-auto mb-4 opacity-30" />
          <p className="text-lg">Aucun contenu à prévisualiser</p>
          <p className="text-sm">Créez des blocs dans l'éditeur pour voir le résultat</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Eye className="text-green-500" size={24} />
        <h2 className="text-2xl font-bold text-gray-800">Prévisualisation</h2>
      </div>
      <div className="prose max-w-none">
        {currentArticle.blocks.map((block) => {
          const className = getBlockClasses(block)

          if (block.type === 'heading') {
            return <h2 key={block.id} className={className}>{block.content}</h2>
          }
          
          if (block.type === 'quote') {
            return <blockquote key={block.id} className={`${className} border-l-4 border-gray-300 pl-4`}>{block.content}</blockquote>
          }
          
          return <p key={block.id} className={className}>{block.content}</p>
        })}
      </div>
    </div>
  )
}