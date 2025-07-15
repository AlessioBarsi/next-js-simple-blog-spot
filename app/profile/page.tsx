import { PasswordForm } from "@/components/auth/PasswordForm";
import { ProfileForm } from "@/components/auth/ProfileForm";
import ProfileInfo from "@/components/auth/ProfileInfo";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function Profile() {

  return (
    <div>
      <div className="g-5 mx-auto w-1/2">
        <Tabs defaultValue="account">
          <TabsList className="w-full">
            <TabsTrigger className="flex-1" value="account">Account</TabsTrigger>
            <TabsTrigger className="flex-1" value="edit">Edit Information</TabsTrigger>
            <TabsTrigger className="flex-1" value="password">Password</TabsTrigger>

          </TabsList>

          <TabsContent className="my-2" value="account">
            <ProfileInfo />
          </TabsContent>

          <TabsContent className="my-2" value="edit">
            <ProfileForm />
          </TabsContent>

          <TabsContent className="my-2" value="password">
            <PasswordForm />
          </TabsContent>

        </Tabs>
      </div>

    </div>
  );
}
