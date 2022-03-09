import { t, Trans } from '@lingui/macro'
import { Collapse, Space } from 'antd'
import CollapsePanel from 'antd/lib/collapse/CollapsePanel'
import ExternalLink from 'components/shared/ExternalLink'
import { useState } from 'react'

import { DownOutlined, UpOutlined } from '@ant-design/icons'

function ResourcesItem({
  text,
  route,
  onClick,
}: {
  text: string
  route?: string
  onClick?: VoidFunction
}) {
  return (
    <ExternalLink
      className="nav-dropdown-item"
      href={route}
      onClick={onClick}
      style={{ fontWeight: 400 }}
    >
      {text}
    </ExternalLink>
  )
}

export default function ResourcesDropdownMobile() {
  const [activeKey, setActiveKey] = useState<0 | undefined>()
  const iconSize = 12

  // Close dropdown when clicking anywhere in the window
  window.addEventListener('click', () => setActiveKey(undefined), false)

  return (
    <div className="resources-dropdown">
      <Collapse
        style={{ border: 'none', marginLeft: 3 }}
        activeKey={activeKey}
        defaultActiveKey={undefined}
      >
        <CollapsePanel
          style={{
            border: 'none',
          }}
          key={0}
          showArrow={false}
          header={
            <Space
              onClick={e => {
                setActiveKey(activeKey === 0 ? undefined : 0)
                e.stopPropagation()
              }}
            >
              <span style={{ fontWeight: 600 }}>
                <Trans>Resources</Trans>
              </span>
              {activeKey === 0 ? (
                <UpOutlined style={{ fontSize: iconSize }} />
              ) : (
                <DownOutlined style={{ fontSize: iconSize }} />
              )}
            </Space>
          }
        >
          <ResourcesItem
            key="docs"
            text={t`Docs`}
            route="https://docs.juicebox.money"
            // onClick={onClickMenuItems}
          />
          <ResourcesItem
            key="blog"
            text={t`Blog`}
            route="https://blog.juicebox.money"
            // onClick={onClickMenuItems}
          />
          <ResourcesItem
            key="workspace"
            text={t`Workspace`}
            route="https://juicebox.notion.site/"
          />
          <ResourcesItem
            key="podcast"
            text={t`Podcast`}
            route="https://open.spotify.com/show/4G8ji7vofcOx2acXcjXIa4?si=1e5e6e171ed744e8"
            // onClick={onClickMenuItems}
          />
          <ResourcesItem
            key="peel"
            text={t`Peel`}
            route="https://discord.gg/XvmfY4Hkcz"
            // onClick={onClickMenuItems}
          />
        </CollapsePanel>
      </Collapse>
    </div>
  )
}
