import {Routes, Route, Navigate} from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './Components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import News from './pages/News'
import Regulations from './pages/Regulations'
import Standing from './pages/Standing'
import Contact from './pages/Contact'
import Footer from './Components/Footer'
import Awards from './pages/Awards'
import Participants from './pages/Participants'
import FAQ from './pages/FAQ'
import Minisumo from './Rules/minisumo'
import Minisumokids from './Rules/minisumokids'
import Megasumo from './Rules/megasumo'
import AdminPage from './admin/adminPage'
import AdminLogin from './admin/pages/AdminLogin'
import ProtectedAdminRoute from './admin/ProtectedAdminRoute'
import UserAuth from './mentor/pages/UserAuth'
import ForgotPassword from './mentor/pages/ForgotPassword'
import UserDashboard from './mentor/pages/UserDashboard'
import ProtectedMentorRoute from './mentor/ProtectedMentorRoute'
import TeamsZoneRefereeLogin from './teamszone/pages/TeamsZoneRefereeLogin'
import ProtectedRefereeRoute from './referee/ProtectedRefereeRoute'
import RefereeDashboard from './referee/pages/RefereeDashboard'
import Legoline from './Rules/legoline'
import LineFollower from './Rules/linefollower'
import LegoSumo3kg from './Rules/3kglegosumo'
import LegoSumo from './Rules/legosumo'
import StartupSenior from './Rules/startupsenior'
import Partners from './pages/Sponsors'
import PartnershipInquiries from './pages/PartnershipInquiries'
import NextGenAzerbaijan1st from './news/nextgenaze1st'
import Teamszone from './teamszone/teamszone'
import ClearData from './admin/ClearData'
import TeamMiniSumo from './teamszone/categoryteams/teamminisumo'
import Team1kgSumo from './teamszone/categoryteams/team1kgsumo'
import Team3kgSumo from './teamszone/categoryteams/team3kgsumo'
import TeamLineFollower from './teamszone/categoryteams/teamlinefollower'
import TeamLegoLine from './teamszone/categoryteams/teamlegoline'
import TeamMiniSumoKids from './teamszone/categoryteams/teamstartupjr'
import TeamMegaSumo from './teamszone/categoryteams/teammegasumo'
import TeamStartupSenior from './teamszone/categoryteams/teamstartupsenior'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'


const App = () => {
  const location = useLocation()
  const isPortalRoute =
    location.pathname.startsWith('/admin') ||
    location.pathname.startsWith('/user') ||
    location.pathname.startsWith('/referee') ||
    location.pathname.startsWith('/teamszone/referee')

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname])

  return (
    <div className='min-h-screen bg-slate-50 text-slate-900'>
      {!isPortalRoute && <Navbar/>}

      <main className='min-h-screen w-full overflow-x-hidden'>
        <Routes>
          <Route path='/home' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/news' element={<News/>}/>
          <Route path='/regulations' element={<Regulations/>}/>
          <Route path='/participants' element={<Participants/>}/>
          <Route path='/standings/:categoryId' element={<Standing/>}/>
          <Route path='/standings' element={<Standing/>}/>
          <Route path='/partners' element={<Partners/>}/>
          <Route path='/partnership-inquiries' element={<PartnershipInquiries/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/faq' element={<FAQ/>}/>
          <Route path='/awards' element={<Awards/>}/>
          <Route path='/' element={<Home/>}/>
          <Route path='/admin/login' element={<AdminLogin/>}/>
          <Route path='/admin/*' element={<ProtectedAdminRoute><AdminPage/></ProtectedAdminRoute>}/>
          <Route path='/admin/clear-data' element={<ClearData/>} />
          <Route path='/user/auth' element={<UserAuth/>}/>
          <Route path='/user/forgot-password' element={<ForgotPassword/>}/>
          <Route path='/user/dashboard' element={<ProtectedMentorRoute><UserDashboard/></ProtectedMentorRoute>}/>
          <Route path='/referee/login' element={<Navigate to='/teamszone/referee' replace/>}/>
          <Route path='/referee/dashboard' element={<Navigate to='/teamszone/referee/dashboard' replace/>}/>
          <Route path='/teamszone/referee' element={<TeamsZoneRefereeLogin/>}/>
          <Route path='/teamszone/referee/dashboard' element={<ProtectedRefereeRoute><RefereeDashboard/></ProtectedRefereeRoute>}/>
          <Route path='/regulations/mini-sumo' element={<Minisumo/>}/>
          <Route path='/regulations/mini-sumo-kids' element={<Minisumokids/>}/>
          <Route path='/regulations/mega-sumo' element={<Megasumo/>}/>
          <Route path='/regulations/lego-line' element={<Legoline/>}/>
          <Route path='/regulations/line-follower' element={<LineFollower/>}/>
          <Route path='/regulations/lego-sumo-3kg' element={<LegoSumo3kg/>}/>
          <Route path='/regulations/lego-sumo' element={<LegoSumo/>}/>
          <Route path='/regulations/1kg-lego-sumo' element={<LegoSumo/>}/>
          <Route path='/regulations/3kg-lego-sumo' element={<LegoSumo3kg/>}/>
          <Route path='/regulations/start-up-senior' element={<StartupSenior/>}/>
          <Route path='/news/nextgen1' element={<NextGenAzerbaijan1st/>}/>
          <Route path='/teamszone' element={<Teamszone/>}/>
          <Route path='/teamszone/register' element={<Navigate to='/user/auth' replace/>}/>
          <Route path='/teamszone/mini-sumo' element={<TeamMiniSumo/>}/>
          <Route path='/teamszone/1kg-lego-sumo' element={<Team1kgSumo/>}/>
          <Route path='/teamszone/3kg-lego-sumo' element={<Team3kgSumo/>}/>
          <Route path='/teamszone/line-follower' element={<TeamLineFollower/>}/>
          <Route path='/teamszone/lego-line' element={<TeamLegoLine/>}/>
          <Route path='/teamszone/mini-sumo-kids' element={<TeamMiniSumoKids/>}/>
          <Route path='/teamszone/mega-sumo' element={<TeamMegaSumo/>}/>
          <Route path='/teamszone/start-up-senior' element={<TeamStartupSenior/>}/>
          <Route path='/privacy' element={<PrivacyPolicy/>}/>
          <Route path='/terms' element={<TermsOfService/>}/>
        </Routes>
      </main>
      {!isPortalRoute && <Footer/>}
    </div>
  )
}

export default App