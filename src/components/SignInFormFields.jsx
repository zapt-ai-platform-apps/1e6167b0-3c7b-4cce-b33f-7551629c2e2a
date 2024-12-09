function SignInFormFields(props) {
  return (
    <>
      <form onSubmit={props.handleSignIn} class="space-y-4">
        <div>
          <label class="block text-neutral-dark font-semibold mb-2">البريد الإلكتروني</label>
          <input
            type="email"
            value={props.email()}
            onInput={(e) => props.setEmail(e.target.value)}
            class="box-border w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            required
          />
        </div>
        <div>
          <label class="block text-neutral-dark font-semibold mb-2">كلمة المرور</label>
          <input
            type="password"
            value={props.password()}
            onInput={(e) => props.setPassword(e.target.value)}
            class="box-border w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            required
          />
        </div>
        <button
          type="submit"
          class={`cursor-pointer w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition duration-300 ease-in-out transform ${
            props.loading() ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={props.loading()}
        >
          {props.loading() ? 'جاري المعالجة...' : 'تسجيل الدخول'}
        </button>
      </form>
      <button
        class={`cursor-pointer w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 ease-in-out transform mt-4 ${
          props.loading() ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={props.handleGoogleSignIn}
        disabled={props.loading()}
      >
        {props.loading() ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول باستخدام حساب Google'}
      </button>
    </>
  );
}

export default SignInFormFields;