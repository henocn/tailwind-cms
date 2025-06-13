import React, { useEffect } from 'react'
import { TextEditor } from './components/Editor/TextEditor'
import { Preview } from './components/Editor/Preview'
import { CodeGenerator } from './components/Editor/CodeGenerator'
import { useEditorStore } from './store/editorStore'




// Application principale de l'éditeur CMS
function App() {
  const { isPreviewMode, togglePreviewMode, initializeArticle } = useEditorStore()

  useEffect(() => {
    initializeArticle()
  }, [initializeArticle])

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Tailwind CMS Editor</h1>
          <p className="text-gray-600">Créez et stylisez vos articles avec Tailwind CSS</p>
        </header>

        <div className="mb-6 text-center">
          <button
            onClick={togglePreviewMode}
            className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 font-medium"
          >
            {isPreviewMode ? '✏️ Mode Édition' : '👁️ Mode Prévisualisation'}
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div>
            {isPreviewMode ? <Preview /> : <TextEditor />}
          </div>
          <div>
            <CodeGenerator />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
