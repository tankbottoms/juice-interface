import { Space } from 'antd'
import { Header } from 'antd/lib/layout/layout'
import useMobile from 'hooks/Mobile'

import Account from './Account'
import MobileCollapse from './MobileCollapse'
import Logo from './Logo'
import { TopLeftNavItems } from './MenuItems'
import NavLanguageSelector from './NavLanguageSelector'
import ThemePicker from './ThemePicker'

export default function Navbar() {
  const isMobile = useMobile()
  return !isMobile ? (
    <Header className="top-nav">
      <TopLeftNavItems />

      <Space className="top-right-nav" size={0}>
        <NavLanguageSelector />
        <ThemePicker />
        <Account />
      </Space>
    </Header>
  ) : (
    <MobileCollapse />
  )
}
