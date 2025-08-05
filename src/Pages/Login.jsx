

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

import { useDispatch } from "react-redux";
import {
  setUser,
  setLoading,
  setError,
  
} from "../store/reducers/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  

  const { register, handleSubmit } = useForm();
  const Navigate = useNavigate();

  const loginhandler = async (credentials) => {
    dispatch(setError(null));
    dispatch(setLoading(true));
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      const firebaseUser = userCredential.user;
      
      const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
      const userProfile = userDoc.data();

      const completeUserData = {

        
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        isAuthenticated: true,

        
        name: userProfile.name,
        referralId: userProfile.referralId,
        totalDonations: userProfile.totalDonations || 0
      };

      
      dispatch(setUser(completeUserData));

      console.log(userProfile);
      

      Navigate('/dashboard')
    } catch (error) {
      console.error("Login error:", error)
      
      
      let errorMessage = "Login failed. Please try again."
      
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = "No account found with this email."
          break
        case 'auth/wrong-password':
          errorMessage = "Incorrect password."
          break
        case 'auth/invalid-email':
          errorMessage = "Invalid email format."
          break
        case 'auth/too-many-requests':
          errorMessage = "Too many failed attempts. Please try again later."
          break
        case 'auth/network-request-failed':
          errorMessage = "Network error. Please check your connection."
          break
        default:
          errorMessage = error.message
      }
      
      dispatch(setError(errorMessage))
    } finally {
      dispatch(setLoading(false))
    }
    
    

  };

  return (
    <div className=" flex justify-center p-4 pt-8">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 bg-gradient-to-br from-red-600 via-blue-600 to-purple-700 p-8 lg:p-12 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Continue Your
                <br />
                Journey of Impact.
                
                
              </h1>

              <p className="text-purple-100 text-lg mb-8 leading-relaxed">
                
                <span className="font-semibold text-white"></span> Welcome back. The tools, resources, and connections you need to keep growing are just one step away. Let's get started.
              </p>

              

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <p className="text-purple-100 mb-4 italic">
                  "This community is my go-to for inspiration and support. It's a powerful feeling to know you're not on this journey alone. Every login feels like coming home."
                </p>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    SM
                  </div>
                  <div>
                    <p className="font-semibold text-white">Anika S.</p>
                    <p className="text-purple-200 text-sm">
                      Mentor & Community Member
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
            <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white/5 rounded-full"></div>
          </div>

          <div className="lg:w-1/2 p-8 lg:p-12">
            <div className="max-w-md mx-auto">
              <div className="text-center mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold text-gray-900">
                    Welcome 
                    <br />
                    <span className="text-red-600">Back </span>
                  </h2>
                  <div className="text-right">
                    <p className="text-gray-500 text-sm">New Here?</p>
                    <button
                      onClick={() => Navigate("/signup")}
                      className="text-red-600 font-semibold hover:underline"
                    >
                      Sign up here
                    </button>
                  </div>
                </div>
              </div>

              <form className="space-y-6">  
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Your Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    {...register("email")}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>

                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Your Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      name="password"
                      {...register("password")}
                      placeholder="Enter your password"
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                <button
                  onClick={handleSubmit(loginhandler)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Login
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
                  <span>Sign in with Google</span>
                </button>

                <div className="text-center pt-4">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <button
                      onClick={() => Navigate("/signup")}
                      className="text-red-600 font-semibold hover:text-red-700 hover:underline"
                    >
                      Create one now
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
