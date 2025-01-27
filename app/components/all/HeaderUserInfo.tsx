"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/app/utils/supabase/client";
import AuthModal from "./AuthModal";
import HeaderButtonSingle from "./HeaderButtonSingle";
import { Session } from "@supabase/supabase-js";



export default function HeaderUserInfo() {
  const supabase = createClient();
  const [session, setSession] = useState<Session | null>(null);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);

  useEffect(() => {
    // Fetch current session on mount
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };
    getSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    // Cleanup on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // If no user is logged in, show a "Log In / Sign Up" button
  if (!session) {
    return (
      <>
        <HeaderButtonSingle
          label="Log In / Sign Up"
          ButtonDestination="/auth"
        />
        {showAuthModal && (
          <AuthModal onClose={() => setShowAuthModal(false)} />
        )}
      </>
    );
  }

  // If user is logged in, display minimal info + logout
  const userEmail = session.user?.email ?? "No Email";

  return (
    <div className="flex items-center">
      {/* A simple avatar using the first letter(s) of the user's email */}
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-600 p-1 text-white">
        {userEmail.slice(0, 1).toUpperCase()}
      </div>

      {/* User Email or Name */}
      <div className="font-semibold text-slate-800">{userEmail}</div>

      {/* Log Out Button */}
      <HeaderButtonSingle label="Log Out" onClick={handleLogout} />
    </div>
  );
}