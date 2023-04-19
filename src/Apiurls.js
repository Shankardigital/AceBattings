const ACE_Url = "http://103.186.185.77:5027/";
export const URL = {
    //Employees 
    getallCountrycodes: ACE_Url + "acebatting/adminportal/admin/getallcountrycodes",
    getallUsers: ACE_Url + "acebatting/adminportal/admin/getalluser",
    addUsers: ACE_Url + "acebatting/adminportal/admin/adminregistration",
    editUsers: ACE_Url + "acebatting/adminportal/admin/edituserbyid",
    searchuserdata: ACE_Url + "acebatting/adminportal/admin/getprofilebysearch?searchQuery=",

    // Dashboard
    getdashboard: ACE_Url + "acebatting/adminportal/dashboard/getdashboard",

    //Users 
    getallCustomers: ACE_Url + "acebatting/adminportal/customer/getallcustomer",
    addCustomer: ACE_Url + "acebatting/adminportal/customer/registercustomer",
    editCustomer: ACE_Url + "acebatting/adminportal/customer/editcustomerbyid",
    getallactivecustomer:ACE_Url+"acebatting/adminportal/customer/getallactivecustomer",

    addballcredits:ACE_Url+"acebatting/adminportal/customer/addballcredits",
    deductballcredits:ACE_Url+"acebatting/adminportal/customer/deductballcredits",

    forGotpsw: ACE_Url + "acebatting/adminportal/admin/forgotpassword",
    compareOTP: ACE_Url + "acebatting/adminportal/admin/compareotp",
    resetPSW: ACE_Url + "acebatting/adminportal/admin/resetpassword",
    setpassword: ACE_Url + "acebatting/adminportal/admin/setprofilepassword",

    changePSW: ACE_Url + "acebatting/adminportal/admin/changepassword",
    admindata: ACE_Url + "acebatting/adminportal/admin/getprofilebytoken",
    editadmindata: ACE_Url + "acebatting/adminportal/admin/editprofilebytoken",
    editadminimg: ACE_Url + "acebatting/adminportal/admin/editprofilebytoken",

    // Plans apis

    addPlans: ACE_Url + "acebatting/adminportal/plans/addplan",
    allPlans: ACE_Url + "acebatting/adminportal/plans/getallplans",
    plansrearch: ACE_Url + "acebatting/adminportal/plans/searchplan?searchQuery=",
    getById: ACE_Url + "acebatting/adminportal/plans/getplanbyid",
    updateplan: ACE_Url + "acebatting/adminportal/plans/editplanbyid",
    deleteplan: ACE_Url + "acebatting/adminportal/plans/deleteplanbyid",
    getplansbytypes: ACE_Url + "acebatting/adminportal/plans/getplansbytypes",

    // booking... 

    getallbooking: ACE_Url + "acebatting/adminportal/booking/getallbooking",
    cancelbooking: ACE_Url + "acebatting/adminportal/booking/cancelbooking",


    //Banners
    addBanners: ACE_Url + "acebatting/adminportal/banners/addbanner",
    allBanners: ACE_Url + "acebatting/adminportal/banners/getallbanners",
    editBanners: ACE_Url + "acebatting/adminportal/banners/editbannerbyid",
    deleteBanners: ACE_Url + "acebatting/adminportal/banners/deletebannerbyid",
    // searchBanners:ACE_Url+"acebatting/adminportal/banners/searchbanner?searchQuery=",

    //Lanes
    addLanes: ACE_Url + "acebatting/adminportal/lanes/addlane",
    allLanes: ACE_Url + "acebatting/adminportal/lanes/getalllanes",
    getallactivelanes: ACE_Url + "acebatting/adminportal/lanes/getallactivelanes",
    editLanes: ACE_Url + "acebatting/adminportal/lanes/editlanebyid",
    deleteLanes: ACE_Url + "acebatting/adminportal/lanes/deletelanebyid",

    getbookedlanes: ACE_Url + "acebatting/adminportal/booking/getallbookedlanes",
    plansrentalequipmentslanes: ACE_Url + "acebatting/adminportal/lanes/plansrentalequipmentslanes",
    addlanerepairstatus: ACE_Url + "acebatting/adminportal/lanes/addlanerepairstatus",
    getrepairlane: ACE_Url + "acebatting/adminportal/lanes/getrepairlane",
    deleterepairedlanes: ACE_Url + "acebatting/adminportal/lanes/deleterepairedlanes",
    getlanenumbyplanid: ACE_Url + "acebatting/adminportal/lanes/getlanenumbyplanid",

    //Clinics
    addclinic: ACE_Url + "acebatting/adminportal/clinic/addclinic",
    getallclinics: ACE_Url + "acebatting/adminportal/clinic/getallclinics",
    editclinicbyid: ACE_Url + "acebatting/adminportal/clinic/editclinicbyid",
    deleteclinicbyid: ACE_Url + "acebatting/adminportal/clinic/deleteclinicbyid",

    //Subscriptions
    allSubscriptions: ACE_Url + "acebatting/adminportal/subscriptions/getallsubscriptions",
    // addLanes:ACE_Url+"acebatting/adminportal/subscriptions/getallsubscriptions",
    //     editLanes:ACE_Url+"acebatting/adminportal/lanes/editlanebyid",
    //     deleteLanes:ACE_Url+"acebatting/adminportal/lanes/deletelanebyid",

    //Roles and Permissions
    addRole: ACE_Url + "acebatting/adminportal/roles/addrole",
    allRoles: ACE_Url + "acebatting/adminportal/roles/getallroles",
    allactiverole: ACE_Url + "acebatting/adminportal/roles/getallactiveroles",
    editRole: ACE_Url + "acebatting/adminportal/roles/editrolebyid",
    getbyidrole: ACE_Url + "acebatting/adminportal/roles/getrolebyid",
    searchrole: ACE_Url + "acebatting/adminportal/roles/searchrole?searchQuery=",

    // Coupons
    addcoupon: ACE_Url + "acebatting/adminportal/coupons/addcoupon",
    getallcoupons: ACE_Url + "acebatting/adminportal/coupons/getallcoupons",
    editcouponbyid: ACE_Url + "acebatting/adminportal/coupons/editcouponbyid",
    // plansrearch: ACE_Url + "acebatting/adminportal/plans/searchplan?searchQuery=",
    // getById: ACE_Url + "acebatting/adminportal/plans/getplanbyid",
    deletecouponbyid: ACE_Url + "acebatting/adminportal/coupons/deletecouponbyid",

    //batchs
    getallbatchs: ACE_Url + "acebatting/adminportal/batch/getallbatchs",
    editbatchbyid: ACE_Url + "acebatting/adminportal/batch/editbatchbyid",

    //notifications
    showallnotification: ACE_Url + "acebatting/adminportal/notification/showallnotification",
    addnotification: ACE_Url + "acebatting/adminportal/notification/addnotification",
    editnotification: ACE_Url + "acebatting/adminportal/notification/editnotification",
    deletenotification: ACE_Url + "acebatting/adminportal/notification/deletenotification",

    //Oters
    getaboutus: ACE_Url + "acebatting/adminportal/companypolicy/getaboutus",
    updateaboutus: ACE_Url + "acebatting/adminportal/companypolicy/updateaboutus",
    getprivacypolicy: ACE_Url + "acebatting/adminportal/companypolicy/getprivacypolicy",
    updateprivacypolicy: ACE_Url + "acebatting/adminportal/companypolicy/updateprivacypolicy",
    gettermscondition: ACE_Url + "acebatting/adminportal/companypolicy/gettermscondition",
    updatetermscondition: ACE_Url + "acebatting/adminportal/companypolicy/updatetermscondition",
    getrefundpolicy: ACE_Url + "acebatting/adminportal/companypolicy/getrefundpolicy",
    updaterefundpolicy: ACE_Url + "acebatting/adminportal/companypolicy/updaterefundpolicy",



}