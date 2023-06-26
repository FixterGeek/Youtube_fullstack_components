import {
  redirect,
  type ActionFunction,
  type V2_MetaFunction,
  type LoaderFunction,
} from "@remix-run/node";
import { Form } from "@remix-run/react";
import { commitSession, getSession } from "~/sessions";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "FullStack components, by @blissmo" },
    { name: "description", content: "Let's learn full stack components" },
  ];
};

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  session.unset("userId");
  throw redirect("/", {
    headers: { "Set-Cookie": await commitSession(session) },
  });
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  if (!session.has("userId")) {
    return redirect("/");
  }
  return null;
};

export default function Dash() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-4">
      <h2 className="text-4xl font-bold">😎 ¡Este es tu dashboard!</h2>
      <Form method="post">
        <button
          name="intent"
          value="signout"
          type="submit"
          className="hover:bg-orange-600 py-2 px-6 rounded-md font-bold text-lg bg-orange-500 text-white"
        >
          Fake Signout
        </button>
      </Form>
    </div>
  );
}
