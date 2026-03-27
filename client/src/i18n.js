import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// 🔥 GET SAVED LANG
const savedLang = localStorage.getItem("lang") || "en";

i18n
  .use(initReactI18next)
  .init({

    resources: {

      en: {
        translation: {

          // 🔝 NAVBAR
          home: "Home",
          attendance: "Attendance",
          growth: "Growth",
          report: "Report",
          notification: "Notification",
          settings: "Settings",
          login: "Login",
          logout: "Logout",

          // 👤 PROFILE
          profile: "Profile",
          profile_photo: "Profile Photo",
          name: "Name",
          email: "Email",
          phone: "Phone",
          address: "Address",
          gender: "Gender",
          change_password: "Change Password",

          update: "Update Profile",
          save_offline: "Save Offline",
          sync: "Sync",
          upload_photo: "Upload Photo",

          // 🔐 LOGIN
          username: "Username",
          password: "Password",
          enter_captcha: "Enter Captcha",
          enter_credentials: "Enter username and password",
          captcha_wrong: "Captcha incorrect",
          login_success: "Login Successful",
          server_error: "Server error",
          new_user: "New user?",
          register_here: "Register here",

          // 🏠 HOME
          hero_title: "Smart AI-Based Anganwadi Monitoring System",
          hero_sub: "AI Powered Child Monitoring System",
          explore: "Explore Now",

          about_title: "About AnganCare",
          about_desc: "AnganCare is an AI-powered smart monitoring system designed to modernize Anganwadi centers.",

          feature1_title: "📷 Smart Attendance Tracking",
          feature1_desc: "Face recognition attendance",

          feature2_title: "📈 Predictive Growth Analysis",
          feature2_desc: "Growth monitoring system",

          feature3_title: "🧠 Skill Intelligence Engine",
          feature3_desc: "Track learning skills",

          // 📊 ATTENDANCE
          attendance_title: "Attendance Management",
          add_student: "Add Student",
          register_child: "Register new child",
          attendance_marker: "Attendance Marker",
          face_attendance: "Face recognition attendance",
          dashboard: "Dashboard",
          attendance_stats: "Attendance statistics",
          student_list: "Student List",
          view_students: "View registered students",

          // 🔔 NOTIFICATION
          notifications: "Notifications",
          information: "Information",
          food: "Food",
          admin: "Admin",
          parent: "Parent",
          recent_notifications: "Recent Notifications",
          no_notifications: "No notifications"
        }
      },

      ta: {
        translation: {

          // 🔝 NAVBAR
          home: "முகப்பு",
          attendance: "வருகை",
          growth: "வளர்ச்சி",
          report: "அறிக்கை",
          notification: "அறிவிப்பு",
          settings: "அமைப்புகள்",
          login: "உள்நுழைவு",
          logout: "வெளியேறு",

          // 👤 PROFILE
          profile: "சுயவிவரம்",
          profile_photo: "சுயவிவர படம்",
          name: "பெயர்",
          email: "மின்னஞ்சல்",
          phone: "தொலைபேசி",
          address: "முகவரி",
          gender: "பாலினம்",
          change_password: "கடவுச்சொல் மாற்றம்",

          update: "புதுப்பிக்கவும்",
          save_offline: "ஆஃப்லைனில் சேமிக்கவும்",
          sync: "ஒத்திசை",
          upload_photo: "புகைப்படத்தை பதிவேற்று",

          // 🔐 LOGIN
          username: "பயனர் பெயர்",
          password: "கடவுச்சொல்",
          enter_captcha: "கேப்ட்சா உள்ளிடவும்",
          enter_credentials: "பயனர் பெயர் மற்றும் கடவுச்சொல் உள்ளிடவும்",
          captcha_wrong: "கேப்ட்சா தவறு",
          login_success: "உள்நுழைவு வெற்றி",
          server_error: "சர்வர் பிழை",
          new_user: "புதிய பயனர்?",
          register_here: "இங்கே பதிவு செய்யவும்",

          // 🏠 HOME
          hero_title: "செயற்கை நுண்ணறிவு அடிப்படையிலான அங்கன்வாடி கண்காணிப்பு அமைப்பு",
          hero_sub: "AI மூலம் குழந்தைகள் கண்காணிப்பு அமைப்பு",
          explore: "இப்போது ஆராயவும்",

          about_title: "அங்கன்கேர் பற்றி",
          about_desc: "AI அடிப்படையிலான அங்கன்வாடி கண்காணிப்பு அமைப்பு.",

          feature1_title: "📷 ஸ்மார்ட் வருகை கண்காணிப்பு",
          feature1_desc: "முகஅடையாளம் மூலம் வருகை பதிவு",

          feature2_title: "📈 வளர்ச்சி கணிப்பு",
          feature2_desc: "வளர்ச்சி கண்காணிப்பு",

          feature3_title: "🧠 திறன் நுண்ணறிவு அமைப்பு",
          feature3_desc: "கற்றல் திறன்கள்",

          // 📊 ATTENDANCE
          attendance_title: "வருகை மேலாண்மை",
          add_student: "மாணவர் சேர்க்க",
          register_child: "புதிய குழந்தையை பதிவு செய்ய",
          attendance_marker: "வருகை பதிவு",
          face_attendance: "முகஅடையாள வருகை",
          dashboard: "டாஷ்போர்டு",
          attendance_stats: "வருகை புள்ளிவிவரம்",
          student_list: "மாணவர் பட்டியல்",
          view_students: "பதிவு செய்யப்பட்ட மாணவர்கள்",

          // 🔔 NOTIFICATION
          notifications: "அறிவிப்புகள்",
          information: "தகவல்",
          food: "உணவு",
          admin: "நிர்வாகம்",
          parent: "பெற்றோர்",
          recent_notifications: "சமீபத்திய அறிவிப்புகள்",
          no_notifications: "அறிவிப்புகள் இல்லை"
        }
      }

    },

    lng: savedLang,
    fallbackLng: "en",

    interpolation: {
      escapeValue: false
    }

  });

export default i18n;