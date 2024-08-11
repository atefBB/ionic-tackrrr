import TaskList from "../components/TaskList";

export function Home({ user }: any) {
  return (
    <div className="container">
      <TaskList user={user} />
    </div>
  );
}
