import FormattedAddress from 'components/shared/FormattedAddress'
import { LogoutOutlined } from '@ant-design/icons'
import { Trans } from '@lingui/macro'

import { NetworkContext } from 'contexts/networkContext'
import { ThemeContext } from 'contexts/themeContext'
import { useContext } from 'react'
import { Tooltip } from 'antd'

import EtherscanLink from 'components/shared/EtherscanLink'
import CopyTextButton from 'components/shared/CopyTextButton'

import Balance from './Balance'

export default function Wallet({ userAddress }: { userAddress: string }) {
  const { colors } = useContext(ThemeContext).theme

  const height = 45

  const { onLogOut } = useContext(NetworkContext)

  return (
    <Tooltip
      trigger={['hover', 'click']}
      title={
        <div>
          <div className="nav-dropdown-item">
            <EtherscanLink
              value={userAddress}
              type="address"
              shortened={true}
            />{' '}
            <CopyTextButton value={userAddress} />
          </div>
          <div className="nav-dropdown-item" onClick={onLogOut}>
            <LogoutOutlined />
            <div style={{ margin: '0 0 2px 13px' }}>
              <Trans>Disconnect</Trans>
            </div>
          </div>
        </div>
      }
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
    </Tooltip>
  )
}
