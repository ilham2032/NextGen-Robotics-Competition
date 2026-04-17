import React from 'react'
import { Link } from 'react-router'

const Teamszone = () => {
  return (
    <div>
        <h1 className='text-4xl text-blue-600 font-bold text-center mt-16 lg:mt-32'>TEAMS ZONE</h1>
        <div>
            <p>Choose a CATEGORY:</p>
            <ul>
                <Link to='/teamszone/mini-sumo'>Mini Sumo</Link>
                <Link to='/teamszone/1kg-lego-sumo'>1kg Lego Sumo</Link>
                <Link to='/teamszone/3kg-lego-sumo'>3kg Lego Sumo</Link>
                <Link to='/teamszone/lego-line'>Lego Line</Link>
                <Link to='/teamszone/line-follower'>Line Follower</Link>
                <Link to='/teamszone/drone'>Drone</Link>
                <Link to='/teamszone/start-up-junior'>Start Up(junior)</Link>
                <Link to='/teamszone/start-up-senior'>Start Up(senior)</Link>
            </ul>
        </div>
    </div>
  )
}

export default Teamszone