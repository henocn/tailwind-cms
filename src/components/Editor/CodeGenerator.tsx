import React, { useState } from 'react'
import { useEditorStore } from '../../store/editorStore'




// Composant pour générer et copier le code Tailwind
export const CodeGenerator: React.FC = () => {
  const { generateTailwindCode } = useEditorStore()
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const code = generateTailwindCode()
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const code = generateTailwindCode()

  return (
    <div className="w-full p-6 bg-gray-900 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white text-lg font-semibold">Code Tailwind généré</h3>
        <button
          onClick={handleCopy}
          className={`px-4 py-2 rounded ${copied ? 'bg-green-500' : 'bg-blue-500'} text-white hover:opacity-80`}
        >
          {copied ? 'Copié!' : 'Copier'}
        </button>
      </div>
      <pre className="bg-gray-800 p-4 rounded text-green-400 text-sm overflow-x-auto">
        <code>{code || 'Aucun contenu à générer'}</code>
      </pre>
    </div>
  )
}