/* eslint-disable */
import { useRouterHistory, browserHistory } from "react-router";
import createBrowserHistory from "history/lib/createBrowserHistory";
import $ from "jquery";

const REDIRECT_LOCATION = "redirectLocation";

export function createCustomHistory() {
  let customHistory = browserHistory;
  if (typeof window !== "undefined") {
    customHistory = useRouterHistory(createBrowserHistory)();
    customHistory.listen(location => {
      setTimeout(() => {
        $("body").animate({ scrollTop: 0 }, "500");

        // var timerID = setInterval(function () {
        //     window.scrollBy(0, -30);
        //     if (window.pageYOffset === 0)
        //         clearInterval(timerID);
        // }, 13);
      }, 10);
    });
  }
  return customHistory;
}

export function setRedirect(location) {
  localStorage.setItem(REDIRECT_LOCATION, location);
}

export function resetRedirect() {
  setRedirect("");
}

export function getRedirect() {
  return localStorage.getItem(REDIRECT_LOCATION);
}
