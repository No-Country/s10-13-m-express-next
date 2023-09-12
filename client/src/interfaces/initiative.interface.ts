import { UserInterface } from '.'

export interface InitiativeInterface {
  id: string
  title: string
  description: string
  deadLine: Date
  startDate: Date
  endDate: Date
  galery: string
  thumbnail: any
  volunteers: any[]
  categories: string[]
  opportunities: string[]
  country: string
  province: string
  languages: string[]
  themes: string[]
  reviews: string[]
  posts: string[]
  ownerId: string
  startHour: string
  endHour: string
  owner: UserInterface
  extraInfo: string
}
