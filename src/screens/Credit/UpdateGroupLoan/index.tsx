import {StyleSheet, View} from 'react-native'
import React, {useCallback, useState} from 'react'
import {AppTheme} from '~/styles/Theme'
import {useAppStyles} from '~/hooks'
import AppHeader from '~/components/AppHeader'
import {Icons} from '~/assets'
import {scale} from '~/utils/scaleScreen'
import utils from '~/utils'
import AppScrollViewBody from '~/components/AppScrollViewBody'
import BoxView from '~/hoc/BoxView'
import AppText from '~/components/AppText'
import {FONTSFAMILY} from '~/styles/FontsFamily'
import AppButton from '~/components/AppButton'
import LoanCard from '../DetailCredit/components/LoanCard'
import TouchDropDown from '~/screens/components/TouchDropDown'
import {LOAN_GROUP} from '~/constants'
import {Screens} from '~/screens/Screens'
import useDetailCreditContract from '../hooks/useDetailCreditContract'
import useActionOnCreditContract from '../hooks/useActionOnCreditContract'

export const LIST_LOAN_GROUP = [
  'Chưa được phân loại',
  LOAN_GROUP['Group-1'],
  LOAN_GROUP['Group-2'],
  LOAN_GROUP['Group-3'],
  LOAN_GROUP['Group-4'],
  LOAN_GROUP['Group-5'],
]
const UpdateGroupLoan = props => {
  const {creditIdEncode} = utils.ngetParams(props, ['creditIdEncode'], {
    creditIdEncode: null,
  })
  const {detailCreditContract} = useDetailCreditContract({
    creditIdEncode: creditIdEncode,
  })

  const {THEME} = useAppStyles()
  const styles = useCallback(styleWithTheme, [THEME])(THEME)

  const contract_loanGroup =
    detailCreditContract?.generalInfoScreen?.generalInfo?.group || null
  const [loanGroup, setLoanGroup] = useState(
    contract_loanGroup === null ? LIST_LOAN_GROUP[0] : contract_loanGroup,
  )
  const {updateLoanGroup} = useActionOnCreditContract()

  const onBack = () => utils.goBackNavigation()

  const onSubmit = () => {
    if (loanGroup === LIST_LOAN_GROUP[0]) return
    updateLoanGroup({creditIdEncode: creditIdEncode, group: loanGroup})
  }

  const onSelectLoanGroup = () => {
    utils.navigate(Screens.name.Modal_DropdownPicker, {
      title: 'Chọn nhóm nợ',
      data: LIST_LOAN_GROUP,
      selectedOption: loanGroup,
      callbackSelectOption: value => {
        setLoanGroup(value)
      },
    })
  }

  return (
    <View style={styles.container}>
      <AppHeader
        title="Cập nhật nhóm nợ"
        styleHeader={styles.header}
        styleTitle={{color: THEME.colors.white}}
        iconLeft={Icons.icBack}
        styleIconLeft={{
          width: scale(24),
          height: scale(24),
          tintColor: THEME.colors.white,
        }}
        onPressLeft={onBack}
      />
      <AppScrollViewBody
        horizontalInit={scale(10)}
        contentContainerStyle={styles.content}>
        {/* {Danh sách người thực hiện} */}
        <BoxView>
          <AppText style={styles.title}>Danh sách vay</AppText>
          <LoanCard
            no={1}
            fullName="Nguyễn Văn A"
            idCitizen="035487512596"
            customerCode="KH0001"
          />
        </BoxView>

        {/* {Ý kiến xử lý} */}
        <BoxView style={{marginTop: scale(10), gap: THEME.sizes.mg10}}>
          <AppText style={styles.title}>Nhóm nợ:</AppText>
          <TouchDropDown value={loanGroup} onPress={onSelectLoanGroup} />
          <AppButton
            onPress={onSubmit}
            title="Cập nhật"
            styleButton={styles.button}
            styleTitle={{color: THEME.colors.white}}
          />
        </BoxView>
      </AppScrollViewBody>
    </View>
  )
}

export default UpdateGroupLoan

const styleWithTheme = (THEME: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: THEME.colors.background,
    },
    header: {
      backgroundColor: THEME.colors.primary,
    },
    content: {
      paddingTop: THEME.sizes.pd10,
    },
    title: {
      fontFamily: FONTSFAMILY.NunitoExtraBold,
      color: THEME.colors.primary,
    },
    input: {
      borderWidth: 0.5,
      borderColor: THEME.colors.border,
      textAlignVertical: 'top',
      padding: THEME.sizes.pd10,
      paddingTop: scale(10),
      borderRadius: scale(10),
      height: scale(100),
    },
    button: {
      alignSelf: 'center',
      paddingHorizontal: scale(20),
    },
  })
