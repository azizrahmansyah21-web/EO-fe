import { redirect } from "next/navigation";

export default function Home() {
  // R-05: Redirection from root to admin since this is mainly a management app
  // and guests access via specific /rsvp/[token] links.
  redirect("/admin");
}
