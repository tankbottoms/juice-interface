import { CSSProperties, useContext, useState } from 'react'
import { Select } from 'antd'
import { GlobalOutlined } from '@ant-design/icons'

import { Languages } from 'constants/languages/language-options'
import { ThemeContext } from 'contexts/themeContext'

import juiceBoxShadow from 'constants/styles/boxShadow'

// Language select tool seen in top nav
export default function NavLanguageSelector({
  disableLang,
  mobile,
}: {
  disableLang?: string
  mobile?: boolean
}) {
  const {
    isDarkMode,
    theme: { colors },
  } = useContext(ThemeContext)
  const selectStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    cursor: 'pointer',
    height: 30,
    width: mobile ? 100 : 61,
    fontWeight: 500,
  }

  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false)

  // Renders Select Option for each language available on Juicebox
  const renderLanguageOption = (lang: string) => {
    if (disableLang === lang) {
      return null
    }
    return (
      <Select.Option key={lang} class="language-select-option" value={lang}>
        <div>{mobile ? Languages[lang].long : Languages[lang].short}</div>
      </Select.Option>
    )
  }

  let currentSelectedLanguage = localStorage.getItem('lang') || 'en'

  // Sets the new language with localStorage and reloads the page
  const setLanguage = (newLanguage: string) => {
    currentSelectedLanguage = newLanguage
    localStorage.setItem('lang', newLanguage)
    window.location.reload()
  }

  const desktopDropdownStyle: CSSProperties = {
    border: '1px solid ' + colors.stroke.tertiary,
    marginRight: 20,
    boxShadow: juiceBoxShadow(isDarkMode),
  }

  const selectHeader = mobile
    ? Languages[currentSelectedLanguage].long
    : Languages[currentSelectedLanguage].short
  // Close dropdown when clicking anywhere in the window
  window.addEventListener('click', () => setDropdownOpen(false), false)
  return (
    <div
      className="language-selector"
      style={{ cursor: 'pointer' }}
      onClick={e => {
        e.stopPropagation()
        setDropdownOpen(dropdownOpen === true ? false : true)
      }}
    >
      <GlobalOutlined style={{ marginBottom: 2 }} />
      <Select
        className="medium"
        style={{
          ...selectStyle,
        }}
        dropdownStyle={mobile ? {} : desktopDropdownStyle}
        open={dropdownOpen}
        value={selectHeader ?? 'EN'}
        onChange={newLanguage => {
          setLanguage(newLanguage)
        }}
      >
        {Object.keys(Languages).map(renderLanguageOption)}
      </Select>
    </div>
  )
}
