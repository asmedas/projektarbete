import React from 'react';
import './UserCard.css'

export default function UserCard({ user }) {
    if (!user) return null;

    return (
        <div className="usercard">
            <h2>{user.firstName} {user.lastName}</h2>

            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>

            <p><strong>Role:</strong> {user.role}</p>

            <p><strong>Authorities:</strong> 
                {user.authorities?.map(a => a.authority).join(", ")}
            </p>

            <p><strong>Orders:</strong> {user.noOfOrders}</p>
            <p><strong>Enabled:</strong> {user.enabled ? "Yes" : "No"}</p>
            <p><strong>Account non-expired:</strong> {user.accountNonExpired ? "Yes" : "No"}</p>
            <p><strong>Credentials non-expired:</strong> {user.credentialsNonExpired ? "Yes" : "No"}</p>
            <p><strong>Account non-locked:</strong> {user.accountNonLocked ? "Yes" : "No"}</p>
        </div>
    );
}
