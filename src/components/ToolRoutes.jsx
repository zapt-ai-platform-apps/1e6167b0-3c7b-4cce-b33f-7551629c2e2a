import { Routes, Route, Navigate } from '@solidjs/router';
import ToolContent from './ToolContent';

function ToolRoutes(props) {
  const {
    toolName,
    navigate,
    user
  } = props;

  return (
    <Routes>
      <Route path="/" element={
        <ToolContent
          toolName={toolName}
          navigate={navigate}
          user={user}
        />
      } />
      <Route path="*" element={<Navigate href="/" />} />
    </Routes>
  );
}

export default ToolRoutes;