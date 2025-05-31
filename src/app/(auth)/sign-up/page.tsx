import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { SignUpView } from "@/modules/auth/views/sign-up-view";

const SignUpPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session) {
    redirect("/");
  }

  return (
    <div>
      <SignUpView />
    </div>
  );
};

export default SignUpPage;
