import { LinkOutlined } from '@ant-design/icons'
import { Autolinker } from 'autolinker'
import CurrencySymbol from 'components/shared/CurrencySymbol'
import FormattedAddress from 'components/shared/FormattedAddress'
import RichImgPreview from 'components/shared/RichImgPreview'
import { ProjectContext } from 'contexts/projectContext'
import { ThemeContext } from 'contexts/themeContext'
import { parsePayEventJson, PayEvent } from 'models/subgraph-entities/pay-event'
import { useContext, useEffect, useMemo, useState } from 'react'
import { formatHistoricalDate } from 'utils/formatDate'
import { formatWad } from 'utils/formatNumber'
import { querySubgraph, trimHexZero } from 'utils/graph'

import { contentLineHeight, smallHeaderStyle } from './styles'

// Maps a project id to an internal map of payment event overrides.
let payEventOverrides = new Map<string, Map<string, string>>([
  [
    '10',
    new Map<string, string>([
      ['Minted WikiToken for Page ID', 'WikiToken minted'],
    ]),
  ],
])

const parseLink = (note: string) => {
  const https = 'https://'
  const http = 'http://'

  if (note.includes(https)) {
    return https + note.split(https)[1].split(' ')[0]
  } else if (note.includes(http)) {
    return http + note.split(http)[1].split(' ')[0]
  }
}

export function PaymentActivity({
  pageSize,
  pageNumber,
  setLoading,
  setCount,
}: {
  pageSize: number
  pageNumber: number
  setLoading: (loading: boolean) => void
  setCount: (count: number) => void
}) {
  const { projectId } = useContext(ProjectContext)
  const {
    theme: { colors },
  } = useContext(ThemeContext)
  const [payEvents, setPayEvents] = useState<PayEvent[]>([])

  const usePayEventOverrides =
    projectId && payEventOverrides.has(projectId.toString())

  const formatPayEventOverride = (e: Partial<PayEvent>) => {
    if (!projectId) {
      return e.note
    }

    let override
    payEventOverrides
      .get(projectId.toString())
      ?.forEach((value: string, key: string) => {
        if (e.note?.includes(key)) {
          override = value
          return
        }
      })

    return override ? override : e.note
  }

  useEffect(() => {
    setLoading(true)

    querySubgraph(
      {
        entity: 'payEvent',
        keys: ['amount', 'beneficiary', 'note', 'timestamp', 'txHash'],
        first: pageSize,
        skip: pageNumber * pageSize,
        orderDirection: 'desc',
        orderBy: 'timestamp',
        where: projectId
          ? {
              key: 'project',
              value: trimHexZero(projectId.toHexString()),
            }
          : undefined,
      },
      res => {
        if (!res) return

        const newEvents = [...payEvents]
        newEvents.push(...res.payEvents.map(e => parsePayEventJson(e)))
        setPayEvents(newEvents)
        setLoading(false)
        setCount(newEvents.length)
      },
    )
  }, [projectId, pageSize, pageNumber])

  return useMemo(
    () => (
      <div>
        {payEvents.map(e => (
          <div
            style={{
              marginBottom: 20,
              paddingBottom: 20,
              borderBottom: '1px solid ' + colors.stroke.tertiary,
            }}
            key={e.id}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignContent: 'space-between',
              }}
            >
              <div>
                <div style={smallHeaderStyle(colors)}>Paid</div>
                <div
                  style={{
                    lineHeight: contentLineHeight,
                    fontSize: '1rem',
                  }}
                >
                  <CurrencySymbol currency={0} />
                  {formatWad(e.amount)}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                {e.timestamp && (
                  <div style={smallHeaderStyle(colors)}>
                    {formatHistoricalDate(e.timestamp * 1000)}{' '}
                    <a
                      className="quiet"
                      href={`https://etherscan.io/tx/${e.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <LinkOutlined />
                    </a>
                  </div>
                )}
                <div
                  style={{
                    ...smallHeaderStyle(colors),
                    lineHeight: contentLineHeight,
                  }}
                >
                  <FormattedAddress address={e.beneficiary} />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', marginTop: 5 }}>
              {e.note && (
                <RichImgPreview
                  src={parseLink(e.note)}
                  style={{ marginRight: 10 }}
                />
              )}

              {
                <div
                  style={{ color: colors.text.secondary }}
                  dangerouslySetInnerHTML={{
                    __html: Autolinker.link(
                      (usePayEventOverrides
                        ? formatPayEventOverride(e)
                        : e.note) ?? '',
                      {
                        sanitizeHtml: true,
                        className: 'quiet',
                        truncate: {
                          length: 30,
                          location: 'smart',
                        },
                      },
                    ),
                  }}
                ></div>
              }
            </div>
          </div>
        ))}
      </div>
    ),
    [payEvents, colors],
  )
}
