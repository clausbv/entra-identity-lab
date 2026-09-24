import "./style.css";
import {
  InteractionRequiredAuthError,
  PublicClientApplication,
} from "@azure/msal-browser";

const clientId = import.meta.env.VITE_CLIENT_ID;
const tenantId = import.meta.env.VITE_TENANT_ID;

const msalConfig = {
  auth: {
    clientId,
    authority: `https://login.microsoftonline.com/${tenantId}`,
    redirectUri: "http://localhost:3000/",
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};

const msalInstance = new PublicClientApplication(msalConfig);

await msalInstance.initialize();

document.querySelector("#app").innerHTML = `
  <main class="container">
    <h1>LAB-Northstar-OIDC</h1>
    <p>Microsoft Entra ID authentication lab</p>

    <button id="login-button">Sign in with Microsoft</button>
    <button id="graph-button" hidden>Call Microsoft Graph</button>
    <button id="logout-button" hidden>Sign out</button>

    <h2>Local account information</h2>
    <pre id="account-information"></pre>

    <h2>Microsoft Graph response</h2>
    <pre id="graph-response">Graph has not been called.</pre>
  </main>
`;

const loginButton = document.querySelector("#login-button");
const graphButton = document.querySelector("#graph-button");
const logoutButton = document.querySelector("#logout-button");
const accountInformation = document.querySelector("#account-information");
const graphResponse = document.querySelector("#graph-response");

function displayAccount(account) {
  if (!account) {
    loginButton.hidden = false;
    graphButton.hidden = true;
    logoutButton.hidden = true;
    accountInformation.textContent = "Not signed in";
    return;
  }

  loginButton.hidden = true;
  graphButton.hidden = false;
  logoutButton.hidden = false;

  accountInformation.textContent = JSON.stringify(
    {
      username: account.username,
      name: account.name,
      homeAccountId: account.homeAccountId,
    },
    null,
    2
  );
}

try {
  const redirectResponse = await msalInstance.handleRedirectPromise();

  if (redirectResponse?.account) {
    msalInstance.setActiveAccount(redirectResponse.account);
  }
} catch (error) {
  console.error("MSAL redirect handling failed:", error);
}

const accounts = msalInstance.getAllAccounts();

if (!msalInstance.getActiveAccount() && accounts.length > 0) {
  msalInstance.setActiveAccount(accounts[0]);
}

displayAccount(msalInstance.getActiveAccount());

loginButton.addEventListener("click", async () => {
  await msalInstance.loginRedirect({
    scopes: ["openid", "profile", "email"],
  });
});

graphButton.addEventListener("click", async () => {
  const account = msalInstance.getActiveAccount();

  try {
    let tokenResponse;

    try {
      tokenResponse = await msalInstance.acquireTokenSilent({
        scopes: ["User.Read"],
        account,
      });
    } catch (error) {
      if (!(error instanceof InteractionRequiredAuthError)) {
        throw error;
      }

      tokenResponse = await msalInstance.acquireTokenPopup({
        scopes: ["User.Read"],
        account,
      });
    }

    const response = await fetch(
      "https://graph.microsoft.com/v1.0/me",
      {
        headers: {
          Authorization: `Bearer ${tokenResponse.accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Microsoft Graph returned ${response.status}: ${response.statusText}`
      );
    }

    const profile = await response.json();
    graphResponse.textContent = JSON.stringify(profile, null, 2);
  } catch (error) {
    console.error("Microsoft Graph call failed:", error);
    graphResponse.textContent = `Error: ${error.message}`;
  }
});

logoutButton.addEventListener("click", () => {
  msalInstance.logoutRedirect();
});