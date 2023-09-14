'use client'

import { FormInput, Spinner } from '@/components'
import { useAppSelector } from '@/redux/hooks'
import { currentUserSelector } from '@/redux/selectors/users'
import { usePostReviewMutation } from '@/redux/services/reviews.service'
import { useForm } from 'react-hook-form'
import { type Review as ReviewType } from '@/interfaces'

interface FormValues {
  body: string
}

interface Props {
  initiativeId: string
  review: ReviewType | undefined
}

const Review = (props: Props) => {
  const { initiativeId, review } = props
  const user = useAppSelector(currentUserSelector)

  const {
    register,
    formState: { isSubmitting, errors },
    handleSubmit,
    reset
  } = useForm<FormValues>({
    mode: 'onChange'
  })
  const [addReview] = usePostReviewMutation()

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const data = { ...formData, userIDs: user.id, initiativeId }
      await addReview({ ...data }).unwrap()
      reset()
    } catch (error) {
      console.error(error)
    }
  })

  return (
    <section>
      <h3 className='mb-3 text-xl text-blue-600'>{review !== undefined ? 'Reseñas' : 'Escribir Reseña'}</h3>
      <div className='mb-6 rounded-xl border border-gray-100 p-4 shadow-xl'>
        {review !== undefined ? (
          <div>
            <p>{review.body}</p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className='flex flex-col'>
            <FormInput
              type='textarea'
              name='body'
              placeholder='Escribir reseña'
              className='mb-4 resize-none border-none'
              rows={7}
              disabled={isSubmitting}
              hookForm={{
                register,
                validations: {
                  maxLength: { value: 350, message: 'Máximo 350 caracteres' },
                  minLength: { value: 10, message: 'Mínimo 10 caracteres' },
                  required: { value: true, message: 'Este campo es requerido' }
                }
              }}
              error={errors?.body?.message}
            />
            <button
              className='m-auto w-3/12 min-w-[140px] rounded-full bg-blue-500 px-[24px] py-[8px] text-lg font-bold text-white'
              disabled={isSubmitting}
            >
              {!isSubmitting ? 'Publicar' : <Spinner />}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

export default Review

export const ReviewSkeleton = () => {
  return <div className='mb-6 h-[250px] w-full animate-pulse bg-gray-700' />
}
