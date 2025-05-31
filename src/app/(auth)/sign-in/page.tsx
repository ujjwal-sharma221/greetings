import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { SignInView } from "@/modules/auth/views/sign-in-view";

const SignInPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session) {
    redirect("/");
  }

  return (
    <div>
      <SignInView />
    </div>
  );
};

export default SignInPage;
