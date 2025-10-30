"use client"

import { useUser as useFirebaseUser } from '@/firebase/provider';
import { type User } from "firebase/auth";

export interface UserProfile extends User {
    // Add any custom profile properties here if needed in the future
}

export const useUser = () => {
    const { user, isUserLoading, userError } = useFirebaseUser();

    return {
        user: user as UserProfile | null,
        isUserLoading,
        userError
    };
};
