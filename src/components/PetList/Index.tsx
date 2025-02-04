import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { Loader } from '../../components/Loader'
import { PetCard } from '../../components/PetCard'
import { PetCardType } from '../../constants/types'

interface Props {
  pets: PetCardType[]
  isLoading: boolean
}

export const PetList: FC<Props> = ({ pets, isLoading }) => {
  const navigate = useNavigate()

  const goToProfilePet = (id: string) => {
    navigate(`/pet/${id}`)
  }

  return (
    <div className="flex mt-10 flex-wrap w-full justify-between gap-5">
      {isLoading && (
        <div className="flex items-center justify-center w-full mt-32">
          <Loader big />
        </div>
      )}
      {pets &&
        pets.map((pet: PetCardType) => (
          <PetCard
            id={pet.id}
            key={pet.id}
            age={pet.age}
            name={pet.name}
            images={pet.images}
            gender={pet.gender}
            city={pet.location.city}
            goToProfile={goToProfilePet}
          />
        ))}
    </div>
  )
}
