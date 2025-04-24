// Data types for electricity consumption
export interface ElectricityBill {
  id: number
  billed_on: string
  billing_period_from: string
  billing_period_to: string
  electricity_consumption: number // in watts
  electricity_amount: number
  delivery_charge: number
  supply_charge: number
  total_amount: number
  meters: Array<{
    id: string
    type: string
    billing_period_from: string
    billing_period_to: string
    consumption: number
    address: {
      line_1: string
      line_2: string | null
      city: string
      state: string
      postal_code: string
    }
  }>
}

// 2023 electricity consumption data (provided)
export const electricity2023Data: ElectricityBill[] = [
  {
    id: 143485,
    billed_on: "2023-12-29",
    billing_period_from: "2023-11-22",
    billing_period_to: "2023-12-21",
    electricity_consumption: 240903,
    electricity_amount: 7688,
    delivery_charge: 4522,
    supply_charge: 3166,
    total_amount: 7688,
    meters: [
      {
        id: "1005012345",
        type: "electric",
        billing_period_from: "2023-11-22",
        billing_period_to: "2023-12-21",
        consumption: 240903,
        address: {
          line_1: "123 Street Rd",
          line_2: null,
          city: "San Francisco",
          state: "CA",
          postal_code: "94102",
        },
      },
    ],
  },
  {
    id: 143486,
    billed_on: "2023-11-30",
    billing_period_from: "2023-10-24",
    billing_period_to: "2023-11-21",
    electricity_consumption: 246404,
    electricity_amount: 7861,
    delivery_charge: 4625,
    supply_charge: 3236,
    total_amount: 7861,
    meters: [
      {
        id: "1005012345",
        type: "electric",
        billing_period_from: "2023-10-24",
        billing_period_to: "2023-11-21",
        consumption: 246404,
        address: {
          line_1: "123 Street Rd",
          line_2: null,
          city: "San Francisco",
          state: "CA",
          postal_code: "94102",
        },
      },
    ],
  },
  {
    id: 143487,
    billed_on: "2023-10-30",
    billing_period_from: "2023-09-22",
    billing_period_to: "2023-10-23",
    electricity_consumption: 263904,
    electricity_amount: 8815,
    delivery_charge: 5236,
    supply_charge: 3579,
    total_amount: 8815,
    meters: [
      {
        id: "1005012345",
        type: "electric",
        billing_period_from: "2023-09-22",
        billing_period_to: "2023-10-23",
        consumption: 263904,
        address: {
          line_1: "123 Street Rd",
          line_2: null,
          city: "San Francisco",
          state: "CA",
          postal_code: "94102",
        },
      },
    ],
  },
  {
    id: 143488,
    billed_on: "2023-09-28",
    billing_period_from: "2023-08-23",
    billing_period_to: "2023-09-21",
    electricity_consumption: 276874,
    electricity_amount: 10437,
    delivery_charge: 6298,
    supply_charge: 4139,
    total_amount: 10437,
    meters: [
      {
        id: "1005012345",
        type: "electric",
        billing_period_from: "2023-08-23",
        billing_period_to: "2023-09-21",
        consumption: 276874,
        address: {
          line_1: "123 Street Rd",
          line_2: null,
          city: "San Francisco",
          state: "CA",
          postal_code: "94102",
        },
      },
    ],
  },
  {
    id: 143489,
    billed_on: "2023-08-29",
    billing_period_from: "2023-07-25",
    billing_period_to: "2023-08-22",
    electricity_consumption: 262057,
    electricity_amount: 9786,
    delivery_charge: 5855,
    supply_charge: 3931,
    total_amount: 9786,
    meters: [
      {
        id: "1005012345",
        type: "electric",
        billing_period_from: "2023-07-25",
        billing_period_to: "2023-08-22",
        consumption: 262057,
        address: {
          line_1: "123 Street Rd",
          line_2: null,
          city: "San Francisco",
          state: "CA",
          postal_code: "94102",
        },
      },
    ],
  },
  {
    id: 143490,
    billed_on: "2023-07-31",
    billing_period_from: "2023-06-23",
    billing_period_to: "2023-07-24",
    electricity_consumption: 275522,
    electricity_amount: 10168,
    delivery_charge: 6036,
    supply_charge: 4132,
    total_amount: 10168,
    meters: [
      {
        id: "1005012345",
        type: "electric",
        billing_period_from: "2023-06-23",
        billing_period_to: "2023-07-24",
        consumption: 275522,
        address: {
          line_1: "123 Street Rd",
          line_2: null,
          city: "San Francisco",
          state: "CA",
          postal_code: "94102",
        },
      },
    ],
  },
  {
    id: 143491,
    billed_on: "2023-06-29",
    billing_period_from: "2023-05-24",
    billing_period_to: "2023-06-22",
    electricity_consumption: 297194,
    electricity_amount: 10116,
    delivery_charge: 5835,
    supply_charge: 4281,
    total_amount: 10116,
    meters: [
      {
        id: "1005012345",
        type: "electric",
        billing_period_from: "2023-05-24",
        billing_period_to: "2023-06-22",
        consumption: 297194,
        address: {
          line_1: "123 Street Rd",
          line_2: null,
          city: "San Francisco",
          state: "CA",
          postal_code: "94102",
        },
      },
    ],
  },
  {
    id: 143492,
    billed_on: "2023-05-31",
    billing_period_from: "2023-04-25",
    billing_period_to: "2023-05-23",
    electricity_consumption: 282353,
    electricity_amount: 8552,
    delivery_charge: 4815,
    supply_charge: 3737,
    total_amount: 8552,
    meters: [
      {
        id: "1005012345",
        type: "electric",
        billing_period_from: "2023-04-25",
        billing_period_to: "2023-05-23",
        consumption: 282353,
        address: {
          line_1: "123 Street Rd",
          line_2: null,
          city: "San Francisco",
          state: "CA",
          postal_code: "94102",
        },
      },
    ],
  },
  {
    id: 143493,
    billed_on: "2023-05-01",
    billing_period_from: "2023-03-24",
    billing_period_to: "2023-04-24",
    electricity_consumption: 268851,
    electricity_amount: 8139,
    delivery_charge: 4577,
    supply_charge: 3562,
    total_amount: 8139,
    meters: [
      {
        id: "1005012345",
        type: "electric",
        billing_period_from: "2023-03-24",
        billing_period_to: "2023-04-24",
        consumption: 268851,
        address: {
          line_1: "123 Street Rd",
          line_2: null,
          city: "San Francisco",
          state: "CA",
          postal_code: "94102",
        },
      },
    ],
  },
]

// Generate 2022 electricity consumption data (higher consumption to show improvement in 2023)
export const electricity2022Data: ElectricityBill[] = [
  {
    id: 123485,
    billed_on: "2022-12-29",
    billing_period_from: "2022-11-22",
    billing_period_to: "2022-12-21",
    electricity_consumption: 290903,
    electricity_amount: 9288,
    delivery_charge: 5522,
    supply_charge: 3766,
    total_amount: 9288,
    meters: [
      {
        id: "1005012345",
        type: "electric",
        billing_period_from: "2022-11-22",
        billing_period_to: "2022-12-21",
        consumption: 290903,
        address: {
          line_1: "123 Street Rd",
          line_2: null,
          city: "San Francisco",
          state: "CA",
          postal_code: "94102",
        },
      },
    ],
  },
  {
    id: 123486,
    billed_on: "2022-11-30",
    billing_period_from: "2022-10-24",
    billing_period_to: "2022-11-21",
    electricity_consumption: 296404,
    electricity_amount: 9461,
    delivery_charge: 5625,
    supply_charge: 3836,
    total_amount: 9461,
    meters: [
      {
        id: "1005012345",
        type: "electric",
        billing_period_from: "2022-10-24",
        billing_period_to: "2022-11-21",
        consumption: 296404,
        address: {
          line_1: "123 Street Rd",
          line_2: null,
          city: "San Francisco",
          state: "CA",
          postal_code: "94102",
        },
      },
    ],
  },
  {
    id: 123487,
    billed_on: "2022-10-30",
    billing_period_from: "2022-09-22",
    billing_period_to: "2022-10-23",
    electricity_consumption: 313904,
    electricity_amount: 10415,
    delivery_charge: 6236,
    supply_charge: 4179,
    total_amount: 10415,
    meters: [
      {
        id: "1005012345",
        type: "electric",
        billing_period_from: "2022-09-22",
        billing_period_to: "2022-10-23",
        consumption: 313904,
        address: {
          line_1: "123 Street Rd",
          line_2: null,
          city: "San Francisco",
          state: "CA",
          postal_code: "94102",
        },
      },
    ],
  },
  {
    id: 123488,
    billed_on: "2022-09-28",
    billing_period_from: "2022-08-23",
    billing_period_to: "2022-09-21",
    electricity_consumption: 326874,
    electricity_amount: 12037,
    delivery_charge: 7298,
    supply_charge: 4739,
    total_amount: 12037,
    meters: [
      {
        id: "1005012345",
        type: "electric",
        billing_period_from: "2022-08-23",
        billing_period_to: "2022-09-21",
        consumption: 326874,
        address: {
          line_1: "123 Street Rd",
          line_2: null,
          city: "San Francisco",
          state: "CA",
          postal_code: "94102",
        },
      },
    ],
  },
  {
    id: 123489,
    billed_on: "2022-08-29",
    billing_period_from: "2022-07-25",
    billing_period_to: "2022-08-22",
    electricity_consumption: 312057,
    electricity_amount: 11386,
    delivery_charge: 6855,
    supply_charge: 4531,
    total_amount: 11386,
    meters: [
      {
        id: "1005012345",
        type: "electric",
        billing_period_from: "2022-07-25",
        billing_period_to: "2022-08-22",
        consumption: 312057,
        address: {
          line_1: "123 Street Rd",
          line_2: null,
          city: "San Francisco",
          state: "CA",
          postal_code: "94102",
        },
      },
    ],
  },
  {
    id: 123490,
    billed_on: "2022-07-31",
    billing_period_from: "2022-06-23",
    billing_period_to: "2022-07-24",
    electricity_consumption: 325522,
    electricity_amount: 11768,
    delivery_charge: 7036,
    supply_charge: 4732,
    total_amount: 11768,
    meters: [
      {
        id: "1005012345",
        type: "electric",
        billing_period_from: "2022-06-23",
        billing_period_to: "2022-07-24",
        consumption: 325522,
        address: {
          line_1: "123 Street Rd",
          line_2: null,
          city: "San Francisco",
          state: "CA",
          postal_code: "94102",
        },
      },
    ],
  },
  {
    id: 123491,
    billed_on: "2022-06-29",
    billing_period_from: "2022-05-24",
    billing_period_to: "2022-06-22",
    electricity_consumption: 347194,
    electricity_amount: 11716,
    delivery_charge: 6835,
    supply_charge: 4881,
    total_amount: 11716,
    meters: [
      {
        id: "1005012345",
        type: "electric",
        billing_period_from: "2022-05-24",
        billing_period_to: "2022-06-22",
        consumption: 347194,
        address: {
          line_1: "123 Street Rd",
          line_2: null,
          city: "San Francisco",
          state: "CA",
          postal_code: "94102",
        },
      },
    ],
  },
  {
    id: 123492,
    billed_on: "2022-05-31",
    billing_period_from: "2022-04-25",
    billing_period_to: "2022-05-23",
    electricity_consumption: 332353,
    electricity_amount: 10052,
    delivery_charge: 5815,
    supply_charge: 4237,
    total_amount: 10052,
    meters: [
      {
        id: "1005012345",
        type: "electric",
        billing_period_from: "2022-04-25",
        billing_period_to: "2022-05-23",
        consumption: 332353,
        address: {
          line_1: "123 Street Rd",
          line_2: null,
          city: "San Francisco",
          state: "CA",
          postal_code: "94102",
        },
      },
    ],
  },
  {
    id: 123493,
    billed_on: "2022-05-01",
    billing_period_from: "2022-03-24",
    billing_period_to: "2022-04-24",
    electricity_consumption: 318851,
    electricity_amount: 9639,
    delivery_charge: 5577,
    supply_charge: 4062,
    total_amount: 9639,
    meters: [
      {
        id: "1005012345",
        type: "electric",
        billing_period_from: "2022-03-24",
        billing_period_to: "2022-04-24",
        consumption: 318851,
        address: {
          line_1: "123 Street Rd",
          line_2: null,
          city: "San Francisco",
          state: "CA",
          postal_code: "94102",
        },
      },
    ],
  },
]

// Helper function to process electricity data for charts
export function processElectricityData(data: ElectricityBill[]) {
  // Sort data by billing period start date
  const sortedData = [...data].sort(
    (a, b) => new Date(a.billing_period_from).getTime() - new Date(b.billing_period_from).getTime(),
  )

  // Convert to chart-friendly format and convert watts to kilowatts
  return sortedData.map((bill) => {
    // Extract month from billing period
    const periodStart = new Date(bill.billing_period_from)
    const month = periodStart.toLocaleString("default", { month: "short" })

    // Convert watts to kilowatts
    const consumptionKW = bill.electricity_consumption / 1000

    return {
      id: bill.id,
      month,
      periodStart: bill.billing_period_from,
      periodEnd: bill.billing_period_to,
      consumption: consumptionKW,
      amount: bill.electricity_amount,
      total: bill.total_amount,
    }
  })
}

// Calculate year-over-year comparison
export function calculateYearOverYearComparison(data2022: ElectricityBill[], data2023: ElectricityBill[]) {
  const total2022 = data2022.reduce((sum, bill) => sum + bill.electricity_consumption, 0)
  const total2023 = data2023.reduce((sum, bill) => sum + bill.electricity_consumption, 0)

  const difference = total2022 - total2023
  const percentChange = (difference / total2022) * 100

  return {
    total2022: total2022 / 1000, // Convert to kilowatts
    total2023: total2023 / 1000, // Convert to kilowatts
    difference: difference / 1000, // Convert to kilowatts
    percentChange: percentChange,
  }
}
