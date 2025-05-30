/** The mainpage to show the demo. */

import RecentQsos from "./applets/recent_qsos/main";

export default function Home() {
  return (
    <div className="page">
      <h1>Show your logbook</h1>
      <p className="intro">
        You are now running the hosted page of show-your-book.
        See the GitHub repository for the detail.
        Build the iFrame code on your page to show the applet below:
      </p>
      <RecentQsos />
    </div>
  );
}
