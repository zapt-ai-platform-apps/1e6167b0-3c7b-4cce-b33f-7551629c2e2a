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
8. [استخدام أداة استخراج النص من الصورة](docs/journeys/use-image-to-text-tool.md) - استخراج نص صحيح ومنسق احترافيًا من الصور باستخدام تقنية OCR المتقدمة والذكاء الاصطناعي.
9. [استخدام منشئ الصور بالذكاء الاصطناعي](docs/journeys/use-ai-image-generator.md) - أنشئ صورًا باستخدام الذكاء الاصطناعي بناءً على وصفك.
10. [متابعتنا على وسائل التواصل الاجتماعي](docs/journeys/follow-social-media.md) - تواصل معنا عبر منصات التواصل الاجتماعي.
11. [عرض الإعلانات العشوائية](docs/journeys/view-random-advertisements.md) - تعرف على أحدث الأدوات والخدمات من خلال الإعلانات العشوائية على الصفحة الرئيسية.
12. [استخدام منشئ المواقع الذكي](docs/journeys/use-smart-website-builder.md) - قم بتوليد موقع احترافي متكامل وبتنسيق ومظهر احترافي.
13. [تحميل الموقع المولد](docs/journeys/download-generated-website.md) - قم بتحميل الموقع الذي تم إنشاؤه بصيغة ZIP لاستخدامه لاحقًا.
14. [تعديل الموقع المولد](docs/journeys/edit-generated-website-using-ai.md) - قم بتعديل الموقع الذي تم إنشاؤه باستخدام الذكاء الاصطناعي.
15. [استخدام منشئ السيرة الذاتية الذكي](docs/journeys/use-smart-cv-generator.md) - أنشئ سيرة ذاتية احترافية بتنسيق ومظهر جذاب.
16. [مشاركة التطبيق](docs/journeys/share-the-app.md) - شارك التطبيق مع الآخرين واكتشف المزيد من التفاصيل.
17. [انضم إلى الفريق](docs/journeys/join-team.md) - انضم إلى فريقنا وساهم في تطوير التطبيق.
18. [تقييم التطبيق](docs/journeys/rate-the-app.md) - شاركنا رأيك وساهم في تحسين التطبيق.
19. [استخدام قارئ PDF الاحترافي](docs/journeys/use-pdf-reader.md) - اقرأ ملفات PDF باستخدام تقنية OCR والذكاء الاصطناعي للحصول على نصوص دقيقة ومنسقة.

**ملاحظة:** على الأجهزة المحمولة، استخدم زر القائمة في أعلى الصفحة لفتح أو إغلاق قائمة التنقل.

**شكراً لانضمامك إلينا في رحلتك نحو المزيد من الحرية والاستقلالية.**

# External APIs Used

- **Supabase Auth and Database**: نستخدم Supabase لإدارة عمليات تسجيل الدخول وإنشاء الحسابات وتخزين بيانات المستخدمين والمحتوى.
- **OpenAI API**: نستخدم OpenAI لتشغيل ميزات الذكاء الاصطناعي مثل مساعد الكتابة، منشئ المحتوى، وأداة استخراج النص من الصورة للحصول على نصوص دقيقة ومنسقة.
- **Radio-Browser API**: لجلب المحطات الإذاعية العربية في أداة الراديو العربي.
- **OCR.space API**: نستخدم OCR.space لاستخراج النصوص من الصور وملفات PDF باستخدام تقنية التعرف الضوئي على الحروف (OCR).

# Required Environment Variables

- `VITE_PUBLIC_SENTRY_DSN`: Your Sentry DSN for error reporting.
- `VITE_PUBLIC_APP_ENV`: The application environment (e.g., production).
- `VITE_PUBLIC_APP_ID`: Your ZAPT App ID.
- `VITE_PUBLIC_UMAMI_WEBSITE_ID`: Your Umami Website ID for analytics.
- `VITE_PUBLIC_OCRSPACE_API_KEY`: Your OCR.space API Key.
- `OPENAI_API_KEY`: Your OpenAI API Key.
- `SUPABASE_URL`: Your Supabase Project URL.
- `SUPABASE_ANON_KEY`: Your Supabase Anonymous Public API Key.
- `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase Service Role API Key.
- `SUPABASE_JWT_SECRET`: Your Supabase JWT Secret.

# Notes

- تأكد من إضافة قيم المتغيرات البيئية في ملف `.env` لضمان عمل التطبيق بشكل صحيح.
- التطبيق يدعم اللغة العربية بالكامل ويوفر تجربة مستخدم سلسة للمكفوفين وضعاف البصر.