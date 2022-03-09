import Moon from 'components/icons/Moon'
import Sun from 'components/icons/Sun'
import { Trans } from '@lingui/macro'

import { ThemeContext } from 'contexts/themeContext'
import React, { CSSProperties, useContext } from 'react'

import { ThemeOption } from 'constants/theme/theme-option'

export default function ThemePicker({ mobile }: { mobile?: boolean }) {
  const {
    themeOption,
    setThemeOption,
    theme: { colors },
  } = useContext(ThemeContext)

  const iconSize = 18
  const padding = 6
  const height = iconSize + padding * 2
  const selectedColor = colors.icon.primary
  const unselectedColor = colors.icon.tertiary

  const iconStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: padding,
    paddingBottom: padding,
  }

  const switchStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    cursor: 'pointer',
    width: iconSize * 2 + padding * 4,
    marginRight: 38,
    height,
    borderRadius: height / 2,
  }

  return (
    <div
      className="clickable-border"
      style={switchStyle}
      onClick={() =>
        setThemeOption(
          themeOption === ThemeOption.dark
            ? ThemeOption.light
            : ThemeOption.dark,
        )
      }
    >
      <div
        style={{
          ...iconStyle,
          color:
            themeOption === ThemeOption.light ? selectedColor : unselectedColor,
        }}
      >
        <Sun size={iconSize} />
      </div>
      <div
        style={{
          ...iconStyle,
          color:
            themeOption === ThemeOption.dark ? selectedColor : unselectedColor,
        }}
      >
        <Moon size={iconSize} />
      </div>
    </div>
  )

  return (
    <div style={{ display: 'flex' }}>
      {themeOption === ThemeOption.dark ? (
        <React.Fragment>
          <Sun size={16} />
          <div style={{ margin: '0 0 2px 10px' }}>
            <Trans>Light theme</Trans>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Moon size={16} />
          <div style={{ margin: '0 0 2px 10px' }}>
            <Trans>Dark theme</Trans>
          </div>
        </React.Fragment>
      )}
    </div>
  )
}
