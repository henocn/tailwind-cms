import React, { useEffect } from 'react'
import { Palette, Eye, Edit3 } from 'lucide-react'
import { TextEditor } from './components/Editor/TextEditor'
import { Preview } from './components/Editor/Preview'
import { CodeGenerator } from './components/Editor/CodeGenerator'
import { useEditorStore } from './store/editorStore'




// Application principale de l'éditeur CMS
function App() {
  const { isPreviewMode, togglePreviewMode, initializeArticle, currentArticle } = useEditorStore()

  useEffect(() => {
    initializeArticle()
  }, [initializeArticle])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Palette className="text-blue-600" size={32} />
            <h1 className="text-4xl font-bold text-gray-800">Tailwind CMS Editor</h1>
          </div>
          <p className="text-gray-600 text-lg">Créez et stylisez vos articles avec Tailwind CSS</p>
          {currentArticle && (
            <p className="text-sm text-gray-500 mt-2">
              Article: {currentArticle.title} • {currentArticle.blocks.length} bloc(s)
            </p>
          )}
        </header>

        <div className="mb-8 text-center">
          <button
            onClick={togglePreviewMode}
            className="inline-flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 font-medium shadow-lg transform hover:scale-105 transition-all"
          >
            {isPreviewMode ? (
              <>
                <Edit3 size={20} />
                Mode Édition
              </>
            ) : (
              <>
                <Eye size={20} />
                Mode Prévisualisation
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="order-2 xl:order-1">
            {isPreviewMode ? <Preview /> : <TextEditor />}
          </div>
          <div className="order-1 xl:order-2">
            <CodeGenerator />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
