import React from 'react'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import Title from 'components/commons/Title'
import ButtonsPet from 'containers/ProfilePets/ButtonsPet'
import ImageProfilePet from 'components/ImageProfilePet'
import InformationPet from 'components/InformationPet'
import GoogleMapsLocation from 'components/commons/GoogleMapsLocation'
import PetIdStore from 'stores/PetIdStore'
import TextCard from 'components/commons/TextCard'
import MedicalInformationDog from 'components/MedicalInformationDog'
import MedicalInformationCat from 'components/MedicalInformationCat'
import styles from './layoutProfilePets.scss'

const LayoutProfilePets = ({ store }) => {
  const { t } = useTranslation('profilePets')

  return (
    <>
      <div className={styles.header}>
        <Title title={t('title', { name: store.pet.name.value })} />
        <ButtonsPet
          email={store.pet.email}
          phone={store.pet.phone}
          pet={store.pet.pet}
          userCreatorExist={store.pet.userCreator}
        />
      </div>
      <div className={styles.colums}>
        <ImageProfilePet images={store.pet.images} />
        <GoogleMapsLocation
          petLocation={store.pet.textAddress}
          isProfilePet
          location={store.pet.foundLocation}
        />
      </div>
      <div className={styles.colums}>
        <InformationPet pet={store.pet} />
        {store.pet.category.value === 'dog' && <MedicalInformationDog pet={store.pet} />}
        {store.pet.category.value === 'cat' && <MedicalInformationCat pet={store.pet} />}
      </div>
      <div className={styles.colums}>
        <div>
          <TextCard title={t('history')} text={store.pet.history.value} />
        </div>
        <div>
          <TextCard title={t('history')} text={store.pet.history.value} />
        </div>
      </div>
    </>
  )
}

LayoutProfilePets.propTypes = {
  store: PropTypes.instanceOf(PetIdStore).isRequired,
}

export default observer(LayoutProfilePets)
