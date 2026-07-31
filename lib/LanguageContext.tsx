'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export type Language = 'th' | 'en'

interface LanguageContextProps {
  language: Language
  setLanguage: (lang: Language) => void
  t: {
    (th: string, en: string): string
    <T>(obj: { th: T; en: T }): T
  }
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined)

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('th')

  useEffect(() => {
    const storedLang = localStorage.getItem('lang') as Language
    if (storedLang === 'th' || storedLang === 'en') {
      setLanguageState(storedLang)
    } else {
      const browserLang = navigator.language.split('-')[0]
      if (browserLang === 'en' || browserLang === 'th') {
        setLanguageState(browserLang as Language)
      }
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('lang', lang)
    document.documentElement.lang = lang
  }

  function t(arg1: any, arg2?: any): any {
    if (typeof arg1 === 'object' && arg1 !== null) {
      return language === 'th' ? arg1.th : arg1.en
    }
    return language === 'th' ? arg1 : (arg2 ?? arg1)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
