import { createSignal } from 'solid-js';
import { useParams, useNavigate } from '@solidjs/router';
import ToolRoutes from './ToolRoutes';

function ToolPage(props) {
  const params = useParams();
  const navigate = useNavigate();
  const toolName = params.toolName;

  const [generatedSite, setGeneratedSite] = createSignal('');

  return (
    <div class="h-full flex flex-col">
      <ToolRoutes
        toolName={toolName}
        navigate={navigate}
        generatedSite={generatedSite}
        setGeneratedSite={setGeneratedSite}
        user={props.user}
      />
    </div>
  );
}

export default ToolPage;