import React from 'react'
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const user = useSelector((state) => state.user);
  return (
    <div>
        <h1>Name - {user.name}</h1>
        <h2>Email - {user.email}</h2>
        <h3>ReferralId - {user.referralId}</h3>
        <h3>TotalDonations - {user.totalDonations}</h3>
    </div>

  )
}

export default Dashboard