
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { db } from "../config/firebase";
import { setDoc, doc,serverTimestamp } from "firebase/firestore";

const SignUp = () => {
  const { register, handleSubmit, error } = useForm();

  const Navigate = useNavigate();

  const signupsubmit = async (user) => {
    try {
      user.referal = nanoid();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      const firebaseUser = userCredential.user;
      Navigate("/login");

      console.log("Firebase Auth User:", firebaseUser);
      console.log("UID:", firebaseUser.uid);
      console.log("Form Data:", user);

      const userData = {
        name: user.name,
        email: user.email,
        referralId: user.referal,
        createdAt: serverTimestamp(),
        totalDonations: 0,
        
      };

      
      await setDoc(doc(db, "users", firebaseUser.uid), userData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className=" flex justify-center p-4 pt-8">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 bg-gradient-to-br from-red-600 via-purple-600 to-blue-700 p-8 lg:p-12 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Be the  Change. Empower
                <br />
                Her Story.
                <br />
                
              </h1>

              <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                Welcome to{" "}
                <span className="font-semibold text-white">
                  She Can Foundation.  
                </span>
                
                By creating an account, you're joining a powerful network dedicated to uplifting and empowering women and girls. Connect with mentors, access valuable resources, and find your place in a community of leaders and changemakers.
              </p>

      

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <p className="text-blue-100 mb-4 italic">
                  "The support and resources I found here were life-changing. I've connected with incredible mentors and now feel empowered to not only chase my own goals but to help other women chase theirs."
                </p>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    PM
                  </div>
                  <div>
                    <p className="font-semibold text-white">Priya M.</p>
                    <p className="text-blue-200 text-sm">
                      Community Member
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
          </div>

          <div className="lg:w-1/2 p-8 lg:p-12">
            <div className="max-w-md mx-auto">
              <div className="text-center mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold text-gray-900">
                    Join the
                    <br />
                    <span className="text-red-600">Community</span>
                  </h2>
                  <div className="text-right">
                    <p className="text-gray-500 text-sm">Already a member?</p>
                    <button
                      onClick={() => Navigate("/login")}
                      className="text-red-600 font-semibold hover:underline"
                    >
                      Log in here
                    </button>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit(signupsubmit)} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    {...register("name")}
                    placeholder="Your Full Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Your Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    {...register("email")}
                    placeholder="Your Email Address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Create a Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      name="password"
                      {...register("password")}
                      placeholder="Create a Password"
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 transform hover:scale-[1.02] active:scale-[0.98]">
                  Create Account
                </button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="w-full border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-3 hover:bg-gray-50"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Sign up with Google</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
