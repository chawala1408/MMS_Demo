// Login Page
//export const APP_INIT = "APP_INIT";
export const APP_TITLE = "NAT Project";


// Login Page
export const HTTP_LOGIN_FETCHING = "HTTP_LOGIN_FETCHING";
export const HTTP_LOGIN_SUCCESS = "HTTP_LOGIN_SUCCESS";
export const HTTP_LOGIN_FAILED = "HTTP_LOGIN_FAILED";

// Register Page
export const HTTP_REGISTER_FETCHING = "HTTP_REGISTER_FETCHING";
export const HTTP_REGISTER_SUCCESS = "HTTP_REGISTER_SUCCESS";
export const HTTP_REGISTER_FAILED = "HTTP_REGISTER_FAILED";


// Error Code
export const E_PICKER_CANCELLED = 'E_PICKER_CANCELLED'
export const E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR = 'E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR'
export const E_PERMISSION_MISSING = 'E_PERMISSION_MISSING'
export const E_PICKER_NO_CAMERA_PERMISSION = 'E_PICKER_NO_CAMERA_PERMISSION'
export const E_USER_CANCELLED = 'E_USER_CANCELLED'
export const E_UNKNOWN = 'E_UNKNOWN'
export const E_DEVELOPER_ERROR = 'E_DEVELOPER_ERROR'
export const TIMEOUT_NETWORK = 'ECONNABORTED' // request service timeout
export const NOT_CONNECT_NETWORK = 'NOT_CONNECT_NETWORK' 

//////////////// Localization Begin ////////////////
export const NETWORK_CONNECTION_MESSAGE = 'Cannot connect to server, Please try again.' 
export const NETWORK_TIMEOUT_MESSAGE = 'A network timeout has occurred, Please try again.'  
export const UPLOAD_PHOTO_FAIL_MESSAGE = 'An error has occurred. The photo was unable to upload.' 


// export const apiUrl =  "http://localhost:5010/api";
// export const api_Influx = "http://10.128.16.210:4012";

export const apiUrl =  "http://localhost:5010/api";
export const api_Influx = "http://localhost:4012";

export const YES = 'YES'
export const NO = 'NO'
export const OK = 'ok'
export const NOK = 'nok'


export const key = {
    LOGIN_PASSED: `LOGIN_PASSED`,
    API_KEY: `API_KEY`,
    USER_LV: `USER_LV`,
    USER_NAME: "USER_NAME",
    USER_EMP: "USER_EMP",
  };
  
  // gitfgdfsxcdsfsd dfgesfg
export const server = {    
    LOGIN_URL : `authen/login`, 
    URL_REGIST:    `authen/register`,   
    LOGIN_PASSED : `yes`,
    
    //single part master
    ALL_MASTER_SG : `single_part/allMasterSG`,
    GENERATE_QR: `qr_generate/getQRManufacturingOrder`,
    ALL_TRANS_MO : `transaction/allTransactionsOrder`,
    CHECK_REPEAT_SCAN_PART: `transaction/partNumberCheck`,
    INSERT_MO_PART: `transaction/insertTransactions`,
    GET_PROCESS_LINE : `mr_process/getProcessLinePart`,
    INSERT_Mat_URL : `issue/scanInsert_material`, 
    INSERT_FG_URL : `finished_goods/scanInsert_FG`, 
    INSERT_KIT_RECEIVED_URL : `kitupreceived/scanInsert_kitupreceived`, 
    INSERT_KIT_ISSUE_URL : `kitupissue/scanInsert_kitupsIssue`, 

    
    GET_FG_SG_URL : `finished_goods/resultFG_SG_Linestock`, 
    GET_FG_BAL_URL : `finished_goods/resultFG_SG_stock`, 
    GET_FG_INFO_URL : `finished_goods/resultInfo`, 
    //GET_MAT_BAL_KIT_URL : `finished_goods/resultMaterial_Linestock`, 
    GET_MAT_KIT_RECEIVED_URL : `kitupreceived/resultMaterial_Kit_Received`, 
    GET_MAT_KIT_ISSUE_URL : `kitupissue/resultMaterial_Kit_Issue`, 
    GET_MAT_KIT_BALANCE_URL : `kitupreceived/resultMaterial_KitupStock`, 
    GET_MAT_LINE_BALANCE_URL : `finished_goods/resultMaterial_Linestock`, 
    
    
    GET_MO_QTY_URL : `productionSheet/result_ProductionSheet`, 
   
    OUTPUT_HR_URL : `summarize_PR/output_hr`, 
    OUTPUT_Day_URL : `summarize_PR/output_daily`, 
    SUB2_OUTPUT : `summarize_PR/daily_stack` , 
    Hr_STACK : `summarize_PR/hour_stack` ,
    Hr_data : `summarize_PR/hour_data` ,
    Daily_data : `summarize_PR/Daily_data`,
    byMonth : `summarize_PR/byMonth`,

    master_target_URL : `master_target/add_data` ,
    master_cusItem : `master_target/cus_PN`,
    Data_URL : `master_target/select_data`
  }