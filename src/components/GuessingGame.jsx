import { createSignal } from 'solid-js';

function GuessingGame() {
  const [targetNumber, setTargetNumber] = createSignal(Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = createSignal('');
  const [message, setMessage] = createSignal('');
  const [attempts, setAttempts] = createSignal(0);

  const handleGuess = () => {
    const userGuess = parseInt(guess(), 10);
    setAttempts(attempts() + 1);

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
      setMessage('يرجى إدخال رقم صحيح بين 1 و 100.');
    } else if (userGuess === targetNumber()) {
      setMessage(`مبروك! لقد خمنت الرقم الصحيح في ${attempts()} محاولة.`);
    } else if (userGuess > targetNumber()) {
      setMessage('الرقم أقل من ذلك.');
    } else if (userGuess < targetNumber()) {
      setMessage('الرقم أكبر من ذلك.');
    }
    setGuess('');
  };

  const handleRestart = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setMessage('');
    setAttempts(0);
  };

  return (
    <div class="flex flex-col items-center justify-center flex-grow">
      <h2 class="text-2xl font-bold mb-4 text-purple-600">لعبة التخمين</h2>
      <p class="mb-4">أنا أفكر في رقم بين 1 و 100. حاول تخمينه!</p>
      <input
        type="number"
        value={guess()}
        onInput={(e) => setGuess(e.target.value)}
        class="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border text-center mb-4"
        placeholder="أدخل تخمينك"
      />
      <button
        class={`cursor-pointer px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out transform box-border mb-4 ${!guess() ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={handleGuess}
        disabled={!guess()}
      >
        خمن
      </button>
      <p class="text-lg mb-4">{message()}</p>
      <button
        class="cursor-pointer px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-300 ease-in-out transform box-border"
        onClick={handleRestart}
      >
        إعادة البدء
      </button>
    </div>
  );
}

export default GuessingGame;