import { useState, useContext } from 'react'
import { Collapse, Space, Button } from 'antd'
import { Header } from 'antd/lib/layout/layout'

import { Trans } from '@lingui/macro'

import CollapsePanel from 'antd/lib/collapse/CollapsePanel'

import { MenuOutlined } from '@ant-design/icons'

import { ThemeContext } from 'contexts/themeContext'
import { NetworkContext } from 'contexts/networkContext'

import FeedbackFormBtn from 'components/shared/FeedbackFormBtn'

import Logo from '../Logo'
import Account from '../Account'
import NavLanguageSelector from '../NavLanguageSelector'
import { TopLeftNavItems } from '../MenuItems'
import ThemePickerMobile from './ThemePickerMobile'
import ResourcesDropdownMobile from './ResourcesDropdownMobile'
import { mobileNavSubsectionStyles, topNavStyles } from '../styles'

export default function MobileCollapse() {
  const [navOpen, setNavOpen] = useState<0 | undefined>()
  const {
    theme: { colors },
  } = useContext(ThemeContext)
  const { signingProvider, onLogOut } = useContext(NetworkContext)

  // Close collapse when clicking below it
  window.addEventListener('click', () => setNavOpen(undefined), false)
  return (
    <Header
      className="top-nav top-nav-mobile"
      onClick={e => {
        e.stopPropagation()
      }}
      style={{
        ...topNavStyles,
        padding: '16px 8px',
        width: '100%',
        position: 'fixed',
      }}
    >
      <Collapse style={{ border: 'none' }} activeKey={navOpen}>
        <CollapsePanel
          style={{ border: 'none' }}
          key={0}
          showArrow={false}
          header={
            <Space
              onClick={e => {
                setNavOpen(navOpen === 0 ? undefined : 0)
                e.stopPropagation()
              }}
            >
              <a href="/" style={{ display: 'inline-block' }}>
                {<Logo height={30} />}
              </a>
              <MenuOutlined
                style={{
                  color: colors.icon.primary,
                  fontSize: 20,
                  paddingTop: 6,
                  paddingLeft: 10,
                }}
              />
            </Space>
          }
        >
          <TopLeftNavItems
            mobile
            onClickMenuItems={() => setNavOpen(navOpen === 0 ? undefined : 0)}
          />
          <ResourcesDropdownMobile />
          <div
            className="nav-subsection"
            style={{ ...mobileNavSubsectionStyles }}
          >
            <NavLanguageSelector mobile />
            <ThemePickerMobile />
            <FeedbackFormBtn mobile />
          </div>
          <Account mobile />
          {signingProvider ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 10,
              }}
            >
              <Button onClick={onLogOut}>
                <Trans>Disconnect</Trans>
              </Button>
            </div>
          ) : null}
        </CollapsePanel>
      </Collapse>
    </Header>
  )
}
