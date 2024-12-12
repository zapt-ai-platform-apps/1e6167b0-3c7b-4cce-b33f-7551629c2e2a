import { useParams, useNavigate } from '@solidjs/router';
import ToolRoutes from './ToolRoutes';

function ToolPage(props) {
  const params = useParams();
  const navigate = useNavigate();
  const toolName = params.toolName;

  return (
    <div class="h-full flex flex-col">
      <ToolRoutes
        toolName={toolName}
        navigate={navigate}
        user={props.user}
      />
    </div>
  );
}

export default ToolPage;