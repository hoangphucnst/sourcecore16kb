/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native'
import React from 'react'
import {useAppStyles} from '~/hooks'
import {scale} from '~/utils/scaleScreen'
import AppText from '~/components/AppText'
import {Fontsfamily} from '~/styles/FontsFamily'
import Svg, {Line} from 'react-native-svg'
import utils from '~/utils'
import {
  PRIOTY_TASK_QTD,
  STATUS_TASK_QTD,
  TYPE_PROCESSS_TASK_QTD,
  TYPE_TASK_QTD,
} from '~/constants'
import {SectionWrapper} from '~/screens/components'

export interface InfoTask {
  taskId: number
  taskName: string
  taskType: number
  taskStatus: number
  startDate: string
  dueDate: string
  personalStatus: number
  createBy: number
  approverId: number
  createName: string
  createTime: string
  taskContent: string
  notifiedUsers: string
  notifiedUserIds: string
  priority: number
  taskProgresses: TaskProgress[]
  relatedTasks: any[]
  mortgageContracts: any[]
  creditContracts: any[]
  attachs: any[]
  rolesButton: number[]
  encodeTaskId: string
  approverName: string
  completionDate: string
}

export interface TaskProgress {
  taskProgressId: number
  taskId: number
  taskProgressPerson: number
  progressType: number
  progressContent: string
  taskProgressPersonName: string
  taskProgressPersonRole: string
  taskProgressPersonDepartment: string
  taskProgressStatus: number
  progressPercentage: number
  progressResultContent: any
  evaluationResult: any
  isActive: number
  senderId: any
  personalStatus: number
  userId: number
  completionDate: any
}

interface InfoTaskSectionProps {
  data: InfoTask
}

const InfoTaskSection: React.FC<InfoTaskSectionProps> = ({data}) => {
  const styles = useInfoTaskStyles()

  return (
    <SectionWrapper>
      <View style={styles.title_container}>
        <AppText style={styles.title_section}>Nội dung chính</AppText>
      </View>
      <View style={styles.item_container}>
        <InfoRow
          title="Tên công việc"
          value={utils.safeValue(data?.taskName)}
        />
        <InfoRow
          title="Độ ưu tiên"
          value={utils.safeValue(PRIOTY_TASK_QTD[data?.priority])}
        />
        <InfoRow
          title="Trạng thái công việc"
          value={utils.safeValue(STATUS_TASK_QTD[data?.taskStatus])}
        />
        <InfoRow
          title="Trạng thái cá nhân"
          value={utils.safeValue(TYPE_PROCESSS_TASK_QTD[data?.personalStatus])}
        />
        <InfoRow
          title="Loại công việc"
          value={utils.safeValue(TYPE_TASK_QTD[data?.taskType])}
        />
        <InfoRow
          title="Nhận để biết"
          value={utils.safeValue(data?.notifiedUsers)}
        />
        <InfoRow title="Ngày tạo" value={utils.safeValue(data?.createTime)} />
        <InfoRow
          title="Ngày bắt đầu"
          value={utils.safeValue(data?.startDate)}
        />
        {/* <InfoRow
          title="Ngày hoàn thành"
          value={utils.safeValue(
            utils.isDefined(data?.taskProgresses)
              ? data?.taskProgresses?.filter(
                  _ => !utils.isDefined(_.completionDate),
                ).length > 0
                ? 'Chưa hoàn thành'
                : 'Hoàn thành'
              : null,
          )}
        /> */}
        <InfoRow
          title="Ngày hoàn thành"
          value={
            utils.isDefined(data?.completionDate)
              ? 'Hoàn thành'
              : 'Chưa hoàn thành'
          }
        />
        <InfoRow title="Hạn xử lý" value={utils.safeValue(data?.dueDate)} />
        <InfoRow
          title="Người giao việc"
          value={utils.safeValue(data?.createName)}
        />
        <InfoRow
          title="Người phê duyệt công việc"
          value={utils.safeValue(data?.approverName)}
        />

        <CustomDashedLine />

        <View style={{gap: scale(8)}}>
          <InfoRow
            title="Nội dung công việc"
            value={utils.safeValue(data?.taskContent)}
            column
          />
          <InfoRow
            title="Kết quả đánh giá"
            value={utils.safeValue(data?.taskEvaluationContent)}
            column
          />
        </View>
      </View>
    </SectionWrapper>
  )
}

export default InfoTaskSection

const useInfoTaskStyles = () => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  return StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      padding: scale(10),
      gap: scale(8),
    },
    item_container: {
      padding: scale(10),
      gap: scale(10),
      backgroundColor: colors.white,
      borderRadius: scale(10),
    },
    title_section: {
      fontSize: scale(16),
      color: colors.primary,
      fontFamily: Fontsfamily.OpenSans.Bold,
    },
    title_container: {
      paddingLeft: scale(4),
      borderLeftWidth: scale(2),
      borderColor: colors.bookmark,
    },
  })
}

const InfoRow = ({
  title,
  value = 'test_attribute',
  column,
}: {
  title: string
  value?: string
  column?: boolean
}) => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  return (
    <View style={{flexDirection: column ? 'column' : 'row'}}>
      <AppText
        style={{
          flex: 1,
          fontFamily: Fontsfamily.Nunito.SemiBold,
          color: colors.text.secondary,
        }}>
        {title}
      </AppText>
      <AppText
        style={{
          flex: 1,
          textAlign: column ? 'left' : 'right',
          fontFamily: Fontsfamily.Nunito.SemiBold,
          color: colors.text.primary,
        }}>
        {value}
      </AppText>
    </View>
  )
}

const CustomDashedLine = () => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  return (
    <Svg height="1" width="100%">
      <Line
        x1="0"
        y1="0"
        x2="100%"
        y2="0"
        stroke={colors.border}
        strokeWidth="2"
        strokeDasharray="6, 2"
      />
    </Svg>
  )
}
