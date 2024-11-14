
interface TodolistProps {
  title: string;
  subTitle?: string;
  description?: string;
  tasks?: any[];
}
export const Todolist = ({ title, subTitle, description, tasks }: TodolistProps) => {
  return (
    <div>
      <h3>{title}</h3>
      <h4>{subTitle}</h4>
      <p>{description}</p>
      {tasks && <div>{tasks.map(t => t.title)}</div>}
      <div>
        <input />
        <button>+</button>
      </div>
      <ul>
        <li>
          <input type="checkbox" checked={true} /> <span>HTML&CSS</span>
        </li>
        <li>
          <input type="checkbox" checked={true} /> <span>JS</span>
        </li>
        <li>
          <input type="checkbox" checked={false} /> <span>React</span>
        </li>
      </ul>
      <div>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
  );
};