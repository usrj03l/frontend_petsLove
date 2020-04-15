import React from 'react'
import ImageInformationLeft from 'components/commons/ImageInformationLeft'
import Navbar from 'components/commons/Navbar'
import FormForgotPassword from 'components/FormForgotPassword'
import LayoutTrantitions from 'components/commons/LayoutTrantitions'
import catImage from './imageCat.jpg'
import styles from './forgotPassword.scss'

const ForgotPassword = () => {
  return (
    <Navbar>
      <LayoutTrantitions>
        <div className={styles.containerForgotPassword}>
          <ImageInformationLeft image={catImage} />
          <div className={styles.containerForm}>
            <FormForgotPassword />
          </div>
        </div>
      </LayoutTrantitions>
    </Navbar>
  )
}

export default ForgotPassword
