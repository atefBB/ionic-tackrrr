import { TaskList } from "../components/TaskList";

export function Home({ user }: any) {
  return (
    <div className="ion-padding container">
      <TaskList user={user} />
    </div>
  );
}
