import { Link, useMatch, useResolvedPath } from "react-router-dom";

const CustomLink = (props) => {
  const resolvedPath = useResolvedPath(props.to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive && props.active}>
      <Link to={props.to}>{props.children}</Link>
    </li>
  );
};
export default CustomLink