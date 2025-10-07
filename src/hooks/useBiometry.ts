import React from 'react'
import ReactNativeBiometrics, {
  BiometryType,
  BiometryTypes,
} from 'react-native-biometrics'
import {KJUR} from 'jsrsasign'
import {decode} from 'base-64'

export type TypeBiometry = BiometryType | undefined

const useBiometry = () => {
  const rnBiometrics = new ReactNativeBiometrics({
    allowDeviceCredentials: true,
  })
  const [typeBio, setTypeBio] = React.useState<TypeBiometry>(undefined)
  const [keyPublicBio, setKeyPublicBio] = React.useState('')
  const [exitsKey, setExitsKey] = React.useState(false)

  React.useEffect(() => {
    checkBiometry()
  }, [])

  const checkBiometry = async () => {
    const {biometryType} = await rnBiometrics.isSensorAvailable()
    __DEV__ && console.log('BiometryTypes:', biometryType)
    if (
      biometryType === BiometryTypes.FaceID ||
      biometryType === BiometryTypes.TouchID ||
      biometryType === BiometryTypes.Biometrics
    ) {
      setTypeBio(biometryType)
    } else {
      setTypeBio(undefined)
    }
  }

  const createKeysPublicBio = async () => {
    try {
      const resultObject = await rnBiometrics.createKeys()
      const {publicKey} = resultObject
      __DEV__ && console.log('Keys biomestry public: ', publicKey)
      setKeyPublicBio(publicKey)
      return publicKey
    } catch (error) {
      return ''
    }
  }

  const checkExitsKeys = async () => {
    const resultObject = await rnBiometrics.biometricKeysExist()
    const {keysExist} = resultObject
    __DEV__ && console.log('Exits key', keysExist)
    setExitsKey(keysExist)
    return keysExist
  }

  const deleteKey = async () => {
    const resultObject = await rnBiometrics.deleteKeys()
    const {keysDeleted} = resultObject
    if (keysDeleted) {
      __DEV__ && console.log('Successful deletion')
      return true
    } else {
      __DEV__ &&
        console.log(
          'Unsuccessful deletion because there were no keys to delete',
        )
      return false
    }
  }

  const verifySignature = (
    signature: string,
    payload: string,
    publicKeyBase64: string,
  ) => {
    try {
      const publicKeyPem = convertBase64ToPem(publicKeyBase64)
      const sig = new KJUR.crypto.Signature({alg: 'SHA256withRSA'})
      sig.init(publicKeyPem)
      sig.updateString(payload)

      // Convert signature from Base64 to Hex
      const hexSignature = base64ToHex(signature)

      return sig.verify(hexSignature)
    } catch (error) {
      console.error('Signature verification failed', error)
      return false
    }
  }

  const convertBase64ToPem = (base64: string) => {
    const lines = []
    for (let i = 0; i < base64.length; i += 64) {
      lines.push(base64.substring(i, i + 64))
    }
    return `-----BEGIN PUBLIC KEY-----\n${lines.join(
      '\n',
    )}\n-----END PUBLIC KEY-----`
  }

  const base64ToHex = (base64: string) => {
    const raw = decode(base64)
    let hex = ''
    for (let i = 0; i < raw.length; i++) {
      const hexChar = raw.charCodeAt(i).toString(16)
      hex += (hexChar.length === 1 ? '0' : '') + hexChar
    }
    return hex.toUpperCase()
  }

  return {
    typeBio,
    keyPublicBio,
    exitsKey,
    checkExitsKeys,
    createKeysPublicBio,
    deleteKey,
    rnBiometrics,
    verifySignature,
  }
}

export default useBiometry
