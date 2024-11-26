import { createSignal, Show } from 'solid-js';
import { createEvent } from '../supabaseClient';

function SmartDataAnalysis() {
  const [userData, setUserData] = createSignal('');
  const [analysisType, setAnalysisType] = createSignal('');
  const [analysisResult, setAnalysisResult] = createSignal('');
  const [loading, setLoading] = createSignal(false);

  const analysisOptions = [
    'تحليل عام',
    'ملخص البيانات',
    'تحديد الاتجاهات',
    'اكتشاف الأنماط',
    'تحليل المتغيرات',
  ];

  const handleAnalyze = async () => {
    if (!userData() || !analysisType()) return;

    setLoading(true);
    setAnalysisResult('');

    let prompt = `Please perform ${analysisType()} on the following data: ${userData()}. Provide the result in Arabic and use markdown format where appropriate.`;

    try {
      const response = await createEvent('chatgpt_request', {
        prompt: prompt,
        response_type: 'text',
      });

      setAnalysisResult(response);
    } catch (error) {
      console.error('Error performing data analysis:', error);
      alert('حدث خطأ أثناء تحليل البيانات. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="flex flex-col flex-grow">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold text-purple-600">تحليل البيانات الذكي</h2>
      </div>
      <div class="flex flex-col mb-4">
        <textarea
          value={userData()}
          onInput={(e) => setUserData(e.target.value)}
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border resize-none h-40 mb-4"
          placeholder="أدخل بياناتك هنا (مثال: قائمة قيم مفصولة بفواصل)"
        ></textarea>
        <select
          value={analysisType()}
          onInput={(e) => setAnalysisType(e.target.value)}
          class="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border cursor-pointer mb-4"
        >
          <option value="">اختر نوع التحليل</option>
          <For each={analysisOptions}>{(option) => (
            <option value={option}>{option}</option>
          )}</For>
        </select>
        <button
          class={`cursor-pointer px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 hover:scale-105 transition duration-300 ease-in-out transform box-border ${loading() ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleAnalyze}
          disabled={loading()}
        >
          <Show when={!loading()} fallback="جاري التحليل...">
            تنفيذ التحليل
          </Show>
        </button>
      </div>
      <Show when={analysisResult()}>
        <div class="mt-4">
          <h3 class="text-lg font-bold mb-2 text-purple-600">نتيجة التحليل:</h3>
          <div class="p-4 border border-gray-300 rounded-lg bg-white">
            <p class="whitespace-pre-wrap text-gray-800">{analysisResult()}</p>
          </div>
        </div>
      </Show>
    </div>
  );
}

export default SmartDataAnalysis;