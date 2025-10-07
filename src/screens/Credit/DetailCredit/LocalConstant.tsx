import {Image, StyleSheet} from 'react-native'
import React from 'react'
import {scale} from '~/utils/scaleScreen'
import {useAppStyles} from '~/hooks'
import {FAB_CREDIT} from '~/constants'
import {Icons} from '~/assets'
import {RolesButton} from '../hooks/useDetailCreditContract'

export interface TabRoute {
  key: string
  title: string
}

const LocalConstant = () => {
  const {THEME} = useAppStyles()
  const {colors} = THEME

  const StaticMenu = (rolesButton: RolesButton) => {
    const list = []

    if (rolesButton?.isDenied) {
      list.push({
        icon: <Image source={Icons.icActionReject} style={[styles.fab_icon]} />,
        name: FAB_CREDIT.Reject,
        color: colors.fab.orange,
        text: FAB_CREDIT.Reject,
        styleText: {
          color: colors.fab.orange,
        },
      })
    }

    if (rolesButton?.isApproval) {
      list.push({
        icon: (
          <Image source={Icons.icActionConfirm} style={[styles.fab_icon]} />
        ),
        name: FAB_CREDIT.Approve,
        color: colors.fab.forestGreen,
        text: FAB_CREDIT.Approve,
        styleText: {
          color: colors.fab.oliveGreen,
        },
      })
    }

    // if (true) {
    //   list.push({
    //     icon: <Image source={Icons.icActionEye} style={[styles.fab_icon]} />,
    //     name: FAB_CREDIT.Tracking,
    //     color: colors.fab.brown,
    //     text: FAB_CREDIT.Tracking,
    //     styleText: {
    //       color: colors.fab.oliveGreen,
    //     },
    //   })
    // }

    return list
  }

  const HiddenMenu = (rolesButton: RolesButton) => {
    const list = [
      {
        icon: <Image source={Icons.icOptions} style={styles.fab_icon} />,
        name: 'Default',
        color: colors.fab.darkGray,
      },
    ]
    if (rolesButton?.isDebtGroupUpdate) {
      list.push({
        icon: <Image source={Icons.icRefund} style={styles.fab_icon} />,
        name: FAB_CREDIT.UpdateLoanGroup,
        color: colors.fab.yellow,
        text: FAB_CREDIT.UpdateLoanGroup,
        styleText: {
          color: colors.fab.yellow,
        },
      })
    }

    if (rolesButton?.isReturnToSender) {
      list.push({
        icon: <Image source={Icons.icUndo} style={styles.fab_icon} />,
        name: FAB_CREDIT.ReturnToInitiator,
        color: colors.fab.darkBlue,
        text: FAB_CREDIT.ReturnToInitiator,
        styleText: {
          color: colors.fab.darkBlue,
        },
      })
    }

    if (rolesButton?.isLoanCompleted) {
      list.push({
        icon: <Image source={Icons.icCheckBadge} style={styles.fab_icon} />,
        name: FAB_CREDIT.CompleteLoan,
        color: colors.fab.forestGreen,
        text: FAB_CREDIT.CompleteLoan,
        styleText: {
          color: colors.fab.forestGreen,
        },
      })
    }

    if (rolesButton?.isLoanCompleted) {
      list.push({
        icon: (
          <Image
            source={Icons.icUndo}
            style={[styles.fab_icon, {tintColor: THEME.colors.white}]}
          />
        ),
        name: FAB_CREDIT.Recall,
        color: colors.fab.darkBlue,
        text: FAB_CREDIT.Recall,
        styleText: {
          color: colors.fab.darkBlue,
        },
      })
    }

    if (rolesButton?.isDisbursed) {
      list.push({
        icon: (
          <Image
            source={Icons.icActionConfirm}
            style={[styles.fab_icon, {tintColor: THEME.colors.white}]}
          />
        ),
        name: FAB_CREDIT.Disbursed,
        color: colors.fab.forestGreen,
        text: FAB_CREDIT.Disbursed,
        styleText: {
          color: colors.fab.forestGreen,
        },
      })
    }

    return list
  }

  const TabRoutes: TabRoute = [
    {key: 'general', title: 'Thông tin chung'},
    {key: 'financial', title: 'Thông tin tài chính'},
    {key: 'feedback', title: 'Ý kiến xử lý'},
  ]

  return {
    HiddenMenu,
    StaticMenu,
    TabRoutes,
  }
}

export default LocalConstant

const styles = StyleSheet.create({
  fab_icon: {
    resizeMode: 'contain',
    width: scale(24),
    height: scale(24),
  },
})
