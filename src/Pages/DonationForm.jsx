import React from "react";
import { useForm } from "react-hook-form";
import { db } from "../config/firebase"; 
import {
  collection,
  query,
  where,
  getDocs,
  increment,
  doc,
  Timestamp,
  writeBatch
} from "firebase/firestore";

const DonationForm = () => {
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

  const handleDonation = async (data) => {
    const { donorName, donorEmail, amount, referralId } = data;
    
    
    const batch = writeBatch(db);

    try {
      
      let referredUserDocRef = null;
      if (referralId) {
        const usersCollectionRef = collection(db, 'users');
        const q = query(usersCollectionRef, where('referralId', '==', referralId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          referredUserDocRef = doc(db, 'users', userDoc.id);
          
          batch.update(referredUserDocRef, { totalDonations: increment(amount) });
          console.log(`Prepared update for intern ${userDoc.id}`);
        } else {
          console.log('Referral ID provided but not found.');
          
        }
      }

      
      const donorsCollectionRef = collection(db, 'donors');
      const donorQuery = query(donorsCollectionRef, where('email', '==', donorEmail));
      const donorQuerySnapshot = await getDocs(donorQuery);

      let donorDocRef;

      if (!donorQuerySnapshot.empty) {
        
        console.log('Existing donor found. Preparing update.');
        donorDocRef = donorQuerySnapshot.docs[0].ref;
        batch.update(donorDocRef, {
          totalContributed: increment(amount),
          donationCount: increment(1),
          lastDonationAt: Timestamp.now()
        });
      } else {
        
        console.log('New donor. Preparing to create record.');
        
        donorDocRef = doc(collection(db, 'donors'));
        batch.set(donorDocRef, {
          name: donorName,
          email: donorEmail,
          totalContributed: amount,
          donationCount: 1,
          firstDonationAt: Timestamp.now(),
          lastDonationAt: Timestamp.now()
        });
      }

      
      const donationLogRef = doc(collection(db, 'donations'));
      batch.set(donationLogRef, {
        amount: amount,
        createdAt: Timestamp.now(),
        
        donorId: donorDocRef.id,
        donorEmail: donorEmail, 
        referredUserId: referredUserDocRef ? referredUserDocRef.id : null,
      });
      console.log('Prepared donation log entry.');

      
      await batch.commit();
      
      console.log('All operations successful! Donation complete.');
      alert('Thank you for your generous donation!');
      reset();

    } catch (error) {
      console.error("Error processing donation: ", error);
      alert('There was an error processing your donation. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Make a Donation</h2>
      
      <form onSubmit={handleSubmit(handleDonation)} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Your Name</label>
          <input type="text" {...register('donorName', { required: true })} placeholder="Enter your name" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none" />
        </div>
        
        
        <div>
          <label className="block text-gray-700 font-medium mb-2">Your Email</label>
          <input type="email" {...register('donorEmail', { required: true, pattern: /^\S+@\S+$/i })} placeholder="Enter your email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none" />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Donation Amount</label>
          <input type="number" {...register('amount', { required: true, valueAsNumber: true, min: 1 })} placeholder="Enter amount" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none" />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Intern Referral ID (Optional)</label>
          <input type="text" {...register('referralId')} placeholder="Enter referral ID" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none" />
        </div>

        <button type="submit" disabled={isSubmitting} className="w-full bg-red-500 hover:bg-red-700 text-white font-semibold py-3 rounded-lg disabled:bg-gray-400">
          {isSubmitting ? 'Processing...' : 'Donate Now'}
        </button>
      </form>
    </div>
  );
};

export default DonationForm;