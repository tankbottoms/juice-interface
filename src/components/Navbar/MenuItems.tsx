import { t, Trans } from '@lingui/macro'

import { CSSProperties, useState } from 'react'

import { Dropdown, Menu, Space } from 'antd'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import ExternalLink from 'components/shared/ExternalLink'

import Logo from './Logo'
import ResourcesDropdownMobile from './Mobile/ResourcesDropdownMobile'
import { navDropdownItem, navMenuItemStyles, topLeftNavStyles } from './styles'

export function NavMenuItem({
  text,
  route,
  onClick,
}: {
  text: string
  route?: string
  onClick?: VoidFunction
}) {
  const external = route?.startsWith('http')
  return (
    <a
      className="nav-menu-item hover-opacity"
      href={route}
      onClick={onClick}
      {...(external
        ? {
            target: '_blank',
            rel: 'noreferrer',
          }
        : {})}
      style={navMenuItemStyles}
    >
      {text}
    </a>
  )
}

export function DropdownItem({
  text,
  route,
  onClick,
}: {
  text: string
  route?: string
  onClick?: VoidFunction
}) {
  return (
    <Menu.Item>
      <ExternalLink
        className="nav-dropdown-item"
        href={route}
        onClick={onClick}
        style={navDropdownItem}
      >
        {text}
      </ExternalLink>
    </Menu.Item>
  )
}

const resourcesMenu = (
  <Menu style={{ marginTop: -16, marginLeft: -6 }}>
    <DropdownItem
      key="docs"
      text={t`Docs`}
      route="https://docs.juicebox.money"
    />
    <DropdownItem
      key="blog"
      text={t`Blog`}
      route="https://blog.juicebox.money"
    />
    <DropdownItem
      key="workspace"
      text={t`Workspace`}
      route="https://juicebox.notion.site/"
    />
    <DropdownItem
      key="podcast"
      text={t`Podcast`}
      route="https://open.spotify.com/show/4G8ji7vofcOx2acXcjXIa4?si=1e5e6e171ed744e8"
    />
    <DropdownItem
      key="peel"
      text={t`Peel`}
      route="https://discord.gg/XvmfY4Hkcz"
    />
  </Menu>
)

export function TopLeftNavItems({
  mobile,
  onClickMenuItems,
}: {
  mobile?: boolean
  onClickMenuItems?: VoidFunction
}) {
  const [resourcesOpen, setResourcesOpen] = useState<boolean>(false)
  const dropdownIconStyle: CSSProperties = {
    fontSize: 13,
    marginLeft: 7,
  }
  return (
    <Space
      size={mobile ? 0 : 'large'}
      className="top-left-nav"
      style={{ ...topLeftNavStyles, position: mobile ? 'static' : 'absolute' }}
      direction={mobile ? 'vertical' : 'horizontal'}
    >
      {!mobile && (
        <a href="/" style={{ display: 'inline-block' }}>
          {<Logo />}
        </a>
      )}
      <NavMenuItem
        text={t`Projects`}
        onClick={onClickMenuItems}
        route="/#/projects"
      />
      <NavMenuItem
        text={t`FAQ`}
        route={undefined}
        onClick={() => {
          if (onClickMenuItems) onClickMenuItems()
          window.location.hash = '/'
          setTimeout(() => {
            document
              .getElementById('faq')
              ?.scrollIntoView({ behavior: 'smooth' })
          }, 0)
        }}
      />
      <NavMenuItem
        text={t`Discord`}
        onClick={onClickMenuItems}
        route="https://discord.gg/6jXrJSyDFf"
      />

      {!mobile && (
        <Dropdown
          overlay={resourcesMenu}
          overlayStyle={{ padding: 0 }}
          visible={resourcesOpen}
        >
          <div
            className="nav-menu-item hover-opacity"
            onClick={() => setResourcesOpen(!resourcesOpen)}
            style={{ ...navMenuItemStyles }}
          >
            <Trans>Resources</Trans>
            {resourcesOpen ? (
              <UpOutlined style={dropdownIconStyle} />
            ) : (
              <DownOutlined style={dropdownIconStyle} />
            )}
          </div>
        </Dropdown>
      )}
    </Space>
  )
}
