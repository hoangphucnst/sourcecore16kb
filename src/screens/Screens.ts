import MortgageScreen from '~/screens/Mortgage'
import Login from './Auth/Login'
import CreditScreen from './Credit'
import Customers from './Customers'
import DetailsCutomer from './Customers/DetailsCustomer'
import HomeScreen from './Home/HomeScreen'
import SettingsScreen from './Settings'
import VideoScreen from './Video'
import WorkFlowScreen from './WorkFlow'
import Modal_ChooseRole from './Settings/modals/Modal_ChooseRole'
import Modal_DetailUserInfo from './Settings/modals/Modal_DetailUserInfo'
import Modal_Filter_Customers from './Customers/modals/Modal_Filter'
import Modal_DatePicker from './modals/Modal_DatePicker'
import Modal_DropdownPicker from './modals/Modal_DropdownPicker'
import Modal_Filter_Loan from './Mortgage/modals/Modal_Filter_Loan'
import MortgageContractDetails from './Mortgage/MortgageContractDetails'
import Modal_CollateralAssetDetails from './Mortgage/modals/Modal_CollateralAssetDetails'
import NotificationScreen from './Notification'
import Modal_CreditFilter from './Credit/modals/Modal_CreditFilter'
import FileViewerScreen from './FileViewer'
import DetailCreditScreen from './Credit/DetailCredit'
import ChangeBackground from './Settings/ChangeBackground'
import Modal_YearPicker from './modals/Modal_YearPicker'
import DetailTaskScreen from './WorkFlow/DetailTask'
import SendFeedbackScreen from './WorkFlow/SendFeekback'
import SubmitReviewScreen from './WorkFlow/SubmitReview'
import UpdateTaskScreen from './WorkFlow/UpdateTask'
import TrackingTasksScreen from './WorkFlow/TrackingTasks'
import TaskEvaluationScreen from './WorkFlow/TaskEvaluation'
import RejectTaskScreen from './WorkFlow/RejectTask'
import ApproveTaskScreen from './WorkFlow/ApproveTask'
import EvaluateTaskScreen from './WorkFlow/EvaluateTask'
import Modal_TaskFilter from './WorkFlow/modals/Modal_TaskFilter'
import RejectCreditContract from './Credit/RejectCreditContract'
import UpdateGroupLoan from './Credit/UpdateGroupLoan'
import ReturnToInitiator from './Credit/ReturnToInitiator'
import CreditResolved from './Home/CreditResolved'
import Modal_OptionSign from './modals/Modal_OptionSign'
import Modal_Credit_OptionSign from './Credit/modals/Modal_Credit_OptionSign'
import Modal_AuthOTP from './Auth/modals/Modal_AuthOTP'
import TrackingCredit from './Credit/TrackingCredit'

export const Screens = {
  name: {
    // Tabs screen
    HomeScreen: 'HomeScreen',
    VideoScreen: 'VideoScreen',
    Credit: 'Credit',
    WorkFlow: 'WorkFlow',
    Mortgage: 'Mortgage',
    Settings: 'Settings',
    Tabs: 'Tabs',
    // Screens
    Login: 'log',
    Customers: 'Customers',
    DetailsCutomer: 'DetailsCutomer',
    Customers: 'customers',
    MortgageContractDetails: 'MortgageContractDetails',
    Notification: 'NotificationScreen',
    FileViewerScreen: 'FileViewerScreen',
    DetailCredit: 'DetailCredit',
    DetailTask: 'DetailTaskScreen',
    CreditResolved: 'CreditResolved',
    // FAB -> Modals
    Modal_SendFeedback: 'Modal_SendFeedbackScreen',
    Modal_SubmitReview: 'Modal_SubmitReviewScreen',
    Modal_UpdateTask: 'Modal_UpdateTaskScreen',
    Modal_TrackingTasks: 'Modal_TrackingTasksScreen',
    Modal_TaskEvaluation: 'Modal_TaskEvaluationScreen',
    Modal_RejectTask: 'Modal_RejectTaskScreen',
    Modal_ApproveTask: 'Modal_ApproveTaskScreen',
    Modal_EvaluateTask: 'Modal_EvaluateTaskScreen',
    // Modals
    Modal_ChooseRole: 'Modal_ChooseRole',
    Modal_DetailUserInfo: 'Modal_DetailUserInfo',
    Modal_Filter_Customers: 'Modal_Filter_Customers',
    Modal_DatePicker: 'Modal_DatePicker',
    Modal_DropdownPicker: 'Modal_DropdownPicker',
    Modal_Filter_Loan: 'Modal_Filter_Loan',
    Modal_CollateralAssetDetails: 'Modal_CollateralAssetDetails',
    Modal_CreditFilter: 'Modal_CreditFilter',
    Modal_YearPicker: 'Modal_YearPicker',
    Modal_ChangeBackground: 'Modal_ChangeBackground',
    Modal_TaskFilter: 'Modal_TaskFilter',
    Modal_Credit_TrackingTasks: 'Modal_Credit_TrackingTasks',
    Modal_Credit_RejectContract: 'Modal_Credit_RejectContract',
    Modal_Credit_UpdateGroupLoan: 'Modal_Credit_UpdateGroupLoan',
    Modal_Credit_ReturnToInitiator: 'Modal_Credit_ReturnToInitiator',
    Modal_OptionSign: 'Modal_OptionSign',
    Modal_Credit_OptionSign: 'Modal_Credit_OptionSign',
    Modal_AuthOTP: 'Modal_AuthOTP',
  },
  components: {
    // Screens below
    HomeScreen,
    VideoScreen,
    SettingsScreen,
    Login,
    Customers,
    DetailsCutomer,
    CreditScreen,
    WorkFlowScreen,
    MortgageScreen,
    NotificationScreen,
    ChangeBackground,
    DetailTaskScreen,
    /// Task - modals
    SendFeedbackScreen,
    SubmitReviewScreen,
    UpdateTaskScreen,
    TrackingTasksScreen,
    TaskEvaluationScreen,
    RejectTaskScreen,
    ApproveTaskScreen,
    ///
    CreditResolved,
    // Modals below
    Modal_ChooseRole,
    Modal_DetailUserInfo,
    Modal_Filter_Customers,
    Modal_DatePicker,
    Modal_DropdownPicker,
    Modal_Filter_Loan,
    MortgageContractDetails,
    Modal_CollateralAssetDetails,
    Modal_CreditFilter,
    FileViewerScreen,
    DetailCreditScreen,
    Modal_YearPicker,
    Modal_RejectTask: RejectTaskScreen,
    Modal_EvaluateTask: EvaluateTaskScreen,
    Modal_TaskFilter,
    Modal_Credit_TrackingTask: TrackingCredit,
    Modal_Credit_RejectContract: RejectCreditContract,
    Modal_Credit_UpdateGroupLoan: UpdateGroupLoan,
    Modal_Credit_ReturnToInitiator: ReturnToInitiator,
    Modal_OptionSign,
    Modal_Credit_OptionSign,
    Modal_AuthOTP,
  },
}
