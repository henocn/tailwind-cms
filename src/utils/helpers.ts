// Utilitaires pour l'application
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9)
}

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export const saveToLocalStorage = (key: string, data: any): void => {
  localStorage.setItem(key, JSON.stringify(data))
}

export const loadFromLocalStorage = (key: string): any => {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : null
}