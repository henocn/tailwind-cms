import React, { useState } from 'react'
import { Code, Copy, Check, Download } from 'lucide-react'
import { useEditorStore } from '../../store/editorStore'




// Composant pour générer et copier le code Tailwind
export const CodeGenerator: React.FC = () => {
  const { generateTailwindCode, currentArticle } = useEditorStore()
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const code = generateTailwindCode()
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const code = generateTailwindCode()
    const blob = new Blob([code], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'tailwind-article.html'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const code = generateTailwindCode()

  return (
    <div className="w-full p-6 bg-gray-900 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Code className="text-green-400" size={24} />
          <h3 className="text-white text-lg font-semibold">Code Tailwind généré</h3>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-3 py-2 rounded ${
              copied ? 'bg-green-500' : 'bg-blue-500'
            } text-white hover:opacity-80 text-sm`}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Copié!' : 'Copier'}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-3 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 text-sm"
          >
            <Download size={16} />
            Télécharger
          </button>
        </div>
      </div>
      <div className="bg-gray-800 rounded-lg p-4 max-h-96 overflow-auto">
        <pre className="text-green-400 text-sm">
          <code>{code || '<!-- Aucun contenu à générer -->'}</code>
        </pre>
      </div>
      {currentArticle && currentArticle.blocks.length > 0 && (
        <div className="mt-4 text-xs text-gray-400">
          {currentArticle.blocks.length} bloc(s) généré(s) • Dernière mise à jour: {currentArticle.updatedAt.toLocaleTimeString()}
        </div>
      )}
    </div>
  )
}