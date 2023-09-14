import { CoverSkeleton } from './cover'
import { DescriptionSkeleton } from './description'
import { InitiativeInfoSkeleton } from './info'
import { LabelsSkeleton } from './labels'
import { PhotosSkeleton } from './photos'
import { PublicationsSkeleton } from './publications'
import { ReviewSkeleton } from './review'
import { VolunteersSkeleton } from './volunteers'

export default function Skeleton() {
  return (
    <>
      <CoverSkeleton />
      <LabelsSkeleton />
      <DescriptionSkeleton />
      <InitiativeInfoSkeleton />
      <PhotosSkeleton />
      <VolunteersSkeleton />
      <PublicationsSkeleton />
      <ReviewSkeleton />
    </>
  )
}
