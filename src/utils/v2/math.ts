import { BigNumber } from '@ethersproject/bignumber'
import * as constants from '@ethersproject/constants'
import { invertPermyriad } from 'utils/bigNumbers'
import { fromWad, percentToPermyriad } from 'utils/formatNumber'
import { WeightFunction } from 'utils/math'

const TEN_THOUSAND = 10000
const ONE_BILLION = 1000000000

const MaxUint232 = constants.MaxUint256.add(1)
  .div(2 ** 24)
  .sub(1)
const MaxUint88 = 2 ** 88 - 1

export const MAX_RESERVED_RATE = TEN_THOUSAND
export const MAX_REDEMPTION_RATE = TEN_THOUSAND
export const MAX_DISCOUNT_RATE = ONE_BILLION
export const SPLITS_TOTAL_PERCENT = ONE_BILLION
const MAX_FEE = ONE_BILLION
export const MAX_DISTRIBUTION_LIMIT = MaxUint232

export const DEFAULT_MINT_RATE = 10 ** 6
export const MAX_MINT_RATE = Math.floor(MaxUint88 / 10 ** 18)

export const DEFAULT_FUNDING_CYCLE_DURATION = 14

/**
 * Express a given discount rate (parts-per-billion) as a percentage.
 * @param discountRate - discount rate as parts-per-billion.
 * @returns {string} discount rate expressed as a percentage.
 */
export const formatDiscountRate = (discountRate: BigNumber): string => {
  return (
    discountRate
      .mul(100)
      .div(MAX_DISCOUNT_RATE / 100)
      .toNumber() / 100
  ).toString()
}

/**
 * Express a given percentage as a discount rate (parts-per-billion).
 * @param percentage - value as a percentage.
 * @returns {BigNumber} percentage expressed as parts-per-billion.
 */
export const discountRateFrom = (percentage: string): BigNumber => {
  return BigNumber.from(
    Math.floor((parseFloat(percentage) * MAX_DISCOUNT_RATE) / 100),
  )
}

/**
 * Express a given split "percent" (parts-per-billion) as a percentage.
 * NOTE: splitPercent is named misleadingly. splitPercent is not a percentage (x/100)
 * It is express as parts-per-billion.
 * @param splitPercent - split "percent" as parts-per-billion.
 * @returns {string} split expressed as a percentage.
 */
export const formatSplitPercent = (splitPercent: BigNumber): string => {
  return (
    splitPercent
      .mul(100)
      .div(SPLITS_TOTAL_PERCENT / 100)
      .toNumber() / 100
  ).toString()
}

/**
 * Express a given split "percent" (parts-per-billion) as a percentage to the maximum precision.
 * @param splitPercent - split "percent" as parts-per-billion.
 * @returns {number} percentage (/100)
 */
export const preciseFormatSplitPercent = (
  percentPerBillion: number,
): number => {
  return parseFloat(
    ((percentPerBillion / SPLITS_TOTAL_PERCENT) * 100).toFixed(9),
  )
}

/**
 * Express a given [percentage] as a split "percent" (parts-per-billion).
 * NOTE: splitPercent is named misleadingly. splitPercent is not a percentage (x/100)
 * It is express as parts-per-billion.
 * @param percentage {float} - value as a percentage.
 * @returns {BigNumber} percentage expressed as parts-per-billion.
 */
export const splitPercentFrom = (percentage: number): BigNumber => {
  return percentage
    ? BigNumber.from(((percentage * SPLITS_TOTAL_PERCENT) / 100).toFixed())
    : BigNumber.from(0)
}

/**
 * Express a given reserved rate (parts-per-ten thousand) as a percentage.
 * @param reservedRate - reserved rate as parts-per-thousand.
 * @returns {string} reserved rate expressed as a percentage.
 */
export const formatReservedRate = (
  reservedRate: BigNumber | undefined,
): string => {
  return reservedRate
    ? (
        reservedRate
          .mul(100)
          .div(MAX_RESERVED_RATE / 100)
          .toNumber() / 100
      ).toString()
    : '0'
}

/**
 * Express a given [percentage] as a reserved rate (parts-per-ten thousand).
 * @param percentage - value as a percentage.
 * @returns {BigNumber} percentage expressed as parts-per-thousand.
 */
export const reservedRateFrom = (percentage: string): BigNumber => {
  return BigNumber.from(
    Math.floor((parseFloat(percentage) * MAX_RESERVED_RATE) / 100),
  )
}

/**
 * Express a given redemption rate (parts-per-ten thousand) as a percentage.
 * @param redemptionRate - redemption rate as parts-per-thousand.
 * @returns {string} redemption rate expressed as a percentage.
 */
export const formatRedemptionRate = (redemptionRate: BigNumber): string => {
  return (
    redemptionRate
      .mul(100)
      .div(MAX_REDEMPTION_RATE / 100)
      .toNumber() / 100
  ).toString()
}

/**
 * Express a given [percentage] as a redemption rate (parts-per-ten thousand).
 * @param percentage - value as a percentage.
 * @returns {BigNumber} percentage expressed as parts-per-thousand.
 */
export const redemptionRateFrom = (percentage: string): BigNumber => {
  return BigNumber.from(
    Math.floor((parseFloat(percentage) * MAX_REDEMPTION_RATE) / 100),
  )
}

/**
 * Express a given issuance rate [tokens / 1 ETH] as an issuance rate in parts per 1e18
 * @param issuanceRate - issuance rate as tokens / ETH
 * @returns {string} issuance rate in parts per 1e18
 */
export const issuanceRateFrom = (issuanceRate: string): string => {
  return constants.WeiPerEther.mul(issuanceRate).toString()
}

/**
 * Express a given issuance rate in parts per 1e18 as an issuance rate [tokens / 1 ETH]
 * @param {BigNumber} issuanceRate issuance rate in parts per 1e18
 * @returns {string} issuance rate in tokens / 1ETH
 */
export const formatIssuanceRate = (issuanceRate: string): string => {
  // Round down to nearest wei
  if (issuanceRate.split('.').length) {
    issuanceRate = issuanceRate.split('.')[0]
  }
  return BigNumber.from(issuanceRate).div(constants.WeiPerEther).toString()
}

/**
 * Express a given fee (parts-per-billion) as a percentage.
 * @param feePerBillion - fee as parts-per-billion.
 * @returns {string} fee expressed as a percentage.
 */
export const formatFee = (feePerBillion: BigNumber): string => {
  return (
    feePerBillion
      .mul(ONE_BILLION * 100)
      .div(MAX_FEE)
      .toNumber() / ONE_BILLION
  ).toString()
}

/**
 * Return a given [amountWad] weighted by a given [weight] and [reservedRatePermyriad].
 *
 * Typically only used by Juicebox V2 projects.
 *
 * @param weight - scalar value for weighting. Typically funding cycle weight.
 * @param reservedRatePermyriad - reserve rate, as a permyriad (x/10,000)
 * @param amountWad - amount to weight, as a wad.
 * @param outputType
 * @returns
 */
export const weightedAmount: WeightFunction = (
  weight: BigNumber | undefined,
  reservedRatePermyriad: number | undefined,
  amountWad: BigNumber | undefined,
  outputType: 'payer' | 'reserved',
): string => {
  if (!weight || !amountWad) return '0'

  if (reservedRatePermyriad === undefined) return '0'

  return (
    fromWad(
      amountWad
        .mul(weight)
        .mul(
          outputType === 'reserved'
            ? reservedRatePermyriad
            : invertPermyriad(BigNumber.from(reservedRatePermyriad)),
        )
        .div(percentToPermyriad(100)),
    ) ?? '0'
  )
}

export const feeForAmount = (
  amountWad: BigNumber | undefined,
  feePerBillion: BigNumber | undefined,
): BigNumber | undefined => {
  if (!feePerBillion || !amountWad) return
  return amountWad.mul(feePerBillion).div(ONE_BILLION)
}

export const amountSubFee = (
  amountWad?: BigNumber,
  feePerBillion?: BigNumber,
): BigNumber | undefined => {
  if (!feePerBillion || !amountWad) return
  const feeAmount = feeForAmount(amountWad, feePerBillion) ?? 0
  return amountWad.sub(feeAmount)
}
