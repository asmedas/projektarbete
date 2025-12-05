import React, { useState, useEffect } from 'react';
import { useAuth } from "../../auth/AuthProvider";
import UserCard from '../usercard/UserCard';

export default function UserByOwnId() {
    const { auth, authFetch } = useAuth();
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!auth || !auth.id) return;

        const load = async () => {
            try {
                const res = await authFetch(`http://localhost:8080/api/v1/users/${auth.id}`);
                if (!res.ok) throw new Error("Failed to fetch user");

                const data = await res.json();
                setUser(data);
            } catch (err) {
                console.error(err);
            }
        };

        load();
    }, []);

    if (!user) return <p>Loading your user data...</p>;

    return <UserCard user={user} />;
}
