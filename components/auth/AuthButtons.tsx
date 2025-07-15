"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import LinkButton from "../LinkButton";
import { LogIn, UserPlus, UserCircle, LogOut } from "lucide-react";
import { SidebarMenuItem, SidebarMenuButton } from "../ui/sidebar";

export const LoginButton = () => {
  return (
    <Button onClick={() => signIn()}>
      Sign in
    </Button>
  );
};

export const RegisterButton = () => {
  return (
    <LinkButton text="Register" page="register" />
  );
};

export const LogoutButton = () => {
  return (
    <Button onClick={() => signOut()}>
      Sign Out
    </Button>
  );
};

export const ProfileButton = () => {
  return (
    <LinkButton page="profile" text="Profile" />
  );
};

export const HeaderButtons = () => {
  const { data: session } = useSession()

  return (
    <div>
      {session ?
        <div>
          <SidebarMenuItem key="profile">
            <SidebarMenuButton asChild>
              <a href="/profile">
                <UserCircle />
                <span>My Profile</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem key="signout">
            <SidebarMenuButton onClick={() => signOut()} asChild>
              <a href="#">
                <LogOut />
                <span>Sign Out</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </div>

        :
        <div>
          <SidebarMenuItem key="login">
            <SidebarMenuButton onClick={() => signIn()} asChild>
              <a href="#">
                <LogIn />
                <span>Login</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem key="register">
            <SidebarMenuButton asChild>
              <a href="/register">
                <UserPlus />
                <span>Sign Up</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </div>
      }
    </div>

  )
}
