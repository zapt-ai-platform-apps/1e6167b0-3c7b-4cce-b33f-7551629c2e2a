import { Routes, Route, Navigate } from '@solidjs/router';
import GeneratedSite from './GeneratedSite';
import ToolContent from './ToolContent';

function ToolRoutes(props) {
  const {
    toolName,
    navigate,
    generatedSite,
    setGeneratedSite,
    user
  } = props;

  return (
    <Routes>
      <Route path="/" element={
        <ToolContent
          toolName={toolName}
          navigate={navigate}
          setGeneratedSite={setGeneratedSite}
          user={user}
        />
      } />
      {toolName === 'website-builder' && (
        <Route path="/generated" element={
          <GeneratedSite
            generatedSite={generatedSite}
            setGeneratedSite={setGeneratedSite}
            user={user}
          />
        } />
      )}
      <Route path="*" element={<Navigate href="/" />} />
    </Routes>
  );
}

export default ToolRoutes;