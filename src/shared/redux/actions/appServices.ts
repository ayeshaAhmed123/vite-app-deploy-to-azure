import {GetOctansServices} from   './octanApis/GetOctansServices'
import {PublicAccessToken} from   './octanApis/PublicAccessToken'
import {eSamAddress} from   './octanApis/eSamAddress'
import {eSAMGetByID} from   './octanApis/eSAMGetByID'
import {GetLocationFromOctansService} from   './octanApis/GetLocationFromOctansService'
import {SearchProvidersFromOctansService,setSelectedProvider} from   './octanApis/SearchProvidersFromOctansService'
import {GetDayRoaster} from './octanApis/GetDayRoaster'
import {SearchListOfSlot,SearchListOfRescheduleSlotDataSuccess} from './octanApis/SearchListOfSlot'
import {GetAllEthnicity} from './octanApis/GetAllEthnicity'
import {GetAllGenders} from './octanApis/GetAllGenders'
import {AddAppointment} from './octanApis/AddAppointment'
import {AddCustomerData} from './octanApis/AddCustomerData'
import {AddPatientForMedicare} from './octanApis/AddPatientForMedicare'
import {CreateInvoicewithItems} from './octanApis/CreateInvoicewithItems'
import {UpdateDataforNotconfrimbooking} from './octanApis/UpdateDataforNotconfrimbooking'
import {CheckOtpAgainstAppointment} from './octanApis/CheckOtpAgainstAppointment'
import {GenerateInvitation} from './octanApis/GenerateInvitation'
import {GetPracticeforPaymentConfigration} from './octanApis/GetPracticeforPaymentConfigration'
import {UpdatePatientForPayments} from './octanApis/UpdatePatientForPayments'
import {CreatePayment} from './octanApis/CreatePayment'
import {StripeCheckOutSession} from './octanApis/StripeCheckOutSession'
import {GetAppointmentByID} from './octanApis/GetAppointmentByID'
import {GetPatientByID} from './octanApis/GetPatientByID'
import {CancelAppointmentById} from './octanApis/CancelAppointmentById'
import {CheckOtpAgainstAppointmentDataClear} from './octanApis/CheckOtpAgainstAppointment'
import {AddAppointmentDataClear} from './octanApis/AddAppointment'
import {GetAppointmentByIDDataClear} from './octanApis/GetAppointmentByID'
import {SearchListOfSlotDataClear} from './octanApis/SearchListOfSlot'
import {UpdatePatientForPaymentsClear} from './octanApis/UpdatePatientForPayments'
import {CancelAppointmentByIdDataClear} from './octanApis/CancelAppointmentById'

export const appServices = {
    GetOctansServices,
    PublicAccessToken,
    eSamAddress,
    eSAMGetByID,
    GetLocationFromOctansService,
    SearchProvidersFromOctansService,
    GetDayRoaster,
    SearchListOfSlot,
    setSelectedProvider,
    GetAllEthnicity,
    GetAllGenders,
    AddAppointment,
    AddCustomerData,
    AddPatientForMedicare,
    CreateInvoicewithItems,
    UpdateDataforNotconfrimbooking,
    CheckOtpAgainstAppointment,
    GenerateInvitation,
    GetPracticeforPaymentConfigration,
    UpdatePatientForPayments,
    CreatePayment,
    StripeCheckOutSession,
    GetAppointmentByID,
    SearchListOfRescheduleSlotDataSuccess,
    GetPatientByID,
    CancelAppointmentById,
    CheckOtpAgainstAppointmentDataClear,
    AddAppointmentDataClear,
    GetAppointmentByIDDataClear,
    SearchListOfSlotDataClear,
    UpdatePatientForPaymentsClear,
    CancelAppointmentByIdDataClear
}