export const BASE_URL = "https://api.eloquintart.com/api/"
export const UPLOADS_URL = "https://api.eloquintart.com/Uploads/"
export const UPLOADS_URL2 = "https://api.eloquintart.com"

// import ChangePassword from "../../views/change-password"

// export const BASE_URL = "http://localhost:3004/api"
// export const UPLOADS_URL = "http://localhost:3004/Uploads/"
// export const UPLOADS_URL2 = "http://localhost:3004"


export const AUTH = {
    signin: "/auth/signin",
    signup:"/auth/signup",
    emailCode:"/auth/emailVerificationCode",
    verifyCode:"/auth/verifyRecoverCode",
    resetPassword:"/auth/resetPassword",
}

export const SUBSCRIPTION = {
    get: "/plan/getAllPlans",
    create:"/plan/addPlan",
    getOne: "/plan/getPlanById/",
    edit: "/plan/editPlan/",
    delete: "/plan/deletePlan/",
  };


export const NEWS = {
    getNewsFeed : "/post/getNewsFeeds",
    likePost : "/post/likePost",
    lovePost: "/post/lovePost",
    commentPost:"/post/comment/",
    addPost:"/post/addPost"
}

export const GALLERY = {
    addGallery:"/gallery/addGallery",
    getMyGallery: "/gallery/getMyGallery/",
    getAllGallery:"/gallery/getAllGallery",
    likeGallery:"/gallery/likeGallery",
    commentGallery:"/gallery/commentGallery/"
}

export const USER = {
    updateProfile : "/profile/updateProfile",
    changePassword:"/profile/changePassword",
    getMyCoaches:"/profile/getMyCoaches",
}

export const CONTEST = {
    getAllContests:"/admin/contests/getAllContests",
    getAllContestEntries:"/admin/entries/getAllContestEntries/",
    getContestById:"/admin/contests/getContestById/",
    contestPayment:"/payment/contestPayment",
    subscriptionPayment:"/payment/subscriptionPayment",
    getMyPaymentLogs:"/payment/getMyPaymentLogs",
    getAllMyContests:"/contest/getAllMyContests",
    joinContest:"/contest/joinContest",
    voteContest:"/contest/voteContest"
}

export const USERS = {
    get: "/auth/signin",
    getAllCoaches:"/admin/contests/getAllContests",
    getAllTutors:"/admin/contests/getAllContests",
    getCoachById:"/admin/user/getCoachById/"
}

export const COACH = {
    updateProfile : "/coach/profile/updateProfile",
    changePassword:"/coach/profile/changePassword"
}

export const SERVICES = {
    getAll: "/service/getAllServices"
}

export const RATES = {
    getMyRates: "/rates/getMyRates",
    setRates : "/rates/setRates"
}

export const COMISSSION = {
    getComission : "/comission/getComission"
}

export const SCHEDULE = {
    addSchedule: "/schedule/addSchedule",
    getMySchedule:"/schedule/getMySchedule",
    getScheduleByCoachId:"/schedule/getScheduleByCoachId/"
}


export const REVIEWS={
    getAll:"/review/getAllReviewsByCoachId/",
    getCoachRatings:"/review/getCoachRatings/"
}



export const LESSON={
    bookLesson:"/lesson/addLesson",
    getUpcomingLessons:"/lesson/getAllUpcomingLessons",
    getCompletedLessons:"/lesson/getAllCompletedLessons",
    getLiveLessons:"/lesson/getAllLiveLessons",
    getLessonById:"/lesson/getLessonById/",
}

export const PAYMENT={
    lessonPayment:"/payment/lessonPayment",
}




