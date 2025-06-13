import React from 'react'
import type { ColorOption } from '../../types'




// Composant de sélection de couleur avec palette visuelle
interface ColorPickerProps {
  colors: ColorOption[]
  selectedValue: string
  onChange: (value: string) => void
  label: string
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ colors, selectedValue, onChange, label }) => {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-medium text-gray-700">{label}</label>
      <div className="grid grid-cols-8 gap-1 p-2 bg-white border rounded-lg">
        {colors.map((color) => (
          <button
            key={color.value}
            onClick={() => onChange(color.value)}
            className={`w-6 h-6 rounded border-2 hover:scale-110 transition-transform ${
              selectedValue === color.value ? 'border-gray-800' : 'border-gray-300'
            }`}
            style={{ backgroundColor: color.hex }}
            title={color.name}
          />
        ))}
      </div>
    </div>
  )
}