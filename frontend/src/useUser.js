import { useState, useEffect } from 'react';
import { useToken } from './useToken';

export const useUser = () => {
    const [token] = useToken();

    const getPayloadFromToken = (token) => {
        const encodedPayload = token.split('.')[1];
        return JSON.parse(atob(encodedPayload));
    }

    const [user, setUser] = useState(() => {
        if (!token) return null;
        const payload = getPayloadFromToken(token);
        return { ...payload, _id: payload._id};

    });

    useEffect(() => {
        if (!token) {
            setUser(null);
        } else {
            const payload = getPayloadFromToken(token);
            setUser({ ...payload, _id: payload._id });
        }
    }, [token]);

    return { user };
};