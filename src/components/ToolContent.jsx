import ToolRenderer from './ToolRenderer';

function ToolContent(props) {
  const {
    toolName,
    navigate,
    setGeneratedSite,
    user,
  } = props;

  return (
    <>
      <button
        class="cursor-pointer px-4 py-2 mt-4 ml-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-300 ease-in-out transform box-border self-start"
        onClick={() => navigate(-1)}
      >
        الرجوع
      </button>
      <ToolRenderer
        toolName={toolName}
        navigate={navigate}
        setGeneratedSite={setGeneratedSite}
        user={user}
      />
    </>
  );
}

export default ToolContent;