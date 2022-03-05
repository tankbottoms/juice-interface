import { Tooltip } from 'antd'

import { t } from '@lingui/macro'

import { NetworkName } from 'models/network-name'

import { LinkOutlined } from '@ant-design/icons'

import { readNetwork } from 'constants/networks'
import ExternalLink from './ExternalLink'

export default function EtherscanLink({
  value,
  type,
  shortened,
  showText,
}: {
  value: string | undefined
  type: 'tx' | 'address'
  shortened?: boolean
  showText?: boolean
}) {
  if (!value) return null
  let shortenedValue: string | undefined
  // Return first and last 4 chars of ETH address only
  if (shortened) {
    shortenedValue =
      value.substring(0, 6) + '...' + value.substring(value.length - 4)
  }

  let subdomain = ''
  if (readNetwork.name !== NetworkName.mainnet) {
    subdomain = readNetwork.name + '.'
  }

  const linkProps = {
    className: 'hover-action',
    style: { fontWeight: 400 },
    href: `https://${subdomain}etherscan.io/${type}/${value}`,
  }

  if (type === 'tx') {
    return (
      <Tooltip title={t`See transaction`}>
        <ExternalLink {...linkProps}>
          <LinkOutlined />
        </ExternalLink>
      </Tooltip>
    )
  }

  return (
    <Tooltip title={t`Go to Etherscan`}>
      <ExternalLink {...linkProps}>{shortenedValue ?? value}</ExternalLink>
    </Tooltip>
  )
}
