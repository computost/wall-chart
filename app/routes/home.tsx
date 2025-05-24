import { Screen } from "~/components/screen";
import { Search } from "~/components/search";

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
