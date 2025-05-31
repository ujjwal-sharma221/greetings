"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { CircleAlert, CircleUser, Mail } from "lucide-react";

import Logo from "@/assets/logo.svg";
import GithubLogo from "@/assets/github.svg";
import GoogleLogo from "@/assets/google.svg";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { useAppForm } from "../components/forms/form-components";
import { defaultSignUpValues, signUpSchema, SingUpValues } from "../components/forms/schema";

export function SignUpView() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (value: SingUpValues) => {
    setError(null);
    setIsLoading(true);

    authClient.signUp.email(
      {
        email: value.email,
        password: value.password,
        name: value.name,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          setIsLoading(false);
        },
        onError: (error) => {
          setIsLoading(false);
          setError(error.error.message);
        },
      }
    );
  };

  const onSocialSubmit = (provider: "github" | "google") => {
    setError(null);
    setIsLoading(true);

    authClient.signIn.social(
      {
        provider,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          setIsLoading(false);
        },
        onError: (error) => {
          setIsLoading(false);
          setError(error.error.message);
        },
      }
    );
  };

  const form = useAppForm({
    defaultValues: defaultSignUpValues,
    validators: { onChange: signUpSchema },

    onSubmit: ({ value }) => onSubmit(value),
  });

  return (
    <form
      className="flex min-h-screen items-center justify-center"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <Card className="w-full max-w-lg rounded-4xl px-6 py-10 pt-14">
        <CardContent className="">
          <div className="flex flex-col items-center space-y-8">
            <Image src={Logo} alt="logo" height={30} width={30} />

            <div className="space-y-2 text-center">
              <h1 className="text-foreground text-3xl font-semibold">Register for greetings</h1>
              <p className="text-muted-foreground text-sm">
                Already have an account?{" "}
                <Link href="/sign-in" className="text-foreground hover:underline">
                  Sign in here
                </Link>
              </p>
            </div>

            <div className="w-full space-y-4">
              <form.AppField
                name="email"
                children={(field) => <field.TextField Icon={Mail} label="Email" />}
              />
              <form.AppField
                name="name"
                children={(field) => <field.TextField Icon={CircleUser} label="Name" />}
              />
              <form.AppField
                name="password"
                children={(field) => <field.PasswordField label="Password" />}
              />
              <form.AppField
                name="confirmPassword"
                children={(field) => <field.PasswordField label="Confirm Password" />}
              />
              <div className="flex flex-col gap-2">
                <form.AppForm>
                  <form.SubmitButton isPending={isLoading}>Submit</form.SubmitButton>
                </form.AppForm>
              </div>

              <div className="flex items-center gap-4 py-2">
                <Separator className="flex-1" />
                <span className="text-muted-foreground text-sm">OR</span>
                <Separator className="flex-1" />
              </div>

              {!!error && (
                <div className="border-destructive rounded-md border px-4 py-3">
                  <p className="text-sm font-semibold">
                    <CircleAlert
                      className="me-3 -mt-0.5 inline-flex text-red-500"
                      size={16}
                      aria-hidden="true"
                    />
                    {error}
                  </p>
                </div>
              )}

              <Button
                onClick={() => onSocialSubmit("google")}
                variant="outline"
                className="w-full rounded-xl"
                size="lg"
                type="button"
                disabled={isLoading}
              >
                Continue with Google <Image src={GoogleLogo} alt="logo" height={14} width={14} />
              </Button>
              <Button
                onClick={() => onSocialSubmit("github")}
                variant="outline"
                className="w-full rounded-xl bg-zinc-800 text-white"
                size="lg"
                type="button"
                disabled={isLoading}
              >
                Continue with Github <Image src={GithubLogo} alt="logo" height={14} width={14} />
              </Button>
            </div>

            <p className="text-muted-foreground w-11/12 text-center text-xs">
              You acknowledge that you read, and agree, to our{" "}
              <a href="#" className="hover:text-foreground underline">
                Terms of Service
              </a>{" "}
              and our{" "}
              <a href="#" className="hover:text-foreground underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
