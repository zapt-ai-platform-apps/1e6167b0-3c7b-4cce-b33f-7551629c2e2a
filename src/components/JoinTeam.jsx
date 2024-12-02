function JoinTeam() {
  return (
    <main class="flex-grow px-4 h-full">
      <div class="max-w-2xl mx-auto">
        <h2 class="text-2xl font-bold mb-4 text-primary-dark text-center">انضم إلى فريقنا المتميز!</h2>
        <p class="text-lg mb-8 text-center">
          كن جزءًا من رحلتنا نحو النجاح والتميز. نحن نبحث عن الأشخاص الموهوبين والمتحمسين للانضمام إلى فريقنا الديناميكي.
        </p>
        <div class="mb-6">
          <h3 class="text-xl font-bold mb-2 text-primary-dark">شروط ومتطلبات الانضمام:</h3>
          <ul class="list-disc list-inside text-gray-700 space-y-2">
            <li>شغف بالعمل الجماعي والتعاون.</li>
            <li>مهارات تواصل ممتازة.</li>
            <li>القدرة على تقديم أفكار إبداعية.</li>
            <li>الالتزام بالأهداف والقيم الخاصة بفريقنا.</li>
          </ul>
        </div>
        <div class="text-center">
          <a
            href="https://forms.gle/QAc3Emeyeda4vTva7"
            target="_blank"
            rel="noopener noreferrer"
            class="cursor-pointer inline-block w-full px-6 py-3 bg-primary-dark text-white rounded-lg hover:bg-primary-light transition duration-300 ease-in-out transform"
          >
            انضم الآن
          </a>
        </div>
      </div>
    </main>
  );
}

export default JoinTeam;