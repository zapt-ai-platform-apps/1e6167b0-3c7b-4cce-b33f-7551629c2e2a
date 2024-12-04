function MessageList(props) {
  return (
    <ul>
      {props.messages.map((msg, index) => (
        <li
          key={index}
          class={`mb-2 ${
            msg.role === 'user' ? 'text-right' : 'text-left'
          }`}
        >
          <span
            class={`inline-block px-4 py-2 rounded-lg ${
              msg.role === 'user'
                ? 'bg-blue-100 text-gray-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {msg.content}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default MessageList;