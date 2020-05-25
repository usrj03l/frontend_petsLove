import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { observer, useLocalStore } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import { MdCancel, MdUpdate } from 'react-icons/md'
import { useHistory, useParams } from 'react-router'
import { SERVER } from 'services/config'
import c from 'classnames'
import Input from 'components/commons/Input'
import LayoutContainer from 'components/commons/LayoutContainer'
import Title from 'components/commons/Title'
import InputSelect from 'components/commons/InputSelect'
import InputCheckbox from 'components/commons/InputCheckbox'
import Textarea from 'components/commons/Textarea'
import CreatePetStore from 'stores/CreatePetStore'
import GoogleMapsLocation from 'components/commons/GoogleMapsLocation'
import ButtonsEditFixed from 'components/commons/ButtonsEditFixed'
import UserContext from 'Context/UserContext'
import ButtonsSaveFixed from 'components/commons/ButtonsSaveFixed'
import GoogleAutocomplete from 'components/commons/GoogleAutocomplete'
import SearchUsersStore from 'stores/SearchUsersStore'
import styles from './editPet.scss'
import Loading from '../../components/commons/Loading'

const EditPet = () => {
  const history = useHistory()
  const { id } = useParams()
  const [addressLocation, setAddress] = useState({})
  const [onlySave, setOnlySave] = useState(false)
  const fileUpload = useRef()
  const { t } = useTranslation('createPet')
  const rootStore = useContext(UserContext)
  const { optionsSelectsStore, authStore } = rootStore
  const createPetStore = useLocalStore(() => new CreatePetStore())
  const searchUsersStore = useLocalStore(() => new SearchUsersStore())

  const handleChangeImage = useCallback(e => {
    createPetStore.setImage(e.target.files)

    const fileList = Array.from(e.target.files)

    const mappedFiles = fileList.map(file => ({
      ...file,
      preview: URL.createObjectURL(file),
    }))

    createPetStore.setNewsPreviewsImage(mappedFiles)
  })

  const onClickFileUpload = useCallback(() => {
    fileUpload.current.click()
  }, [])

  const handleChangeName = useCallback(e => {
    createPetStore.setName(e.target.value)
  }, [])

  const handleChangeCategory = useCallback(selectedValue => {
    createPetStore.setCategory(selectedValue)
  }, [])

  const handleUserAdopter = useCallback(selectedValue => {
    createPetStore.setUserAdopter(selectedValue)
  }, [])

  const handleTransitUser = useCallback(selectedValue => {
    createPetStore.setTransitUser(selectedValue)
  }, [])

  const handleChangeAddress = useCallback(address => {
    setAddress(address)
    createPetStore.setAddress(address)
  }, [])

  const handleChangeTextAddress = useCallback(address => {
    createPetStore.setTextAddress(address)
  }, [])

  const handleChangeUrgent = useCallback(() => {
    createPetStore.setUrgent()
  }, [])

  const handleChangeLost = useCallback(() => {
    createPetStore.setLost()
  }, [])

  const handleChangeAdopted = useCallback(() => {
    createPetStore.setAdopted()
  }, [])

  const handleChangeSterilized = useCallback(() => {
    createPetStore.setSterilized()
  }, [])

  const handleChangeVaccinated = useCallback(() => {
    createPetStore.setVaccinated()
  }, [])

  const handleChangeGender = useCallback(selectedValue => {
    createPetStore.setGender(selectedValue)
  }, [])

  const handleChangeAge = useCallback(selectedValue => {
    createPetStore.setAge(selectedValue)
  }, [])

  const handleChangeHistory = useCallback(e => {
    createPetStore.setHistory(e.target.value)
  }, [])

  const handleChangeRequired = useCallback(e => {
    createPetStore.setRequiredToAdoption(e.target.value)
  }, [])

  const handleChangeActivity = useCallback(selectedValue => {
    createPetStore.setActivity(selectedValue)
  }, [])

  const handleCancelEdit = useCallback(() => {
    createPetStore.setCancelEdit()
  }, [])

  const handleEdit = useCallback(() => {
    createPetStore.setEdit()
  }, [])

  const handleBack = useCallback(() => {
    history.push(`/profile-pets/${id}`)
  }, [])

  const deleteImage = useCallback(image => {
    createPetStore.deleteImageArray(image)
  }, [])

  const deleteImageNewPreviews = useCallback(image => {
    createPetStore.deleteNewPreviewsImage(image)
  }, [])

  const handleSave = useCallback(() => {
    if (id) {
      createPetStore.saveEdit(id)
    } else {
      createPetStore.save(authStore.user._id)
    }
  }, [])

  useEffect(() => {
    optionsSelectsStore.listGender()
    optionsSelectsStore.listActiviy()
    optionsSelectsStore.listAges()
    optionsSelectsStore.listCategories()
    searchUsersStore.searchUser('adopter')
    searchUsersStore.searchUserTransit('transitUser')

    if (id) {
      createPetStore.searchPetForId(id)
      createPetStore.setCancelEdit()
    } else {
      createPetStore.setEdit()
      setOnlySave(true)
    }

    if (createPetStore.requestSuccess) {
      history.push('/')
      history.push(`/profile-pets/${createPetStore.idPet}`)
    }
  }, [createPetStore.requestSuccess])

  if (authStore.isLoading) {
    return <Loading loadingRing />
  }

  return (
    <LayoutContainer
      viewButtonBack
      handleBack={handleBack}
      title={t('edit')}
      textButton={t('backPets')}
    >
      <Title subTitle={t('subtitle')} />
      <div className={styles.containerImagePreview}>
        {createPetStore.newPreviewsImage &&
          createPetStore.newPreviewsImage.map(image => {
            return (
              <div className={styles.containerImage}>
                <img className={styles.imagePreview} src={image.preview} alt="pets" />
                <div className={styles.middle}>
                  <div
                    onClick={() => deleteImageNewPreviews(image.preview)}
                    className={styles.containerIcon}
                  >
                    <MdCancel className={styles.iconImage} size={20} />
                  </div>
                </div>
              </div>
            )
          })}
        {createPetStore.imagePreview &&
          createPetStore.imagePreview.map(image => {
            return (
              <div className={styles.containerImage}>
                <img className={styles.imagePreview} src={`${SERVER}/${image}`} alt="pets" />
                <div className={styles.middle}>
                  <div onClick={() => deleteImage(image)} className={styles.containerIcon}>
                    <MdCancel className={styles.iconImage} size={20} />
                  </div>
                </div>
              </div>
            )
          })}
      </div>
      <div className={styles.containerForm}>
        {createPetStore.isEdit && (
          <div className={styles.colInputImage}>
            <input
              multiple
              ref={fileUpload}
              className={styles.inputFile}
              onChange={handleChangeImage}
              type="file"
              placeholder={t('placeholderImages')}
            />
            <label onClick={onClickFileUpload} className={c(styles.textInput, styles.btnTertiary)}>
              <MdUpdate className={styles.icon} size={15} />
              <span className={styles.jsFileName}>Choose a file</span>
            </label>
          </div>
        )}
        {authStore.user.rol !== 'adopter' && (
          <>
            <div className={styles.colContainerCheckbox}>
              <InputCheckbox
                isEdit
                value={createPetStore.pet.adopted}
                handleChange={handleChangeAdopted}
                text={t('adoptedPet')}
              />
            </div>
            <div className={styles.col}>
              <InputSelect
                isEdit={createPetStore.isEdit}
                options={searchUsersStore.arrayUsersTransit}
                handleChange={handleUserAdopter}
                placeholder={t('assignUser')}
              />
            </div>
          </>
        )}
        {authStore.user.rol !== 'adopter' && authStore.user.rol !== 'transitUser' && (
          <>
            <div className={styles.col}>
              <InputSelect
                isEdit={createPetStore.isEdit}
                options={searchUsersStore.arrayUsersTransit}
                handleChange={handleTransitUser}
                placeholder={t('assignUserTransit')}
              />
            </div>
          </>
        )}
        <div className={styles.col}>
          <Input
            isEdit={createPetStore.isEdit}
            value={createPetStore.pet.name.value}
            handleChange={handleChangeName}
            placeholder={t('placeholderName')}
          />
        </div>
        <div className={styles.col}>
          <InputSelect
            isEdit={createPetStore.isEdit}
            value={createPetStore.pet.category.value}
            options={optionsSelectsStore.categories}
            handleChange={handleChangeCategory}
            placeholder={t('categoryPets')}
          />
        </div>
        <div className={styles.col}>
          <InputSelect
            isEdit={createPetStore.isEdit}
            value={createPetStore.pet.gender.value}
            options={optionsSelectsStore.gender}
            handleChange={handleChangeGender}
            placeholder={t('gender')}
          />
        </div>
        <div className={styles.colContainerCheckbox}>
          <div className={styles.colCheckbox}>
            <InputCheckbox
              isEdit
              handleChange={handleChangeUrgent}
              value={createPetStore.pet.urgent}
              text={t('urgent')}
            />
          </div>
          <div className={styles.colCheckbox}>
            <InputCheckbox
              handleChange={handleChangeLost}
              isEdit
              value={createPetStore.pet.lost}
              text={t('lost')}
            />
          </div>
        </div>
        <div className={styles.colContainerCheckbox}>
          <div className={styles.colCheckbox}>
            <InputCheckbox
              isEdit
              handleChange={handleChangeSterilized}
              value={createPetStore.pet.sterilized}
              text={t('sterilized')}
            />
          </div>
          <div className={styles.colCheckbox}>
            <InputCheckbox
              isEdit
              handleChange={handleChangeVaccinated}
              value={createPetStore.pet.vaccinated}
              text={t('vaccinated')}
            />
          </div>
        </div>
        <div className={styles.col}>
          <InputSelect
            isEdit={createPetStore.isEdit}
            value={createPetStore.pet.age.value}
            options={optionsSelectsStore.ages}
            handleChange={handleChangeAge}
            placeholder={t('age')}
          />
        </div>
        <div className={styles.col}>
          <Textarea
            isEdit={createPetStore.isEdit}
            rows={4}
            value={createPetStore.pet.history.value}
            handleChange={handleChangeHistory}
            placeholder={t('history')}
          />
        </div>
        <div className={styles.col}>
          <Textarea
            isEdit={createPetStore.isEdit}
            rows={4}
            value={createPetStore.pet.requiredToAdoption.value}
            handleChange={handleChangeRequired}
            placeholder={t('RequiredToAdoption')}
          />
        </div>
        <div className={styles.col}>
          <InputSelect
            isEdit={createPetStore.isEdit}
            value={createPetStore.pet.activity.value}
            options={optionsSelectsStore.activity}
            handleChange={handleChangeActivity}
            placeholder={t('activity')}
          />
        </div>
        <div className={styles.colMap}>
          <GoogleAutocomplete
            isEdit={createPetStore.isEdit}
            label="Address pet"
            placeholder="Add address pet"
            value={createPetStore.pet.textAddress.value}
            handleChangeTextAddress={handleChangeTextAddress}
            handleChangeAddress={handleChangeAddress}
          />
          {addressLocation.lat && (
            <div className={styles.containerMap}>
              <GoogleMapsLocation
                addressValue={createPetStore.address}
                showAddress
                location={addressLocation}
                title={t('messageMap')}
              />
            </div>
          )}
        </div>
        {onlySave && <ButtonsSaveFixed handleSave={handleSave} />}
        {!onlySave && (
          <ButtonsEditFixed
            isEdit={createPetStore.isEdit}
            handleEdit={handleEdit}
            handleSave={handleSave}
            handleCancelEdit={handleCancelEdit}
          />
        )}
      </div>
    </LayoutContainer>
  )
}

export default observer(EditPet)
