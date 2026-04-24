import {Routes, Route} from 'react-router'
import { useLocation } from 'react-router'
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
import Minisumo from './Rules/minisumo'
import Minisumokids from './Rules/minisumokids'
import AdminPage from './admin/adminPage'
import AdminLogin from './admin/pages/AdminLogin'
import ProtectedAdminRoute from './admin/ProtectedAdminRoute'
import UserAuth from './mentor/pages/UserAuth'
import UserDashboard from './mentor/pages/UserDashboard'
import ProtectedMentorRoute from './mentor/ProtectedMentorRoute'
import RefereeLogin from './referee/pages/RefereeLogin'
import ProtectedRefereeRoute from './referee/ProtectedRefereeRoute'
import RefereeDashboard from './referee/pages/RefereeDashboard'
import Legoline from './Rules/legoline'
import LineFollower from './Rules/linefollower'
import Drone from './Rules/drone'
import LegoSumo3kg from './Rules/3kglegosumo'
import LegoSumo from './Rules/legosumo'
import BotsCombat from './Rules/botscombat'
import Partners from './pages/Sponsors'
import NextGenAzerbaijan1st from './news/nextgenaze1st'
import Teamszone from './teamszone/teamszone'
import TeamRegistration from './teamszone/registration/TeamRegistration'
import TeamMiniSumo from './teamszone/categoryteams/teamminisumo'
import Team1kgSumo from './teamszone/categoryteams/team1kgsumo'
import Team3kgSumo from './teamszone/categoryteams/team3kgsumo'
import TeamLineFollower from './teamszone/categoryteams/teamlinefollower'
import TeamLegoLine from './teamszone/categoryteams/teamlegoline'
import TeamDrone from './teamszone/categoryteams/teamdrone'
import TeamStartupJr from './teamszone/categoryteams/teamstartupjr'
import TeamStartupSenior from './teamszone/categoryteams/teamstartupsenior'

const App = () => {
  const location = useLocation()
  const isPortalRoute = location.pathname.startsWith('/admin') || location.pathname.startsWith('/user') || location.pathname.startsWith('/referee')

  return (
    <div>
      {!isPortalRoute && <Navbar/>}

      <Routes>
          <Route path='/home' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/news' element={<News/>}/>
          <Route path='/regulations' element={<Regulations/>}/>
          <Route path='/participants' element={<Participants/>}/>
          <Route path='/standings' element={<Standing/>}/>
          <Route path='/partners' element={<Partners/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/awards' element={<Awards/>}/>
          <Route path='/' element={<Home/>}/>
          <Route path='/admin/login' element={<AdminLogin/>}/>
          <Route path='/admin' element={<ProtectedAdminRoute><AdminPage/></ProtectedAdminRoute>}/>
          <Route path='/user/auth' element={<UserAuth/>}/>
          <Route path='/user/dashboard' element={<ProtectedMentorRoute><UserDashboard/></ProtectedMentorRoute>}/>
          <Route path='/referee/login' element={<RefereeLogin/>}/>
          <Route path='/referee/dashboard' element={<ProtectedRefereeRoute><RefereeDashboard/></ProtectedRefereeRoute>}/>
          <Route path='/regulations/mini-sumo' element={<Minisumo/>}/>
          <Route path='/regulations/mini-sumo-kids' element={<Minisumokids/>}/>
          <Route path='/regulations/lego-line' element={<Legoline/>}/>
          <Route path='/regulations/line-follower' element={<LineFollower/>}/>
          <Route path='/regulations/drone-race' element={<Drone/>}/>
          <Route path='/regulations/lego-sumo-3kg' element={<LegoSumo3kg/>}/>
          <Route path='/regulations/lego-sumo' element={<LegoSumo/>}/>
          <Route path='/regulations/bots-combat' element={<BotsCombat/>}/> 
          <Route path='/news/nextgen1' element={<NextGenAzerbaijan1st/>}/>
          <Route path='/teamszone' element={<Teamszone/>}/>
          <Route path='/teamszone/register' element={<TeamRegistration/>}/>
          <Route path='/teamszone/mini-sumo' element={<ProtectedRefereeRoute><TeamMiniSumo/></ProtectedRefereeRoute>}/>
          <Route path='/teamszone/1kg-lego-sumo' element={<ProtectedRefereeRoute><Team1kgSumo/></ProtectedRefereeRoute>}/>
          <Route path='/teamszone/3kg-lego-sumo' element={<ProtectedRefereeRoute><Team3kgSumo/></ProtectedRefereeRoute>}/>
          <Route path='/teamszone/line-follower' element={<ProtectedRefereeRoute><TeamLineFollower/></ProtectedRefereeRoute>}/>
          <Route path='/teamszone/lego-line' element={<ProtectedRefereeRoute><TeamLegoLine/></ProtectedRefereeRoute>}/>
          <Route path='/teamszone/drone' element={<ProtectedRefereeRoute><TeamDrone/></ProtectedRefereeRoute>}/>
          <Route path='/teamszone/start-up-junior' element={<ProtectedRefereeRoute><TeamStartupJr/></ProtectedRefereeRoute>}/>
          <Route path='/teamszone/start-up-senior' element={<ProtectedRefereeRoute><TeamStartupSenior/></ProtectedRefereeRoute>}/>
      </Routes>
      {!isPortalRoute && <Footer/>}
    </div>
  )
}

export default App