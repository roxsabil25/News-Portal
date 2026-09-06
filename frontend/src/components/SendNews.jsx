import React, { useState } from 'react';

const SendStorySection = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedOnion, setCopiedOnion] = useState(false);

  const emailText = "3szihad@gmail.com";
  const onionText = "http://6rzk2y56mvdkj4esckpgbf1nxv34tn763cq2zgcfbhtc36avleqgazqd.onion";

  const handleCopy = (text, setCopied) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-[#f7f5f0] text-gray-800 font-sans leading-relaxed">
      
      {/* Subtitle / Eyebrow */}
      <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-2">
        সংবাদ টিপস
      </p>
      
      {/* Main Title */}
      <h1 className="text-4xl font-serif font-bold text-gray-900 mb-6">
        আমাদের গল্প বা তথ্য পাঠান
      </h1>
      
      {/* Intro Text */}
      <p className="text-gray-700 text-base mb-8">
        সেরা কিছু গল্পের সূচনা হয় এমন একজন পাঠকের মাধ্যমে যিনি মুখ খোলার সিদ্ধান্ত নেন। আপনি সম্পূর্ণ কোনো ঘটনা জানাতে চান, এমন কোনো সূত্র দিতে চান যা নতুন গল্পের পথ দেখায়, কিংবা এমন কোনো সত্য যা সবার সামনে আসা উচিত—আমাদের লিখে পাঠান।
      </p>

      {/* Section 1: How to Reach Us */}
      <div className="mb-8">
        <h2 className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-3">
          যোগাযোগের উপায়
        </h2>
        <p className="text-sm font-medium mb-2">ইমেইল:</p>
        
        {/* Email Field with Copy Button */}
        <div className="flex items-center gap-2 max-w-lg mb-4">
          <input 
            type="text" 
            readOnly 
            value={emailText} 
            className="w-full bg-[#eae7e1] text-gray-800 text-sm px-3 py-2 rounded border border-gray-300 focus:outline-none"
          />
          <button 
            onClick={() => handleCopy(emailText, setCopiedEmail)}
            className="p-2 bg-[#eae7e1] border border-gray-300 rounded hover:bg-gray-300 transition-colors relative"
            title="Copy Email"
          >
            {copiedEmail ? (
              <span className="text-xs text-green-700 font-medium px-1">কপি হয়েছে!</span>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
          </button>
        </div>
        
        <p className="text-sm text-gray-600">
          আপনার নাম ও যোগাযোগের ঠিকানা দিলে আমরা দ্রুত বিষয়টি যাচাই ও অনুসরণ করতে পারি, তবে এটি বাধ্যতামূলক নয়।
        </p>
      </div>

      {/* Section 2: Send Us Something Anonymously */}
      <div className="mb-8">
        <h2 className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-3">
          নাম প্রকাশ না করে তথ্য পাঠান
        </h2>
        <p className="text-sm text-gray-700 mb-4">
          সর্বোচ্চ গোপনীয়তার জন্য আমাদের সুরক্ষিত সাবমিশন সিস্টেম ব্যবহার করুন। এটি আপনার পরিচয় গোপন রেখে যেকোনো তথ্য ও ডকুমেন্ট পাঠানোর সুবিধা দেয়, যেখানে প্রেরিত সকল ডাটা এনক্রিপ্ট থাকে।
        </p>

        <p className="text-sm font-medium mb-2">ব্যবহার করার নিয়ম:</p>
        <ol className="list-decimal list-inside text-sm text-gray-700 space-y-2 mb-4 pl-1">
          <li>torproject.org থেকে Tor Browser ডাউনলোড করুন — আমাদের সিকিউর সিস্টেমটি শুধুমাত্র Tor-এর মাধ্যমে ব্যবহারযোগ্য।</li>
          <li>Tor Browser ওপেন করে নিচের ঠিকানাটি লিখুন অথবা কপি বাটন ব্যবহার করে পেস্ট করুন।</li>
          <li>আপনার গল্প বা ডকুমেন্ট জমা দিতে নির্দেশাবলী অনুসরণ করুন এবং প্রাপ্ত রসিদ কোডটি সংরক্ষণ করুন যাতে পরবর্তীতে উত্তরের জন্য চেক করতে পারেন।</li>
        </ol>

        {/* Onion Address Field with Copy Button */}
        <div className="flex items-center gap-2 max-w-xl mb-4">
          <input 
            type="text" 
            readOnly 
            value={onionText} 
            className="w-full bg-[#eae7e1] text-gray-800 text-xs px-3 py-2 rounded border border-gray-300 font-mono focus:outline-none"
          />
          <button 
            onClick={() => handleCopy(onionText, setCopiedOnion)}
            className="p-2 bg-[#eae7e1] border border-gray-300 rounded hover:bg-gray-300 transition-colors relative"
            title="Copy Onion Address"
          >
            {copiedOnion ? (
              <span className="text-xs text-green-700 font-medium px-1">কপি হয়েছে!</span>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
          </button>
        </div>

        <p className="text-sm text-gray-600">
          অতিরিক্ত সুরক্ষার জন্য আপনার কর্মক্ষেত্রের কোনো ডিভাইস বা ইন্টারনেট সংযোগ ব্যবহার করবেন না।
        </p>
      </div>

      {/* Section 3: Our Promise on Protecting Sources */}
      <div>
        <h2 className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-3">
          উৎস সুরক্ষায় আমাদের প্রতিশ্রুতি
        </h2>
        <p className="text-sm text-gray-700">
          আমরা তথ্যের উৎসের সুরক্ষাকে অত্যন্ত গুরুত্ব সহকারে দেখি। যারা গোপন থাকতে চান আমরা কখনোই তাদের পরিচয় প্রকাশ করি না এবং আপনার সম্মতি ছাড়া আপনার তথ্য কারও সাথে শেয়ার করা হবে না।
        </p>
      </div>

    </div>
  );
};

export default SendStorySection;