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
9. [البحث عن محتوى](docs/journeys/search-content.md) - البحث عن مواضيع أو مقالات معينة على موقعنا.
10. [متابعتنا على وسائل التواصل الاجتماعي](docs/journeys/follow-social-media.md) - تواصل معنا عبر منصات التواصل الاجتماعي.
11. [استكشاف المدونة](docs/journeys/explore-blog.md) - تصفح المقالات حسب التصنيف والاهتمام.
12. [استخدام زر إنشاء المقال بالذكاء الاصطناعي](docs/journeys/generate-article-using-ai.md) - إنشاء مقالات تلقائيًا باستخدام الذكاء الاصطناعي.
13. [استخدام لوحة تحكم المشرف](docs/journeys/admin-dashboard.md) - إدارة المدونة والخدمات.
14. [عرض الإعلانات العشوائية](docs/journeys/view-random-advertisements.md) - تعرف على أحدث الأدوات والخدمات من خلال الإعلانات العشوائية على الصفحة الرئيسية.
15. [استكشاف الدورات التدريبية المجانية](docs/journeys/explore-free-training-courses.md) - تعرف على الدورات التدريبية المجانية المتاحة وشارك بها.

**ملاحظة:** على الأجهزة المحمولة، استخدم زر القائمة في أعلى الصفحة لفتح أو إغلاق قائمة التنقل.

**شكراً لانضمامك إلينا في رحلتك نحو المزيد من الحرية والاستقلالية.**

# External APIs Used

- **Supabase Auth and Database**: نستخدم Supabase لإدارة عمليات تسجيل الدخول وإنشاء الحسابات وتخزين بيانات المستخدمين والمحتوى.
- **OpenAI API**: نستخدم OpenAI لتشغيل ميزات الذكاء الاصطناعي مثل مساعد الكتابة ومنشئ المحتوى.
- **Radio-Browser API**: لجلب المحطات الإذاعية العربية في أداة الراديو العربي.

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
- تم الآن ربط التطبيق بقاعدة بيانات Supabase لتخزين المحتوى وإدارته.
- تمت إضافة ميزة **الإعلانات العشوائية** على الصفحة الرئيسية لعرض أحدث الأدوات والخدمات بشكل جذاب ومحفز.
- تم تعديل قسم الخدمات ليشمل **الخدمات المجانية** المتاحة، وتم إزالة خدمة **استشارات تقنية مجانية** لتبسيط تجربة المستخدم.
- تم تحسين تنسيق ومظهر الصفحات لزيادة جاذبية التطبيق وسهولة استخدامه.
