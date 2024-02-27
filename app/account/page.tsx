import Breadcrumb from "@/app/components/breadcrumb";
import RegisterForm from "@/app/account/ui/register-form";
import LoginForm from "@/app/account/ui/login-form";
import {
  getToken,
  fetchInfoMe,
  logout,
} from "@/lib/store/server/account/actions";
import { Form } from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";

export default async function Page() {
  const token = await getToken();
  let user = null;
  if (token) {
    user = await fetchInfoMe(token);
  }
  return (
    <main className="main-container">
      <Breadcrumb />
      {user ? (
        <>
          <h1 className="font-serif text-2xl font-semibold capitalize">
            My Account
          </h1>
          {user ? (
            <div className="mt-4 w-full md:max-w-md">
              <div className="grid grid-cols-1 gap-2">
                <Input
                  aria-disabled
                  disabled
                  aria-label="Full name"
                  placeholder="Fullname"
                  type="text"
                  defaultValue={user.fullname}
                />
                <Input
                  aria-disabled
                  disabled
                  aria-label="Email"
                  placeholder="email"
                  type="email"
                  defaultValue={user.email}
                />
              </div>
              <form
                className="mt-2 flex w-full"
                action={async () => {
                  "use server";
                  await logout();
                }}
              >
                <button
                  type="submit"
                  className="primary-btn-color mx-auto min-w-56 rounded px-8 py-2 font-sans font-medium md:px-5 md:py-1"
                >
                  Logout
                </button>
              </form>
            </div>
          ) : null}

          {/* {user && (
            <form
              action={async () => {
                "use server";
                await logout();
              }}
            >
              <button
                type="submit"
                className="primary-btn-color mx-auto min-w-56 rounded px-8 py-2 font-sans font-medium md:px-5 md:py-1"
              >
                Logout
              </button>
            </form>
          )} */}
        </>
      ) : (
        <div className="my-8 flex flex-col divide-y-2 divide-skin-gray md:flex-row md:divide-x-2 md:divide-y-0">
          <LoginForm />
          <RegisterForm />
        </div>
      )}
    </main>
  );
}
