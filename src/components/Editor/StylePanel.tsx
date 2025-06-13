import React from 'react'
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide-react'
import type { TextStyle } from '../../types'
import { ColorPicker } from '../UI/ColorPicker'
import { textColors, backgroundColors, borderColors } from '../../utils/colorPalettes'




// Panel de contrôle des styles avancés
interface StylePanelProps {
  styles: TextStyle
  onChange: (styles: TextStyle) => void
}

export const StylePanel: React.FC<StylePanelProps> = ({ styles, onChange }) => {
  const updateStyle = (key: keyof TextStyle, value: string | boolean) => {
    onChange({ ...styles, [key]: value })
  }

  const toggleStyle = (key: keyof Pick<TextStyle, 'bold' | 'italic' | 'underline'>) => {
    updateStyle(key, !styles[key])
  }

  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => toggleStyle('bold')}
          className={`p-2 rounded ${styles.bold ? 'bg-blue-500 text-white' : 'bg-white border hover:bg-gray-100'}`}
          title="Gras"
        >
          <Bold size={16} />
        </button>
        <button
          onClick={() => toggleStyle('italic')}
          className={`p-2 rounded ${styles.italic ? 'bg-blue-500 text-white' : 'bg-white border hover:bg-gray-100'}`}
          title="Italique"
        >
          <Italic size={16} />
        </button>
        <button
          onClick={() => toggleStyle('underline')}
          className={`p-2 rounded ${styles.underline ? 'bg-blue-500 text-white' : 'bg-white border hover:bg-gray-100'}`}
          title="Souligné"
        >
          <Underline size={16} />
        </button>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => updateStyle('alignment', 'left')}
          className={`p-2 rounded ${styles.alignment === 'left' ? 'bg-blue-500 text-white' : 'bg-white border hover:bg-gray-100'}`}
          title="Aligner à gauche"
        >
          <AlignLeft size={16} />
        </button>
        <button
          onClick={() => updateStyle('alignment', 'center')}
          className={`p-2 rounded ${styles.alignment === 'center' ? 'bg-blue-500 text-white' : 'bg-white border hover:bg-gray-100'}`}
          title="Centrer"
        >
          <AlignCenter size={16} />
        </button>
        <button
          onClick={() => updateStyle('alignment', 'right')}
          className={`p-2 rounded ${styles.alignment === 'right' ? 'bg-blue-500 text-white' : 'bg-white border hover:bg-gray-100'}`}
          title="Aligner à droite"
        >
          <AlignRight size={16} />
        </button>
        <button
          onClick={() => updateStyle('alignment', 'justify')}
          className={`p-2 rounded ${styles.alignment === 'justify' ? 'bg-blue-500 text-white' : 'bg-white border hover:bg-gray-100'}`}
          title="Justifier"
        >
          <AlignJustify size={16} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Taille</label>
          <select
            value={styles.fontSize}
            onChange={(e) => updateStyle('fontSize', e.target.value)}
            className="w-full px-2 py-1 text-sm border rounded"
          >
            <option value="xs">XS</option>
            <option value="sm">SM</option>
            <option value="base">Base</option>
            <option value="lg">LG</option>
            <option value="xl">XL</option>
            <option value="2xl">2XL</option>
            <option value="3xl">3XL</option>
            <option value="4xl">4XL</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Poids</label>
          <select
            value={styles.fontWeight}
            onChange={(e) => updateStyle('fontWeight', e.target.value)}
            className="w-full px-2 py-1 text-sm border rounded"
          >
            <option value="light">Light</option>
            <option value="normal">Normal</option>
            <option value="medium">Medium</option>
            <option value="semibold">Semibold</option>
            <option value="bold">Bold</option>
            <option value="extrabold">Extra Bold</option>
          </select>
        </div>
      </div>

      <ColorPicker
        colors={textColors}
        selectedValue={styles.color}
        onChange={(value) => updateStyle('color', value)}
        label="Couleur du texte"
      />

      <ColorPicker
        colors={backgroundColors}
        selectedValue={styles.backgroundColor}
        onChange={(value) => updateStyle('backgroundColor', value)}
        label="Couleur d'arrière-plan"
      />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Padding</label>
          <select
            value={styles.padding}
            onChange={(e) => updateStyle('padding', e.target.value)}
            className="w-full px-2 py-1 text-sm border rounded"
          >
            <option value="0">Aucun</option>
            <option value="1">XS</option>
            <option value="2">SM</option>
            <option value="4">MD</option>
            <option value="6">LG</option>
            <option value="8">XL</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Marge</label>
          <select
            value={styles.margin}
            onChange={(e) => updateStyle('margin', e.target.value)}
            className="w-full px-2 py-1 text-sm border rounded"
          >
            <option value="0">Aucune</option>
            <option value="1">XS</option>
            <option value="2">SM</option>
            <option value="4">MD</option>
            <option value="6">LG</option>
            <option value="8">XL</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Bordure</label>
          <select
            value={styles.borderWidth}
            onChange={(e) => updateStyle('borderWidth', e.target.value)}
            className="w-full px-2 py-1 text-sm border rounded"
          >
            <option value="0">Aucune</option>
            <option value="1">Fine</option>
            <option value="2">Moyenne</option>
            <option value="4">Épaisse</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Arrondi</label>
          <select
            value={styles.borderRadius}
            onChange={(e) => updateStyle('borderRadius', e.target.value)}
            className="w-full px-2 py-1 text-sm border rounded"
          >
            <option value="none">Aucun</option>
            <option value="sm">SM</option>
            <option value="md">MD</option>
            <option value="lg">LG</option>
            <option value="xl">XL</option>
            <option value="full">Complet</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Interligne</label>
          <select
            value={styles.lineHeight}
            onChange={(e) => updateStyle('lineHeight', e.target.value)}
            className="w-full px-2 py-1 text-sm border rounded"
          >
            <option value="tight">Serré</option>
            <option value="normal">Normal</option>
            <option value="relaxed">Relâché</option>
            <option value="loose">Espacé</option>
          </select>
        </div>
      </div>

      <ColorPicker
        colors={borderColors}
        selectedValue={styles.borderColor}
        onChange={(value) => updateStyle('borderColor', value)}
        label="Couleur de bordure"
      />

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Espacement des lettres</label>
        <select
          value={styles.letterSpacing}
          onChange={(e) => updateStyle('letterSpacing', e.target.value)}
          className="w-full px-2 py-1 text-sm border rounded"
        >
          <option value="tighter">Plus serré</option>
          <option value="tight">Serré</option>
          <option value="normal">Normal</option>
          <option value="wide">Large</option>
          <option value="wider">Plus large</option>
        </select>
      </div>
    </div>
  )
}