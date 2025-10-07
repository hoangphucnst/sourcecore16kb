import {Image, StyleSheet} from 'react-native'
import React from 'react'
import {Icons} from '~/assets'
import {ALLOWED_ACTION_TASK_QTD, FAB_TASKS} from '~/constants'
import {scale} from '~/utils/scaleScreen'
import {useAppStyles} from '~/hooks'

const LocalConstant = () => {
  const {THEME} = useAppStyles()
  const {colors} = THEME

  const StaticMenu = rolesButton => {
    const allowedTaskKeys = rolesButton
      .map(role => ALLOWED_ACTION_TASK_QTD[role])
      .filter(Boolean)

    const defaultList = [
      {
        icon: <Image source={Icons.icActionReject} style={[styles.fab_icon]} />,
        name: FAB_TASKS.RejectTask,
        color: colors.fab.orange,
        text: FAB_TASKS.RejectTask,
        styleText: {
          color: colors.fab.orange,
        },
      },
      {
        icon: (
          <Image source={Icons.icActionConfirm} style={[styles.fab_icon]} />
        ),
        name: FAB_TASKS.ApproveTask,
        color: colors.fab.forestGreen,
        text: FAB_TASKS.ApproveTask,
        styleText: {
          color: colors.fab.oliveGreen,
        },
      },
      // {
      //   icon: <Image source={Icons.icActionEye} style={[styles.fab_icon]} />,
      //   name: FAB_TASKS.TrackingTask,
      //   color: colors.fab.brown,
      //   text: FAB_TASKS.TrackingTask,
      //   styleText: {
      //     color: colors.fab.oliveGreen,
      //   },
      // },
    ]

    const filteredList = defaultList.filter(item =>
      allowedTaskKeys.includes(item.name),
    )

    return filteredList
  }

  const HiddenMenu = rolesButton => {
    const allowedTaskKeys = [...rolesButton, 5]
      .map(role => ALLOWED_ACTION_TASK_QTD[role])
      .filter(Boolean)

    const defaultList = [
      {
        icon: <Image source={Icons.icActionReview} style={styles.fab_icon} />,
        name: FAB_TASKS.Evaluation,
        color: colors.fab.purple,
        text: FAB_TASKS.Evaluation,
        styleText: {
          color: colors.fab.purple,
        },
      },
      {
        icon: (
          <Image source={Icons.icActionUpdateProcess} style={styles.fab_icon} />
        ),
        name: FAB_TASKS.UpdateTask,
        color: colors.fab.teal,
        text: FAB_TASKS.UpdateTask,
        styleText: {
          color: colors.fab.teal,
        },
      },
      {
        icon: (
          <Image source={Icons.icActionSendOpinion} style={styles.fab_icon} />
        ),
        name: FAB_TASKS.SubmitEvaluation,
        color: colors.fab.darkBlue,
        text: FAB_TASKS.SubmitEvaluation,
        styleText: {
          color: colors.fab.darkBlue,
        },
      },
      {
        icon: <Image source={Icons.icActionOpinion} style={styles.fab_icon} />,
        name: FAB_TASKS.SubmitComment,
        color: colors.fab.coralRed,
        text: FAB_TASKS.SubmitComment,
        styleText: {
          color: colors.fab.coralRed,
        },
      },
      {
        icon: <Image source={Icons.icActionDelete} style={styles.fab_icon} />,
        name: FAB_TASKS.DeleteTask,
        color: colors.fab.darkRed,
        text: FAB_TASKS.DeleteTask,
        styleText: {
          color: colors.fab.darkRed,
        },
      },
    ]

    const filteredList = defaultList.filter(item =>
      allowedTaskKeys.includes(item.name),
    )

    const defaultButton = {
      icon: <Image source={Icons.icOptions} style={styles.fab_icon} />,
      name: 'Default',
      color: colors.fab.darkGray,
    }

    return [defaultButton, ...filteredList]
  }
  return {StaticMenu, HiddenMenu}
}

export default LocalConstant

const styles = StyleSheet.create({
  fab_icon: {
    resizeMode: 'contain',
    width: scale(24),
    height: scale(24),
  },
})
