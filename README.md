# Blind Accessibility

**تنبيه:** هذا التطبيق لا يزال في نسخته التجريبية وسيتم الانتهاء من التطوير قريبًا.

**Blind Accessibility** هو تطبيق مُحسّن يُقدّم تجربة سلسة وسهلة للوصول إلى موقعنا الرسمي، الخدمات، الأدوات، ووسائل التواصل الاجتماعي الخاصة بنا. يهدف التطبيق إلى توفير جميع الموارد والأدوات للمكفوفين وضعاف البصر في مكان واحد.

## كيفية استخدام التطبيق

1. [البداية](docs/journeys/getting-started.md) - البدء في استخدام التطبيق والوصول إلى المحتوى الرئيسي.
2. [إنشاء حساب](docs/journeys/signup.md) - إنشاء حساب جديد للوصول إلى مزايا إضافية.
3. [تسجيل الدخول](docs/journeys/login.md) - تسجيل الدخول إلى حسابك.
4. [إعادة تعيين كلمة المرور](docs/journeys/reset-password.md) - استعادة الوصول إلى حسابك في حال نسيت كلمة المرور.
5. [إدارة حساب المستخدم](docs/journeys/manage-account.md) - تحديث معلومات حسابك الشخصي وإعداداتك.
6. [استكشاف الخدمات المجانية](docs/journeys/explore-services.md) - تصفّح الخدمات المجانية المتاحة لتعزيز استقلاليتك.
7. [استكشاف الأدوات](docs/journeys/explore-tools.md) - اختر فئة الأدوات التي تهمك واستمتع بمجموعة من الأدوات المصممة خصيصًا لك.
8. [استخدام منشئ الصور بالذكاء الاصطناعي](docs/journeys/use-ai-image-generator.md) - أنشئ صورًا باستخدام الذكاء الاصطناعي بناءً على وصفك.
9. [متابعتنا على وسائل التواصل الاجتماعي](docs/journeys/follow-social-media.md) - تواصل معنا عبر منصات التواصل الاجتماعي.
10. [عرض الإعلانات العشوائية](docs/journeys/view-random-advertisements.md) - تعرف على أحدث الأدوات والخدمات من خلال الإعلانات العشوائية على الصفحة الرئيسية.
11. [استكشاف الدورات التدريبية المجانية](docs/journeys/explore-free-training-courses.md) - تعرف على الدورات التدريبية المجانية المتاحة وشارك بها.
12. [استخدام منشئ المواقع الذكي](docs/journeys/use-smart-website-builder.md) - قم بتوليد موقع احترافي متكامل وبتنسيق ومظهر احترافي.
13. [تحميل الموقع المولد](docs/journeys/download-generated-website.md) - قم بتحميل الموقع الذي تم إنشاؤه بصيغة ZIP لاستخدامه لاحقًا.
14. [تعديل الموقع المولد](docs/journeys/edit-generated-website-using-ai.md) - قم بتعديل الموقع الذي تم إنشاؤه باستخدام الذكاء الاصطناعي.
15. [استخدام منشئ السيرة الذاتية الذكي](docs/journeys/use-smart-cv-generator.md) - أنشئ سيرة ذاتية احترافية بتنسيق ومظهر جذاب.
16. [استخدام أداة استخراج النص من الصورة](docs/journeys/use-image-text-extractor.md) - استخراج النصوص من الصور باستخدام تقنية Tesseract.js.
17. [مشاركة التطبيق](docs/journeys/share-the-app.md) - شارك التطبيق مع الآخرين واكتشف المزيد من التفاصيل
18. [طلب تطبيقك الخاص](docs/journeys/request-custom-app.md) - صمم تطبيقًا مخصصًا يلبي احتياجاتك الخاصة
19. [انضم إلى الفريق](docs/journeys/join-team.md) - انضم إلى فريقنا وساهم في تطوير التطبيق
20. [تقييم التطبيق](docs/journeys/rate-the-app.md) - شاركنا رأيك وساهم في تحسين التطبيق

**ملاحظة:** على الأجهزة المحمولة، استخدم زر القائمة في أعلى الصفحة لفتح أو إغلاق قائمة التنقل.

**شكراً لانضمامك إلينا في رحلتك نحو المزيد من الحرية والاستقلالية.**

# External APIs Used

- **Supabase Auth and Database**: نستخدم Supabase لإدارة عمليات تسجيل الدخول وإنشاء الحسابات وتخزين بيانات المستخدمين والمحتوى.
- **OpenAI API**: نستخدم OpenAI لتشغيل ميزات الذكاء الاصطناعي مثل مساعد الكتابة ومنشئ المحتوى.
- **Radio-Browser API**: لجلب المحطات الإذاعية العربية في أداة الراديو العربي.
- **Tesseract.js**: نستخدم Tesseract.js لاستخراج النصوص من الصور محليًا في المتصفح في أداة استخراج النص من الصورة.

# Required Environment Variables

- `VITE_PUBLIC_SENTRY_DSN`: Your Sentry DSN for error reporting.
- `VITE_PUBLIC_APP_ENV`: The application environment (e.g., production).
- `VITE_PUBLIC_APP_ID`: Your ZAPT App ID.
- `VITE_PUBLIC_UMAMI_WEBSITE_ID`: Your Umami Website ID for analytics.
- `OPENAI_API_KEY`: Your OpenAI API Key.
- `SUPABASE_URL`: Your Supabase Project URL.
- `SUPABASE_ANON_KEY`: Your Supabase Anonymous Public API Key.
- `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase Service Role API Key.
- `SUPABASE_JWT_SECRET`: Your Supabase JWT Secret.

# Notes

- تأكد من إضافة قيم المتغيرات البيئية في ملف `.env` لضمان عمل التطبيق بشكل صحيح.
- التطبيق يدعم اللغة العربية بالكامل ويوفر تجربة مستخدم سلسة للمكفوفين وضعاف البصر.
- تم **تحسين أداة استخراج النص من الصورة** لاستخراج النصوص باستخدام Tesseract.js مباشرةً في المتصفح، مما يحسن الأداء ويحافظ على خصوصية المستخدم.
- تم تحديث ملف `package.json` لإضافة الاعتماد الجديد `tesseract.js`.
- تمت تحديث التوثيق اللازم للأداة في قسم **كيفية استخدام التطبيق**.