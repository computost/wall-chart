import { Screen } from "~/components/Screen";
import { Search } from "~/components/Search";

export default function Home() {
  return (
    <Screen>
      <Search />
    </Screen>
  );
}

export function meta() {
  return [
    { title: "New React Router App" },
    { content: "Welcome to React Router!", name: "description" },
  ];
}
