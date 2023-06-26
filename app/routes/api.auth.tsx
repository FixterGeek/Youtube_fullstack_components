import {
  redirect,
  type ActionFunction,
  type LoaderFunction,
  json,
} from "@remix-run/node";
import type { UserType } from "~/components/AccountManager";
import { commitSession, getSession } from "~/sessions";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const intent = formData.get("intent");
  const session = await getSession(request.headers.get("Cookie"));

  if (intent === "login") {
    session.set("userId", "fixtergeek@gmail.com"); // change for DB info
    return json(
      { user: { email: "fixtergeek@gmail.com" } },
      {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      }
    );
  }

  if (intent === "signout") {
    session.unset("userId");
    return json(
      { user: null },
      {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      }
    );
  }

  return null;
};

type LoaderData = {
  ok: boolean;
  error?: string;
  user?: UserType;
};
export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  if (session.has("userId")) {
    console.log("Called, exists");
    const email = session.get("userId");
    return { ok: true, user: { email } } as LoaderData;
  }
  console.log("Called, not");
  return { ok: false, error: "No active session" };
};
