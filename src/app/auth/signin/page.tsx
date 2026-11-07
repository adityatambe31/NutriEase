import { redirect } from "next/navigation";
import { signIn, auth, providerMap } from "@/auth/auth-config";
import { AuthError } from "next-auth";
import { SigninFormComponent } from "@/app/auth/signin/component/signin-form";

const SIGNIN_ERROR_URL = "/auth/auth-error";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function SignInPage(props: any) {
  const searchParams = await props.searchParams;
  const callbackUrl =
    typeof searchParams?.callbackUrl === "string"
      ? searchParams.callbackUrl
      : undefined;

  const errorParam =
    typeof searchParams?.error === "string" ? searchParams.error : undefined;

  const session = await auth();
  if (session) {
    return redirect(callbackUrl || "/planner");
  }

  async function handleCredentialsSignIn(formData: FormData) {
    "use server";

    try {
      await signIn("credentials", {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        redirectTo: callbackUrl || "/planner",
      });
    } catch (error) {
      if (error instanceof AuthError) {
        return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
      }
      throw error;
    }
  }

  return (
    <SigninFormComponent
      error={errorParam}
      credentialsAction={handleCredentialsSignIn}
      providerMap={providerMap}
      callbackUrl={callbackUrl}
    />
  );
}
