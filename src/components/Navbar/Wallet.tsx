import FormattedAddress from 'components/shared/FormattedAddress'
import { LogoutOutlined } from '@ant-design/icons'
import { Trans } from '@lingui/macro'

import { NetworkContext } from 'contexts/networkContext'
import { ThemeContext } from 'contexts/themeContext'
import { CSSProperties, useContext } from 'react'
import { Dropdown, Menu } from 'antd'

import EtherscanLink from 'components/shared/EtherscanLink'
import CopyTextButton from 'components/shared/CopyTextButton'

import Balance from './Balance'
import juiceBoxShadow from 'constants/styles/boxShadow'

export default function Wallet({ userAddress }: { userAddress: string }) {
  const {
    isDarkMode,
    theme: { colors },
  } = useContext(ThemeContext)

  const height = 45

  const { onLogOut } = useContext(NetworkContext)

  const menuItemPadding = '10px 15px'

  const menu = (
    <Menu>
      <Menu.Item style={{ padding: menuItemPadding }} key={0}>
        <EtherscanLink value={userAddress} type="address" shortened={true} />{' '}
        <CopyTextButton value={userAddress} style={{ zIndex: 1 }} />
      </Menu.Item>
      <Menu.Item
        onClick={onLogOut}
        style={{
          padding: menuItemPadding,
          color: colors.text.primary,
          display: 'flex',
          justifyContent: 'space-between',
        }}
        key={1}
      >
        <Trans>Disconnect</Trans>
        <LogoutOutlined />
      </Menu.Item>
    </Menu>
  )

  return (
    <Dropdown
      overlay={menu}
      placement="bottomRight"
      overlayStyle={{ padding: 0 }}
    >
      <div
        style={{
          height,
          borderRadius: 2,
          padding: '4px 19px 7px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: colors.background.l2,
          cursor: 'default',
          userSelect: 'all',
        }}
      >
        <FormattedAddress address={userAddress} tooltipDisabled={true} />
        <Balance address={userAddress} />
      </div>
    </Dropdown>
  )
}
